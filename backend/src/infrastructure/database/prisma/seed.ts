import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../../../shared/utils/hash.util';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = hashPassword('Password123!');
  // Crear categorías primero
  await prisma.category.upsert({
    where: { name: 'Peluquería' },
    update: {},
    create: { name: 'Peluquería' },
  });
  await prisma.category.upsert({
    where: { name: 'Restaurante' },
    update: {},
    create: { name: 'Restaurante' },
  });
  await prisma.category.upsert({
    where: { name: 'Farmacia' },
    update: {},
    create: { name: 'Farmacia' },
  });

  // Crear usuario cliente
  const clientUser = await prisma.user.upsert({
    where: { email: 'cliente@negoprox.com' },
    update: {},
    create: {
      name: 'Cliente Ejemplo',
      lastName: 'Apellido',
      email: 'cliente@negoprox.com',
      phone: '+1234567890',
      userType: 'USER',
      emailVerified: true,
      accounts: {
        create: {
          provider: 'local',
          providerId: 'cliente@negoprox.com',
          passwordHash: hashedPassword,
        },
      },
      userProfile: {
        create: {
          profilePicture:
            'https://th.bing.com/th/id/OIP.tvaMwK3QuFxhTYg4PSNNVAHaHa?rs=1&pid=ImgDetMain',
          address: 'Calle Principal 123',
        },
      },
      tokenVersion: {
        create: {},
      },
      Verification: {
        create: {
          token: 'verification_token',
          tokenExp: new Date(Date.now() + 3600000),
        },
      },
    },
  });

  // Crear usuario dueño de negocio
  const businessOwner = await prisma.user.upsert({
    where: { email: 'negocio@negoprox.com' },
    update: {},
    create: {
      name: 'Dueño de Negocio',
      lastName: 'Ejemplo',
      email: 'negocio@negoprox.com',
      phone: '+0987654321',
      userType: 'BUSINESS',
      emailVerified: true,
      accounts: {
        create: {
          provider: 'local',
          providerId: 'negocio@negoprox.com',
          passwordHash: hashedPassword,
        },
      },
      userProfile: {
        create: {
          profilePicture:
            'https://th.bing.com/th/id/OIP.tvaMwK3QuFxhTYg4PSNNVAHaHa?rs=1&pid=ImgDetMain',
          bio: 'Dueño de establecimiento de servicios',
        },
      },
      tokenVersion: {
        create: {},
      },
    },
  });

  // Crear negocio
  const business = await prisma.business.upsert({
    where: { name: 'Peluquería de Ejemplo' },
    update: {},
    create: {
      name: 'Peluquería de Ejemplo',
      description: 'Servicios de peluquería profesional',
      address: 'Avenida Comercial 456',
      latitude: 19.432607,
      longitude: -99.133208,
      phone: '+5551234567',
      userId: businessOwner.id,
      businessProfile: {
        create: {
          bannerImage:
            'https://www.diysignwriting.co.uk/wp-content/uploads/2019/01/3355-Your-Custom-Company-Business-Banner.jpg',
          website: 'https://peluqueria-ejemplo.com',
          socialMedia: {
            facebook: 'peluqueria-ejemplo',
            instagram: '@peluqueria_ejemplo',
          },
        },
      },
      categories: {
        create: [
          {
            category: {
              connect: { name: 'Peluquería' },
            },
          },
        ],
      },
      images: {
        create: [
          {
            imageUrl:
              'https://www.vhv.rs/dpng/d/345-3452739_online-shopping-fashion-online-shop-profile-hd-png.png',
            order: 1,
          },
          {
            imageUrl:
              'https://s19525.pcdn.co/wp-content/uploads/2016/07/shop-profile_3.jpg',
            order: 2,
          },
        ],
      },
    },
  });

  // Crear servicios
  const haircutService = await prisma.service.create({
    data: {
      name: 'Corte de Cabello',
      price: 300.5,
      time: 60,
      businessId: business.id,
      Availability: {
        create: [
          {
            dayOfWeek: 1,
            startTime: new Date('1970-01-01T09:00:00Z'),
            endTime: new Date('1970-01-01T18:00:00Z'),
            businessId: business.id,
          },
        ],
      },
    },
  });

  // Crear cita
  const appointment = await prisma.appointment.create({
    data: {
      datetime: new Date('2024-03-25T15:00:00Z'),
      state: 'Confirm',
      clientId: clientUser.id,
      serviceId: haircutService.id,
      businessId: business.id,
    },
  });

  // Crear trabajo relacionado
  await prisma.work.create({
    data: {
      status: 'Progress',
      initDate: new Date(),
      clientId: clientUser.id,
      businessId: business.id,
      dateId: appointment.id,
      payment: {
        create: {
          amount: 300.5,
          status: 'COMPLETED',
          paymentMethod: 'Tarjeta de Crédito',
          clientId: clientUser.id,
          businessId: business.id,
        },
      },
      review: {
        create: {
          rate: 5,
          comment: 'Excelente servicio!',
          clientId: clientUser.id,
          businessId: business.id,
        },
      },
    },
  });

  // Crear conversación
  const conversation = await prisma.conversation.create({
    data: {
      clientId: clientUser.id,
      businessUserId: businessOwner.id,
      messages: {
        create: [
          {
            content: '¿Tienen disponibilidad para hoy?',
            senderId: clientUser.id,
            receiverId: businessOwner.id,
            status: 'SENT',
          },
        ],
      },
      // lastMessage: {
      //   connect: {
      //     id: (
      //       await prisma.message.findFirst({
      //         where: { status: 'SENT' },
      //       })
      //     )?.id,
      //   },
      // },
    },
  });

  // Actualizar última conversación
  await prisma.conversation.update({
    where: { id: conversation.id },
    data: {
      lastMessageId: (
        await prisma.message.findFirst({
          where: { conversationId: conversation.id },
        })
      )?.id,
    },
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
