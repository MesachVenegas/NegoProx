import { PrismaClient } from '@prisma/client';

async function seed() {
  const prisma = new PrismaClient();

  try {
    const user = await prisma.user.create({
      data: {
        name: 'John',
        last_name: 'Doe',
        email: 'example@negoprox.com',
        phone: '+1234567890',
      },
    });

    const business = await prisma.business.create({
      data: {
        name: 'Mi primer negocio',
        address: 'Calle Falsa 123',
        latitude: 19.4326077,
        longitude: -99.1332099,
        user: { connect: { id: user.id } },
      },
    });

    await prisma.$disconnect();
    return { user, business };
  } catch (error) {
    await prisma.$disconnect();
    throw error;
  }
}

seed()
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
