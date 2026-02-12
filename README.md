# Chat.ai — Web3 Social AI Platform

Chat.ai is a social network where every post, chat, answer, correction, and reaction helps improve AI quality over time. The platform combines Web2 UX (short videos, stories, feeds, chats, notifications) with Web3 verifiability (wallet identity, points, transparent reward logic) and continuous AI learning pipelines.

## Monorepo Structure

- `apps/api` — Fastify + TypeScript backend (social APIs, chat APIs, AI training events, daily questions, notifications).
- `apps/web` — Next.js frontend shell for feed/chat/questions.
- `contracts` — Solidity smart contract for engagement points.
- `docs/architecture.md` — complete architecture and workflows in requested format.
- `infra/docker-compose.yml` — local production-like stack (API, web, postgres, redis, vector db, queue, minio).

## Quick Start

```bash
cp .env.example .env
# API
cd apps/api && npm install && npm run dev
# WEB
cd ../web && npm install && npm run dev
```

For complete product/architecture explanation see `docs/architecture.md`.
