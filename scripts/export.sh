#!/bin/sh
# Export workflows from n8n into workflows/, without server metadata.
set -e
cd "$(dirname "$0")/.."
docker compose exec -T n8n sh -c 'rm -rf /tmp/export && mkdir /tmp/export && n8n export:workflow --all --separate --pretty --output=/tmp/export'
docker compose exec -T n8n node - /tmp/export /home/node/workflows < scripts/clean-export.js
