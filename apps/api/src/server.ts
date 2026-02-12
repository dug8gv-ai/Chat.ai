import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import websocket from "@fastify/websocket";
import { postRoutes } from "./modules/posts/routes.js";
import { questionRoutes } from "./modules/questions/routes.js";
import { trainingRoutes } from "./modules/ai-training/routes.js";
import { chatRoutes } from "./modules/chat/routes.js";
import { feedRoutes } from "./modules/feed/routes.js";

const app = Fastify({ logger: true });

await app.register(cors, { origin: true });
await app.register(jwt, { secret: process.env.JWT_SECRET ?? "dev-secret" });
await app.register(websocket);

app.get("/health", async () => ({ ok: true, service: "chat-ai-api" }));

await app.register(postRoutes, { prefix: "/posts" });
await app.register(questionRoutes, { prefix: "/questions" });
await app.register(trainingRoutes, { prefix: "/training" });
await app.register(chatRoutes, { prefix: "/chat" });
await app.register(feedRoutes, { prefix: "/feed" });

const port = Number(process.env.PORT ?? 8080);
await app.listen({ port, host: "0.0.0.0" });
