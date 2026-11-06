// Aone platform knowledge base — injected as system context for the chat assistant.
// Keep in sync with the repo README and client-facing collateral.
export const KB = `# Aone — Server-Side AI Agent Platform

## What is Aone
Aone is a server-side AI agent platform that runs 24/7 in the cloud — not on a laptop. It operates your business's digital operations continuously: answering leads, triaging email, posting content, and serving your whole team at once. Think of it as a digital employee that never sleeps, rather than a chatbot you open when you feel like it.

## Core Capabilities

### Always-On Operation
- Runs on a cloud server 24/7/365 — no laptop to close, no app to open, no "machine is off" gaps.
- Works while you sleep: WhatsApp leads answered at 3 AM, emails triaged before you wake up.

### Multi-Channel Messaging
- Connects to Telegram, WhatsApp, Discord, Slack, Signal, and SMS from one brain.
- A lead can reach you on any platform and get the same intelligent assistant.

### Intelligent Agents (Multi-Agent)
- Multiple specialized agents can run in parallel: one for lead qualification, one for support, one for content, one for email.
- Each agent has its own skills, memory, and tools — coordinated under one platform.

### Skills & Automation
- Reusable capabilities: email search/send, CRM updates, document generation, website checks, LinkedIn posting, spreadsheet work, and more.
- Scheduled automation (cron): daily reports, follow-ups, monitoring, content posting on a schedule — fully automatic.

### Memory & Learning
- Three-layer memory: short-term session context, persistent project knowledge, and long-term user preferences.
- The system remembers clients, context, and decisions across sessions — no repeating yourself.

### Webhooks & API Integration
- Accepts webhook events from Shopify, forms, calendars, and other services — triggering agent workflows automatically.
- REST API surface for external systems to talk to the platform.

## Architecture (Simplified)
1. Channels (Telegram / WhatsApp / Discord / Slack / Signal / SMS / Email) — where people talk.
2. Gateway — routes every message to the right agent with full context.
3. Agents — the brains: understand, decide, act, remember.
4. Skills — plug-in capabilities (email, LinkedIn, docs, CRM, web).
5. Cron Scheduler — time-based automations run without any human trigger.
6. Storage — conversation history, memory layers, files, credentials (encrypted).

## Use Cases

### Lead Generation & Qualification
- Capture leads from website forms, WhatsApp, or ads; qualify them automatically with a structured questionnaire; score them; book meetings on your calendar.
- Example: an AI lead-qualification form that screens prospects, scores them, and schedules calls — no manual follow-up.

### Email Triage & Reply
- Monitor inboxes 24/7, prioritize important threads, draft and send replies, and keep you in the loop on what matters.

### Content & Social Media
- Post to LinkedIn via API on schedule, generate content from source material, monitor competitors, and maintain a consistent publishing cadence.

### Customer Support
- Answer common questions instantly on your channels, escalate complex cases to humans with full context.

### Business Operations
- Invoice follow-ups, appointment reminders, price monitoring, order alerts (e.g., Shopify → WhatsApp), and document generation.

## Why Aone vs. a Desktop AI Bot

| Aspect | Desktop Bot (e.g., Grok Bot) | Aone Platform |
|---|---|---|
| Where it runs | Your laptop — dies when you close it | Cloud server — 24/7 |
| Users | One person | Whole team + clients |
| Channels | Desktop app only | WhatsApp, Telegram, Discord, Slack, Signal, SMS, Email |
| Team access | No | Yes, multi-user |
| Automation | No scheduling | Cron + webhooks |
| Skills/tools | Limited | Expandable skills library |
| Data control | Sent to provider | Self-hosted / provider-agnostic |
| Cost model | Per-user subscription | Open models → near-zero marginal cost |

## Cost & Deployment
- Runs on affordable cloud infrastructure (including free-tier cloud VMs).
- Uses open-weight models (e.g., DeepSeek) — near-zero marginal cost per conversation, unlike per-seat consumer subscriptions.
- Deployable for a single business or white-labeled for agencies serving many clients.

## Security
- Credentials stored encrypted; actions can require human approval gates before executing.
- Deployment on your own infrastructure means your data stays under your control.

## Get Started
- For businesses: contact Aone to set up a pilot on your own channels.
- For agencies: white-label Aone to offer AI agent services under your own brand.
`;

export function kbContext() {
  return KB;
}
