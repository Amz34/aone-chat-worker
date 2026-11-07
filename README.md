# Aone Chat API — Cloudflare Workers AI

High-performance, edge-native AI assistant backend for the **Aone Server-Side AI Agent Platform**, powered by Cloudflare Workers AI with KV sliding rate limiting and zero cold-start response latency.

---

## Architecture Overview

```
Client (Web / Mobile)
        │
        ▼ (POST /api/chat)
┌──────────────────────────────────────────────┐
│        Cloudflare Edge Worker                │
│                                              │
│  [KV: IP Sliding Rate Limiter] (10 req/min) │
│                      │                       │
│                      ▼                       │
│  [In-Memory Knowledge Base (KB) Injection]  │
│                      │                       │
│                      ▼                       │
│  [Cloudflare Workers AI Engine]              │
│   Model: @cf/meta/llama-3.1-8b-instruct-fast │
└──────────────────────────────────────────────┘
```

## Migration & Deprecation Fix (November 2026)

- **Previous Model:** `@cf/meta/llama-3.1-8b-instruct-fp8` (*Deprecated November 15, 2026*)
- **Active Retained Model:** `@cf/meta/llama-3.1-8b-instruct-fast`
- **Improvements:**
  - Prevents production service disruption upon Cloudflare model catalog deprecation.
  - ~1.3x faster time-to-first-token (TTFT) and improved token throughput.
  - Fully compatible with Workers AI free-tier binding quotas.

---

## Deployment & Verification

### Local Validation
```bash
# Verify syntax
node --check src/index.js

# Test dry-run packaging with wrangler
wrangler deploy --dry-run
```

### Production Edge Deploy
```bash
./deploy.sh
```

---

## License & Ownership
Maintained by [Amz34](https://github.com/Amz34) (`aamir1zahran@gmail.com`).

---

Part of [my always-on agent stack](https://github.com/Amz34) · [Awesome Agent Infrastructure](https://github.com/Amz34/awesome-agent-infrastructure) (135 live-checked building blocks).
