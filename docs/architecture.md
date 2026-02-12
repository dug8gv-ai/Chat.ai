# Chat.ai Architecture and Product Blueprint

## 1) Product understanding in simple words

Chat.ai is a social app like Instagram + TikTok + Discord + Twitter, but with built-in AI learning loops. Users post content, chat with others, answer daily questions, and interact with AI. Every interaction becomes training feedback. Users get a smooth social experience while AI continuously improves in tone, relevance, and reasoning.

## 2) Core features list

- Wallet + OAuth login (hybrid identity).
- Public posts with likes, comments, shares, saves.
- Reels/stories upload with moderation and transcoding.
- Public rooms, private DMs, AI chat threads.
- Daily 5 global questions and answer submissions.
- Follow/unfollow graph.
- Real-time notifications.
- Feed ranking and content discovery.
- AI response voting and style preference capture.
- Topic tags + personalized interest profiles.
- Debate mode and answer challenge threads.
- Correction/annotation pipeline for supervised tuning.
- Context memory threads (opt-in, encrypted).
- Gamified points on-chain for trusted reward history.
- Anonymous interaction pool for unbiased training.

## 3) System architecture explanation

### Frontend
- Next.js app router + React Query + Zustand.
- WebSocket layer for live chat and notifications.
- Wallet adapter (RainbowKit/Wagmi) + OAuth fallback.

### Backend (modular microservice-ready monolith)
- Fastify API gateway style app with modules:
  - `auth`, `users`, `posts`, `chat`, `feed`, `questions`, `ai-training`, `notifications`.
- PostgreSQL for core relational data.
- Redis for cache/session/rate limiting.
- Kafka (or NATS) event bus for async AI data pipelines.
- Qdrant/Pinecone for vector memory and semantic search.
- MinIO/S3 for media storage.

### AI Layer
- Inference service (LLM gateway with routing/fallback).
- Feature extraction workers (sentiment, topics, toxicity, style).
- Data curation pipeline to build preference and supervised datasets.
- Nightly self-assessment jobs and safe incremental fine-tuning.

### Observability
- OpenTelemetry traces, Prometheus metrics, Grafana dashboards.
- SIEM-friendly audit logs for moderation/security.

## 4) Smart contract design (token/points)

- `EngagementPoints.sol` tracks non-transferable points.
- API service mints points using signer role after off-chain quality scoring.
- Supports reason codes for transparency: `DAILY_ANSWER`, `CORRECTION_ACCEPTED`, `HIGH_QUALITY_POST`.
- Gas-efficient pattern: batched rewards for daily settlement.
- Optional future extension: soulbound achievement badges.

## 5) Backend logic

- API writes social actions to PostgreSQL.
- Every action emits `interaction_event` into queue.
- AI training service consumes events and builds:
  - preference tuples (vote + style),
  - correction pairs,
  - debate trajectory datasets,
  - user interest vectors.
- Feed service reads engagement graph + embeddings to rank content.
- Notification service fan-outs events (push/in-app/email).

## 6) Frontend flow

- User opens app → auth/wallet check.
- Home feed loads ranked posts + reels + stories.
- User posts text/media/tagged topics.
- User chats with people or AI in thread panels.
- Daily questions card appears once per day with 5 prompts.
- Answer UI supports public/private/AI-only mode.
- AI response actions: upvote/downvote, style select, challenge, correct.
- Profile shows points, streaks, interests, debate score.

## 7) AI data analysis and self-training pipeline

1. Ingest interaction events.
2. Normalize/anonymize where required.
3. Compute quality signals (dwell time, follow-up usefulness, correction acceptance).
4. Store curated data in:
   - preference dataset,
   - instruction dataset,
   - retrieval memory index.
5. Daily offline evaluation on benchmark + platform-derived tasks.
6. Canary deploy updated prompt/config/model adapter.
7. Monitor regressions; auto-rollback on safety/quality threshold breach.

## 8) Security considerations

- JWT + wallet signature challenge + refresh rotation.
- Row-level access checks for private chats.
- E2E encryption option for DMs and memory threads.
- PII tokenization and field-level encryption at rest.
- Moderation pipeline (NSFW/hate/spam/scam detection).
- Rate limiting + bot detection + abuse scoring.
- Signed media upload URLs and malware scan.
- Smart contract role-based mint permissions + timelock admin.

## 9) Daily question workflow

- Scheduler generates 5 daily questions by locale/timezone.
- Questions are versioned and immutable after publish.
- Users answer in public feed, anonymous pool, or AI-only channel.
- Scoring engine grades answer depth/helpfulness/community votes.
- Reward engine mints points in batches.
- AI uses answers for trend/topic and reasoning improvements.

## 10) Social media functional features

- Infinite feed with mixed media cards.
- Reels auto-play and creator follow overlays.
- Stories with 24h TTL.
- Hashtags/topic tags and explore page.
- Threaded comments and quote-shares.
- Presence indicators and typing events in chat.
- Recommendation surfaces: “For You”, “Debates”, “AI Challenges”.

## 11) Extra AI training features

1. Sentiment feedback and preferred tone mapping per user segment.
2. Topic tagging and long-term interest profiling.
3. Debate mode storing multi-view argument trees.
4. Correction/annotation queue with confidence-weighted acceptance.
5. Contextual memory threads with opt-in privacy controls.
6. Gamified weighting: high-quality contributors influence model updates more.
7. Voice/video transcription + emotion signal extraction.
8. Cross-thread analysis for slang, meme, and trend adaptation.
9. Periodic self-assessment with reward model drift checks.
10. Anonymous interaction pool to reduce identity bias.

## 12) Final deployment checklist

- [ ] Terraform deploys VPC, DB, cache, queues, object storage.
- [ ] CI/CD includes unit/integration/e2e/security scans.
- [ ] Secrets manager wired (no plaintext secrets in env files).
- [ ] DB migrations + rollback strategy validated.
- [ ] Canary release and feature flags enabled.
- [ ] Contract verified and admin roles transferred to multisig.
- [ ] Data retention and privacy deletion workflows tested.
- [ ] Observability alerts configured (latency, error, abuse, drift).
- [ ] Incident runbooks prepared.
