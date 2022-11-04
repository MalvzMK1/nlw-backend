import Fastify from "fastify";
import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query"],
});

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: true,
  });

  fastify.get('/pools/count', async () => {
    const pools = await prisma.pool.findMany({
      where: {
        code: {
          startsWith: 'A'
        }
      }
    });

    return { count: 1, pools };
  });

  await fastify.listen({ port: 8080 });
}

bootstrap();