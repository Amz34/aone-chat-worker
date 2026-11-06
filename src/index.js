// Aone Chat API — Cloudflare Worker (Workers AI, free tier, no external API key)
// POST /api/chat { messages: [{role, content}, ...] } -> { reply }
import { KB } from "./kb.js";

const RATE_LIMIT_PER_MIN = 10; // messages per minute per IP

// Workers AI model — good quality/cost balance, available on free tier
// (llama-3.1-8b-instruct-fp8 deprecated Nov 15, 2026; -fast is the retained active successor)
const MODEL = "@cf/meta/llama-3.1-8b-instruct-fast";

// CORS
const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

// Simple sliding-ish rate limit per IP using KV (60s TTL counter)
async function rateLimited(env, ip) {
  if (!env.RATE_LIMIT_KV || !ip) return false;
  const key = "rl:" + ip;
  const raw = await env.RATE_LIMIT_KV.get(key);
  const count = raw ? parseInt(raw, 10) : 0;
  if (count >= RATE_LIMIT_PER_MIN) return true;
  await env.RATE_LIMIT_KV.put(key, String(count + 1), { expirationTtl: 60 });
  return false;
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    if (request.method !== "POST") {
      return new Response(
        JSON.stringify({ reply: "Method not allowed. Use POST." }),
        { status: 405, headers: cors }
      );
    }

    // Rate limit BEFORE parsing the body so every hit counts (abuse-safe)
    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    if (await rateLimited(env, ip)) {
      return new Response(
        JSON.stringify({
          reply: "You're sending messages too fast. Please wait a minute and try again.",
        }),
        { status: 429, headers: cors }
      );
    }

    try {
      const body = await request.json();
      const messages = Array.isArray(body.messages) ? body.messages : [];

      if (!env.AI) {
        return new Response(
          JSON.stringify({ reply: "Server not configured — AI binding missing." }),
          { status: 200, headers: cors }
        );
      }

      const system = {
        role: "system",
        content:
          "You are Aone Assistant — the official AI assistant for Aone, a server-side AI agent platform. " +
          "Answer questions ONLY based on the knowledge base provided below. Be concise, helpful, and professional. " +
          "If the answer is not in the knowledge base, say you don't have that information and suggest asking about " +
          "Aone's capabilities, architecture, use cases, or pricing.\n\n" +
          "KNOWLEDGE BASE:\n" + KB,
      };

      // last 20 messages for context, drop any system-role from client
      const history = messages
        .filter((m) => m.role === "user" || m.role === "assistant")
        .slice(-20)
        .map((m) => ({ role: m.role, content: String(m.content).slice(0, 4000) }));

      const run = await env.AI.run(MODEL, {
        messages: [system, ...history],
        temperature: 0.4,
        max_tokens: 1024,
      });

      const reply = run?.response ?? "";
      if (!reply) {
        return new Response(
          JSON.stringify({ reply: "I hit a temporary error. Please try again in a moment." }),
          { status: 200, headers: cors }
        );
      }

      return new Response(JSON.stringify({ reply }), { status: 200, headers: cors });
    } catch (err) {
      console.error("Aone chat error:", err);
      return new Response(
        JSON.stringify({ reply: "Something went wrong. Please try again." }),
        { status: 200, headers: cors }
      );
    }
  },
};
