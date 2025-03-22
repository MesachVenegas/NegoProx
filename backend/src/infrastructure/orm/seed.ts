import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../../shared/utils/hash.util';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  const hashedPassword = await hashPassword('Password123!');
  const adminHashed = await hashPassword('Admin123!');

  // Crear categorías por defecto
  await prisma.category.createMany({
    data: [
      { name: 'Salud y Bienestar', en_name: 'Health & Wellness' },
      { name: 'Belleza y Spa', en_name: 'Beauty & Spa' },
      { name: 'Comida y Cocina', en_name: 'Food & Dining' },
      { name: 'Servicios Profesionales', en_name: 'Professional Services' },
      { name: 'Servicios del Hogar', en_name: 'Home Services' },
      { name: 'Educación y Cultura', en_name: 'Education & Culture' },
      { name: 'Viajes y Turismo', en_name: 'Travel & Tourism' },
      { name: 'Tecnología y Electrónica', en_name: 'Technology & Electronics' },
      { name: 'Rentas y Servicios', en_name: 'Rentals & Services' },
      { name: 'Eventos y Celebraciones', en_name: 'Events & Celebrations' },
      { name: 'Tienda Online', en_name: 'Online Store' },
      { name: 'Compras y Supermercado', en_name: 'Shopping & Supermarket' },
    ],
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
      password: hashedPassword,
      userType: 'USER',
      emailVerified: true,
      accounts: {
        create: {
          provider: 'local',
          providerId: 'cliente@negoprox.com',
        },
      },
      userProfile: {
        create: {
          slug: 'cliente-ejemplo',
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

  // Crear usuario administrador
  await prisma.user.upsert({
    where: { email: 'mesach.venegas@hotmail.com' },
    update: {},
    create: {
      name: 'Mesach',
      lastName: 'Venegas',
      email: 'mesach.venegas@hotmail.com',
      password: adminHashed,
      phone: '(+52)663-166-2698',
      userType: 'ADMIN',
      emailVerified: true,
      accounts: {
        create: {
          provider: 'local',
          providerId: 'mesach.venegas@hotmail.com',
        },
      },
      userProfile: {
        create: {
          slug: 'mesach-venegas',
        },
      },
      tokenVersion: {
        create: {},
      },
    },
  });

  // Crear usuarios dueños de negocios
  const businessOwner1 = await prisma.user.upsert({
    where: { email: 'peluqueria@negoprox.com' },
    update: {},
    create: {
      name: 'Ana',
      lastName: 'Martínez',
      email: 'peluqueria@negoprox.com',
      password: hashedPassword,
      phone: '+0987654321',
      userType: 'BUSINESS',
      emailVerified: true,
      accounts: {
        create: {
          provider: 'local',
          providerId: 'peluqueria@negoprox.com',
        },
      },
      userProfile: {
        create: {
          slug: 'ana-martinez',
          profilePicture: 'https://example.com/ana.jpg',
          bio: 'Estilista profesional con más de 10 años de experiencia',
        },
      },
      tokenVersion: { create: {} },
    },
  });

  const businessOwner2 = await prisma.user.upsert({
    where: { email: 'medico@negoprox.com' },
    update: {},
    create: {
      name: 'Carlos',
      lastName: 'Ramírez',
      email: 'medico@negoprox.com',
      password: hashedPassword,
      phone: '+0987654322',
      userType: 'BUSINESS',
      emailVerified: true,
      accounts: {
        create: {
          provider: 'local',
          providerId: 'medico@negoprox.com',
        },
      },
      userProfile: {
        create: {
          slug: 'carlos-ramirez',
          profilePicture: 'https://example.com/carlos.jpg',
          bio: 'Médico general especializado en medicina preventiva',
        },
      },
      tokenVersion: { create: {} },
    },
  });

  const businessOwner3 = await prisma.user.upsert({
    where: { email: 'restaurante@negoprox.com' },
    update: {},
    create: {
      name: 'María',
      lastName: 'González',
      email: 'restaurante@negoprox.com',
      password: hashedPassword,
      phone: '+0987654323',
      userType: 'BUSINESS',
      emailVerified: true,
      accounts: {
        create: {
          provider: 'local',
          providerId: 'restaurante@negoprox.com',
        },
      },
      userProfile: {
        create: {
          slug: 'maria-gonzalez',
          profilePicture: 'https://example.com/maria.jpg',
          bio: 'Chef ejecutiva y propietaria de restaurante',
        },
      },
      tokenVersion: { create: {} },
    },
  });

  const businessOwner4 = await prisma.user.upsert({
    where: { email: 'legal@negoprox.com' },
    update: {},
    create: {
      name: 'Roberto',
      lastName: 'Sánchez',
      email: 'legal@negoprox.com',
      password: hashedPassword,
      phone: '+0987654324',
      userType: 'BUSINESS',
      emailVerified: true,
      accounts: {
        create: {
          provider: 'local',
          providerId: 'legal@negoprox.com',
        },
      },
      userProfile: {
        create: {
          slug: 'roberto-sanchez',
          profilePicture: 'https://example.com/roberto.jpg',
          bio: 'Abogado especialista en derecho corporativo',
        },
      },
      tokenVersion: { create: {} },
    },
  });

  const businessOwner5 = await prisma.user.upsert({
    where: { email: 'limpieza@negoprox.com' },
    update: {},
    create: {
      name: 'Laura',
      lastName: 'Torres',
      email: 'limpieza@negoprox.com',
      password: hashedPassword,
      phone: '+0987654325',
      userType: 'BUSINESS',
      emailVerified: true,
      accounts: {
        create: {
          provider: 'local',
          providerId: 'limpieza@negoprox.com',
        },
      },
      userProfile: {
        create: {
          slug: 'laura-torres',
          profilePicture: 'https://example.com/laura.jpg',
          bio: 'Especialista en servicios de limpieza profesional',
        },
      },
      tokenVersion: { create: {} },
    },
  });

  const businessOwner6 = await prisma.user.upsert({
    where: { email: 'academia@negoprox.com' },
    update: {},
    create: {
      name: 'Pedro',
      lastName: 'Vargas',
      email: 'academia@negoprox.com',
      password: hashedPassword,
      phone: '+0987654326',
      userType: 'BUSINESS',
      emailVerified: true,
      accounts: {
        create: {
          provider: 'local',
          providerId: 'academia@negoprox.com',
        },
      },
      userProfile: {
        create: {
          slug: 'pedro-vargas',
          profilePicture: 'https://example.com/pedro.jpg',
          bio: 'Director de academia cultural y artística',
        },
      },
      tokenVersion: { create: {} },
    },
  });

  const businessOwner7 = await prisma.user.upsert({
    where: { email: 'viajes@negoprox.com' },
    update: {},
    create: {
      name: 'Isabel',
      lastName: 'Díaz',
      email: 'viajes@negoprox.com',
      password: hashedPassword,
      phone: '+0987654327',
      userType: 'BUSINESS',
      emailVerified: true,
      accounts: {
        create: {
          provider: 'local',
          providerId: 'viajes@negoprox.com',
        },
      },
      userProfile: {
        create: {
          slug: 'isabel-diaz',
          profilePicture: 'https://example.com/isabel.jpg',
          bio: 'Experta en turismo de aventura',
        },
      },
      tokenVersion: { create: {} },
    },
  });

  // Crear negocios
  // 1. Peluquería Glamour (Belleza y Spa)
  const business1 = await prisma.business.upsert({
    where: { name: 'Peluquería Glamour' },
    update: {},
    create: {
      slug: 'peluqueria-glamour',
      name: 'Peluquería Glamour',
      description: 'Servicios de peluquería y estilismo profesional',
      address: 'Avenida Comercial 456',
      latitude: 19.432607,
      longitude: -99.133208,
      phone: '+5551234567',
      userId: businessOwner1.id,
      businessProfile: {
        create: {
          bannerImage: 'https://example.com/peluqueria-banner.jpg',
          website: 'https://peluqueria-glamour.com',
          socialMedia: {
            facebook: 'peluqueriaglamour',
            instagram: '@peluqueria_glamour',
          },
        },
      },
      categories: {
        create: [
          {
            category: {
              connect: { name: 'Belleza y Spa' },
            },
          },
        ],
      },
      images: {
        create: [
          {
            imageUrl: 'https://example.com/peluqueria1.jpg',
            order: 1,
          },
          {
            imageUrl: 'https://example.com/peluqueria2.jpg',
            order: 2,
          },
        ],
      },
    },
  });

  // 2. Centro Médico Bienestar (Salud y Bienestar)
  const business2 = await prisma.business.upsert({
    where: { name: 'Centro Médico Bienestar' },
    update: {},
    create: {
      slug: 'centro-medico-bienestar',
      name: 'Centro Médico Bienestar',
      description:
        'Centro médico especializado en medicina preventiva y bienestar integral',
      address: 'Calle Salud 123',
      latitude: 19.435607,
      longitude: -99.136208,
      phone: '+5552345678',
      userId: businessOwner2.id,
      businessProfile: {
        create: {
          bannerImage: 'https://example.com/centro-medico-banner.jpg',
          website: 'https://centromedicobienestar.com',
          socialMedia: {
            facebook: 'centromedicobienestar',
            instagram: '@centro_medico_bienestar',
          },
        },
      },
      categories: {
        create: [
          {
            category: {
              connect: { name: 'Salud y Bienestar' },
            },
          },
        ],
      },
      images: {
        create: [
          {
            imageUrl: 'https://example.com/centro-medico1.jpg',
            order: 1,
          },
          {
            imageUrl: 'https://example.com/centro-medico2.jpg',
            order: 2,
          },
        ],
      },
    },
  });

  // 3. Restaurante El Sabor (Comida y Cocina)
  const business3 = await prisma.business.upsert({
    where: { name: 'Restaurante El Sabor' },
    update: {},
    create: {
      slug: 'restaurante-el-sabor',
      name: 'Restaurante El Sabor',
      description:
        'Restaurante de comida tradicional con los mejores sabores locales',
      address: 'Avenida Gastronómica 789',
      latitude: 19.438607,
      longitude: -99.139208,
      phone: '+5553456789',
      userId: businessOwner3.id,
      businessProfile: {
        create: {
          bannerImage:
            'https://img.freepik.com/free-vector/restaurant-banner-design_23-2148639461.jpg',
          website: 'https://restauranteelsabor.com',
          socialMedia: {
            facebook: 'restauranteelsabor',
            instagram: '@restaurante_el_sabor',
          },
        },
      },
      categories: {
        create: [
          {
            category: {
              connect: { name: 'Comida y Cocina' },
            },
          },
        ],
      },
      images: {
        create: [
          {
            imageUrl:
              'https://img.freepik.com/free-photo/restaurant-interior_1127-3394.jpg',
            order: 1,
          },
          {
            imageUrl:
              'https://img.freepik.com/free-photo/delicious-food-plate-restaurant_23-2149155026.jpg',
            order: 2,
          },
        ],
      },
    },
  });

  // 4. Consultoría Legal Experta (Servicios Profesionales)
  const business4 = await prisma.business.upsert({
    where: { name: 'Consultoría Legal Experta' },
    update: {},
    create: {
      slug: 'consultoria-legal-experta',
      name: 'Consultoría Legal Experta',
      description:
        'Servicios legales profesionales para empresas y particulares',
      address: 'Calle Justicia 456',
      latitude: 19.441607,
      longitude: -99.142208,
      phone: '+5554567890',
      userId: businessOwner4.id,
      businessProfile: {
        create: {
          bannerImage:
            'https://img.freepik.com/free-vector/law-firm-banner-template_23-2148925599.jpg',
          website: 'https://consultorialegal.com',
          socialMedia: {
            facebook: 'consultorialegalexperta',
            instagram: '@consultoria_legal',
          },
        },
      },
      categories: {
        create: [
          {
            category: {
              connect: { name: 'Servicios Profesionales' },
            },
          },
        ],
      },
      images: {
        create: [
          {
            imageUrl:
              'https://img.freepik.com/free-photo/lawyer-office-with-scales-justice_23-2148898776.jpg',
            order: 1,
          },
          {
            imageUrl:
              'https://img.freepik.com/free-photo/business-people-shaking-hands-finishing-meeting_53876-25656.jpg',
            order: 2,
          },
        ],
      },
    },
  });

  // 5. Servicios de Limpieza Hogar (Servicios del Hogar)
  const business5 = await prisma.business.upsert({
    where: { name: 'Servicios de Limpieza Hogar' },
    update: {},
    create: {
      slug: 'servicios-limpieza-hogar',
      name: 'Servicios de Limpieza Hogar',
      description:
        'Servicios profesionales de limpieza para hogares y oficinas',
      address: 'Calle Limpieza 123',
      latitude: 19.444607,
      longitude: -99.145208,
      phone: '+5555678901',
      userId: businessOwner5.id,
      businessProfile: {
        create: {
          bannerImage:
            'https://img.freepik.com/free-vector/cleaning-service-banner-template_23-2148776265.jpg',
          website: 'https://limpiezahogar.com',
          socialMedia: {
            facebook: 'serviciosdelimpiezahogar',
            instagram: '@limpieza_hogar',
          },
        },
      },
      categories: {
        create: [
          {
            category: {
              connect: { name: 'Servicios del Hogar' },
            },
          },
        ],
      },
      images: {
        create: [
          {
            imageUrl:
              'https://img.freepik.com/free-photo/cleaning-service-with-professional-equipment_23-2149345507.jpg',
            order: 1,
          },
          {
            imageUrl:
              'https://img.freepik.com/free-photo/woman-cleaning-house-with-professional-equipment_23-2149345499.jpg',
            order: 2,
          },
        ],
      },
    },
  });

  // 6. Academia Cultural Artes (Educación y Cultura)
  const business6 = await prisma.business.upsert({
    where: { name: 'Academia Cultural Artes' },
    update: {},
    create: {
      slug: 'academia-cultural-artes',
      name: 'Academia Cultural Artes',
      description: 'Academia de artes y cultura para todas las edades',
      address: 'Avenida Cultural 789',
      latitude: 19.447607,
      longitude: -99.148208,
      phone: '+5556789012',
      userId: businessOwner6.id,
      businessProfile: {
        create: {
          bannerImage:
            'https://img.freepik.com/free-vector/art-culture-banner-template_23-2148888223.jpg',
          website: 'https://academiacultural.com',
          socialMedia: {
            facebook: 'academiacultural',
            instagram: '@academia_cultural',
          },
        },
      },
      categories: {
        create: [
          {
            category: {
              connect: { name: 'Educación y Cultura' },
            },
          },
        ],
      },
      images: {
        create: [
          {
            imageUrl:
              'https://img.freepik.com/free-photo/art-class-with-teacher-students_23-2148721891.jpg',
            order: 1,
          },
          {
            imageUrl:
              'https://img.freepik.com/free-photo/music-class-with-teacher-students_23-2148721899.jpg',
            order: 2,
          },
        ],
      },
    },
  });

  // 7. Agencia de Viajes Aventura (Viajes y Turismo)
  const business7 = await prisma.business.upsert({
    where: { name: 'Agencia de Viajes Aventura' },
    update: {},
    create: {
      slug: 'agencia-viajes-aventura',
      name: 'Agencia de Viajes Aventura',
      description: 'Agencia de viajes especializada en turismo de aventura',
      address: 'Calle Viajera 456',
      latitude: 19.450607,
      longitude: -99.151208,
      phone: '+5557890123',
      userId: businessOwner7.id,
      businessProfile: {
        create: {
          bannerImage:
            'https://img.freepik.com/free-vector/travel-agency-banner-template_23-2148614272.jpg',
          website: 'https://viajesaventura.com',
          socialMedia: {
            facebook: 'viajesaventura',
            instagram: '@viajes_aventura',
          },
        },
      },
      categories: {
        create: [
          {
            category: {
              connect: { name: 'Viajes y Turismo' },
            },
          },
        ],
      },
      images: {
        create: [
          {
            imageUrl:
              'https://img.freepik.com/free-photo/travel-agent-office-with-maps-brochures_23-2148916580.jpg',
            order: 1,
          },
        ],
      },
    },
  });

  // Crear servicios para cada negocio
  // Servicios para Peluquería de Ejemplo (business1)
  const haircutService = await prisma.service.create({
    data: {
      name: 'Corte de Cabello',
      price: 300.5,
      time: 60,
      businessId: business1.id,
      Availability: {
        create: [
          {
            dayOfWeek: 5,
            startTime: new Date('1970-01-01T09:00:00Z'),
            endTime: new Date('1970-01-01T18:00:00Z'),
            businessId: business1.id,
          },
        ],
      },
    },
  });

  await prisma.service.create({
    data: {
      name: 'Tinte de Cabello',
      price: 500.0,
      time: 120,
      businessId: business1.id,
      Availability: {
        create: [
          {
            dayOfWeek: 3,
            startTime: new Date('1970-01-01T10:00:00Z'),
            endTime: new Date('1970-01-01T19:00:00Z'),
            businessId: business1.id,
          },
        ],
      },
    },
  });

  // Servicios para Centro Médico Bienestar (business2)
  await prisma.service.create({
    data: {
      name: 'Consulta Médica General',
      price: 800.0,
      time: 45,
      businessId: business2.id,
      Availability: {
        create: [
          {
            dayOfWeek: 1,
            startTime: new Date('1970-01-01T08:00:00Z'),
            endTime: new Date('1970-01-01T16:00:00Z'),
            businessId: business2.id,
          },
        ],
      },
    },
  });

  // Servicios para Restaurante El Sabor (business3)
  await prisma.service.create({
    data: {
      name: 'Reserva de Mesa',
      price: 0.0,
      time: 120,
      businessId: business3.id,
      Availability: {
        create: [
          {
            dayOfWeek: 6,
            startTime: new Date('1970-01-01T18:00:00Z'),
            endTime: new Date('1970-01-01T23:00:00Z'),
            businessId: business3.id,
          },
        ],
      },
    },
  });

  // Servicios para Consultoría Legal Experta (business4)
  await prisma.service.create({
    data: {
      name: 'Asesoría Legal',
      price: 1200.0,
      time: 60,
      businessId: business4.id,
      Availability: {
        create: [
          {
            dayOfWeek: 2,
            startTime: new Date('1970-01-01T09:00:00Z'),
            endTime: new Date('1970-01-01T17:00:00Z'),
            businessId: business4.id,
          },
        ],
      },
    },
  });

  // Servicios para Servicios de Limpieza Hogar (business5)
  await prisma.service.create({
    data: {
      name: 'Limpieza Completa de Hogar',
      price: 600.0,
      time: 180,
      businessId: business5.id,
      Availability: {
        create: [
          {
            dayOfWeek: 4,
            startTime: new Date('1970-01-01T08:00:00Z'),
            endTime: new Date('1970-01-01T16:00:00Z'),
            businessId: business5.id,
          },
        ],
      },
    },
  });

  // Servicios para Academia Cultural Artes (business6)
  await prisma.service.create({
    data: {
      name: 'Clases de Pintura',
      price: 350.0,
      time: 90,
      businessId: business6.id,
      Availability: {
        create: [
          {
            dayOfWeek: 3,
            startTime: new Date('1970-01-01T15:00:00Z'),
            endTime: new Date('1970-01-01T19:00:00Z'),
            businessId: business6.id,
          },
        ],
      },
    },
  });

  // Servicios para Agencia de Viajes Aventura (business7)
  await prisma.service.create({
    data: {
      name: 'Tour Guiado',
      price: 1500.0,
      time: 480,
      businessId: business7.id,
    },
  });

  // Crear cita
  const appointment = await prisma.appointment.create({
    data: {
      datetime: new Date('2024-03-25T15:00:00Z'),
      state: 'Confirm',
      clientId: clientUser.id,
      serviceId: haircutService.id,
      businessId: business1.id,
    },
  });

  // Crear trabajo relacionado
  await prisma.work.create({
    data: {
      status: 'Progress',
      initDate: new Date(),
      clientId: clientUser.id,
      businessId: business1.id,
      appointmentId: appointment.id,
      payment: {
        create: {
          amount: 300.5,
          status: 'COMPLETED',
          paymentMethod: 'Tarjeta de Crédito',
          clientId: clientUser.id,
          businessId: business1.id,
        },
      },
      review: {
        create: {
          rate: 5,
          comment: 'Excelente servicio!',
          clientId: clientUser.id,
          businessId: business1.id,
        },
      },
    },
  });

  // Crear conversación
  const conversation = await prisma.conversation.create({
    data: {
      clientId: clientUser.id,
      businessUserId: businessOwner1.id,
      messages: {
        create: [
          {
            content: '¿Tienen disponibilidad para hoy?',
            senderId: clientUser.id,
            receiverId: businessOwner1.id,
            status: 'SENT',
          },
        ],
      },
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

void main();
