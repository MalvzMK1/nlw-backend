import { PrismaClient }  from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      avatarUrl: 'https://github.com/malvzmk1.png',
    }
  });

  const pool = await prisma.pool.create({
    data: {
      title: 'Example Pool',
      code: 'MAGL25',
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id
        }
      }
    }
  });

  await prisma.game.create({
    data: {
      date: '2022-11-06T03:49:39.003Z',
      firstTeamCoutryCode: 'BR',
      secondTeamCoutryCode: 'DE'
    }
  });

  await prisma.game.create({
    data: {
      date: '2016-12-28T03:49:39.003Z',
      firstTeamCoutryCode: 'BR',
      secondTeamCoutryCode: 'AR',

      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 1,

          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id
              }
            }
          }
        }
      }
    }
  });
}

main();