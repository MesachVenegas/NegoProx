import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@/prisma/prisma.service';
import { IPagination } from '@/shared/interfaces/pagination.interface';
import { Business } from './business.entity';
// import { BusinessProfileDto } from './dto/business-profile.dto';

@Injectable()
export class BusinessRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Retrieves the total count of businesses in the database.
   *
   * @returns A promise that resolves with the total count of businesses.
   */
  async countBusiness(): Promise<number> {
    return this.prisma.business.count();
  }

  /**
   * Finds a business by its ID and retrieves its details along with its average rating.
   *
   * @param id - The unique identifier of the business to find.
   * @returns The business details including images, services, profile, categories, and its average rating.
   * @throws NotFoundException if the business with the given ID is not found.
   */
  async findBusinessById(id: string) {
    const [business, review] = await Promise.all([
      this.prisma.business.findUnique({
        where: { id },
        include: {
          images: { omit: { businessId: true } },
          services: { omit: { businessId: true } },
          businessProfile: { omit: { businessId: true } },
          categories: {
            omit: { businessId: true, categoryId: true },
            include: { category: true },
          },
        },
      }),
      await this.prisma.review.aggregate({
        where: { businessId: id },
        _avg: { rate: true },
      }),
    ]);

    if (!business) throw new NotFoundException('Business not found');
    const businessRated = {
      ...business,
      rate: review._avg.rate ?? 0,
    };
    return businessRated;
  }

  /**
   * Retrieves a list of businesses from the database with optional pagination and sorting.
   *
   * @param skip - The number of businesses to skip, for pagination.
   * @param limit - The maximum number of businesses to retrieve.
   * @param sortBy - The field by which to sort the businesses.
   * @param order - The order in which to sort the businesses, either 'asc' or 'desc'.
   * @returns A promise that resolves with an array of BusinessResponseDto objects.
   */
  async getAllBusiness({ skip, limit, sortBy, order }: Partial<IPagination>) {
    return await this.prisma.business.findMany({
      skip,
      take: limit,
      orderBy: { [sortBy ?? 'createdAt']: order },
      include: {
        categories: {
          include: { category: true },
          omit: { businessId: true, categoryId: true },
        },
      },
    });
  }

  /**
   * Registers a new business with a local user.
   *
   * @param entity - The business entity to register.
   * @returns The created business entity.
   */
  async registerBusinessLocal(entity: Business) {
    return this.prisma.business.create({
      data: {
        name: entity.name,
        description: entity.description,
        address: entity.address,
        phone: entity.phone,
        user: {
          create: {
            name: entity.user?.name ?? '',
            lastName: entity.user?.lastName ?? '',
            email: entity.user?.email ?? '',
            password: entity.user?.password ?? '',
            accounts: {
              create: { provider: 'local', providerId: entity.user?.email },
            },
            userProfile: { create: {} },
            tokenVersion: { create: {} },
          },
        },
      },
    });
  }

  // TODO: implement promote user a business owner.
  // TODO: implement update a business.
  // TODO: implement delete a business.
  // TODO: implement add service to a business.
}
