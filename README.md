# paper-digest

n8n workflow that sends me new papers relevant to my master's thesis on Discord every Friday. It pulls from arXiv and from Semantic Scholar (papers citing a few key papers), has Claude score them 1-5 against [the thesis description](prompts/relevance-filter.md), and sends the ones scoring 4 or higher. Settings are in the Config node.

## Setup

```bash
cp .env.example .env        # set N8N_ENCRYPTION_KEY
docker compose up -d
docker compose exec n8n n8n import:workflow --separate --input=/home/node/workflows
```

In n8n, add a Discord Webhook credential (channel settings → Integrations → Webhooks) for both Discord nodes and a Header Auth credential (`x-api-key`, Anthropic key) for "Score with Claude", and set "Paper Digest - Error Alert" as the error workflow.

After editing in the UI, export back to the repo with `scripts/export.sh`. It strips server metadata (including your account name and email) from the exports.
