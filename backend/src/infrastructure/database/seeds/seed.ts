import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { usersSeed } from './user.seed';

const prisma = new PrismaClient();

async function main() {
  try {
    await Promise.all([usersSeed()]);
  } catch (error) {
    Logger.error(error);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    Logger.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
