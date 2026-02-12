import { FastifyInstance } from "fastify";

const todaysQuestions = [
  "What should AI never automate?",
  "Which local issue can AI help solve in your city?",
  "Describe one personal productivity trick that works for you.",
  "How should AI balance humor and factual correctness?",
  "What skill should students learn first in an AI era?"
];

const answers: Array<{
  userId: string;
  question: string;
  answer: string;
  visibility: "public" | "ai-only" | "anonymous";
  createdAt: string;
}> = [];

export async function questionRoutes(app: FastifyInstance) {
  app.get("/daily", async () => ({ date: new Date().toISOString().slice(0, 10), questions: todaysQuestions }));

  app.post("/daily/answer", async (req, reply) => {
    const body = req.body as {
      userId: string;
      question: string;
      answer: string;
      visibility: "public" | "ai-only" | "anonymous";
    };

    if (!body?.userId || !body?.question || !body?.answer || !body?.visibility) {
      return reply.code(400).send({ error: "Missing required fields" });
    }

    answers.push({ ...body, createdAt: new Date().toISOString() });

    return reply.code(201).send({ saved: true, rewardReason: "DAILY_ANSWER" });
  });

  app.get("/daily/answers", async () => ({ count: answers.length, answers }));
}
