import { FastifyInstance } from "fastify";

const messages: Array<{ id: string; threadId: string; senderId: string; body: string; createdAt: string }> = [];

export async function chatRoutes(app: FastifyInstance) {
  app.get("/:threadId", async (req) => {
    const { threadId } = req.params as { threadId: string };
    return { messages: messages.filter((m) => m.threadId === threadId) };
  });

  app.post("/:threadId", async (req, reply) => {
    const { threadId } = req.params as { threadId: string };
    const body = req.body as { senderId: string; body: string };

    if (!body?.senderId || !body?.body) {
      return reply.code(400).send({ error: "senderId and body required" });
    }

    const message = {
      id: crypto.randomUUID(),
      threadId,
      senderId: body.senderId,
      body: body.body,
      createdAt: new Date().toISOString()
    };

    messages.push(message);
    return reply.code(201).send({ message, emittedEvent: "interaction.chat.message" });
  });
}
