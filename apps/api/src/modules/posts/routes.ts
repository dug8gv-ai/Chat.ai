import { FastifyInstance } from "fastify";
import { z } from "zod";

const postSchema = z.object({
  authorId: z.string(),
  body: z.string().min(1).max(5000),
  mediaUrls: z.array(z.string().url()).default([]),
  topicTags: z.array(z.string().min(2).max(32)).default([]),
  anonymous: z.boolean().default(false)
});

const posts: Array<z.infer<typeof postSchema> & { id: string; createdAt: string }> = [];

export async function postRoutes(app: FastifyInstance) {
  app.post("/", async (req, reply) => {
    const parsed = postSchema.safeParse(req.body);
    if (!parsed.success) {
      return reply.code(400).send({ error: parsed.error.flatten() });
    }

    const post = {
      ...parsed.data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };

    posts.unshift(post);

    return reply.code(201).send({ post, emittedEvent: "interaction.post.created" });
  });

  app.get("/", async () => ({ posts }));
}
