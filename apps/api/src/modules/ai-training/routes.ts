import { FastifyInstance } from "fastify";

const feedbackEvents: any[] = [];

export async function trainingRoutes(app: FastifyInstance) {
  app.post("/feedback", async (req, reply) => {
    const event = {
      id: crypto.randomUUID(),
      ...((req.body as Record<string, unknown>) ?? {}),
      createdAt: new Date().toISOString()
    };

    feedbackEvents.push(event);

    return reply.code(201).send({
      accepted: true,
      pipelineStages: ["validate", "feature-extract", "curate", "train-queue", "evaluate"]
    });
  });

  app.get("/feedback", async () => ({ total: feedbackEvents.length, feedbackEvents }));
}
