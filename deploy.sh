#!/usr/bin/env bash
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR"

echo "=== 1. Validating syntax and configuration ==="
node --check src/index.js
node --check src/kb.js

echo "=== 2. Deploying aone-chat-api to Cloudflare Workers Edge ==="
wrangler deploy

echo "=== 3. Post-Deployment QA Health Check ==="
sleep 2
RESPONSE=$(curl -s -X POST "https://aone-chat-api.sanad-io.workers.dev/api/chat" \
  -H "Content-Type: application/json" \
  -d '{"messages": [{"role": "user", "content": "What is Aone?"}]}')

echo "Edge Response: $RESPONSE"

if echo "$RESPONSE" | grep -q "Aone"; then
  echo -e "\n✅ PRODUCTION VERIFICATION PASSED: Edge worker is live and answering via active model."
else
  echo -e "\n⚠️ Unexpected response. Please review logs: wrangler tail"
fi
