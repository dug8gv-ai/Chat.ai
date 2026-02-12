import { FastifyInstance } from "fastify";

export async function feedRoutes(app: FastifyInstance) {
  app.get("/for-you", async () => {
    return {
      strategy: "hybrid-ranking:v1",
      factors: ["follow-graph", "topic-interest-vector", "quality-score", "freshness", "debate-heat"],
      items: []
    };
  });
}
