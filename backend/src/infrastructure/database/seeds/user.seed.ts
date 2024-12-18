import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function usersSeed() {
  const hashedPassword = 'SecuredPassword!';

  try {
    await prisma.user.upsert({
      where: { email: 'jhon.doe@example.com' },
      update: {},
      create: {
        name: 'John',
        last_name: 'Doe',
        email: 'jhon.doe@example.com',
        email_confirmed: true,
        password: hashedPassword,
        phone: '1234567890',
      },
    });

    await prisma.user.upsert({
      where: { email: 'jane.doe@example.com' },
      update: {},
      create: {
        name: 'Jane',
        last_name: 'Doe',
        email: 'jane.doe@example.com',
        password: hashedPassword,
        phone: '1234567890',
      },
    });

    await prisma.user.upsert({
      where: { email: 'alice.chen@example.com' },
      update: {},
      create: {
        name: 'Alice',
        last_name: 'Chen',
        email: 'alice.chen@example.com',
        email_confirmed: true,
        password: hashedPassword,
        phone: '1234567890',
        business: {
          create: {
            name: 'Alice Business',
            description: 'Alice Business Description',
            address: 'Alice Business Address',
            phone: '1234567890',
            email: 'business.alice@example.com',
            latitude: 0,
            longitude: 0,
          },
        },
      },
    });

    return true;
  } catch (error) {
    Logger.error(error);
    return false;
  }
}
