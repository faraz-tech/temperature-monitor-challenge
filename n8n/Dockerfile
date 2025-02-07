# Dockerfile
FROM n8nio/n8n:latest

COPY ./workflows /home/node/.n8n/workflows

ENV N8N_PORT=5678
ENV N8N_PROTOCOL=http
ENV NODE_ENV=production
ENV N8N_EDITOR_BASE_URL=http://localhost:5678
ENV N8N_WORKFLOW_IMPORT_PATH=/home/node/.n8n/workflows

EXPOSE 5678