import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Business } from './business.entity';
import { Role } from '@/shared/constants/role.enum';
import { PrismaService } from '@/prisma/prisma.service';
import { IPagination } from '@/shared/interfaces/pagination.interface';
import { ResponseUserDto } from '../user/dto/user-response.dto';

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
      where: { isDeleted: false },
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
  async saveLocalBusiness(entity: Business) {
    const { name, description, address, phone, user } = entity;
    return this.prisma.business.create({
      data: {
        name,
        description,
        address,
        phone,
        user: {
          create: {
            name: user?.name ?? '',
            lastName: user?.lastName ?? '',
            email: user?.email ?? '',
            password: user?.password ?? '',
            userType: 'BUSINESS',
            accounts: {
              create: { provider: 'local', providerId: user?.email },
            },
            userProfile: { create: {} },
            tokenVersion: { create: {} },
          },
        },
      },
    });
  }

  /**
   * Promotes a user to a business owner by creating a new business and connecting it to the user.
   * The user is also updated to have the BUSINESS role, if not already.
   *
   * @param entity - The business entity to create.
   * @param user - The user to promote to a business owner.
   * @returns The created business entity with the connected user.
   * @throws ConflictException if a business with the same name and user already exists.
   */
  async promoteBusinessOwner(entity: Business, user: ResponseUserDto) {
    const { name, description, address, phone } = entity;

    const exist = await this.prisma.business.findUnique({
      where: { name_userId: { name, userId: user.id } },
    });
    if (exist) throw new ConflictException('Business already exist');

    return this.prisma.$transaction(async (tx) => {
      const business = await tx.business.create({
        data: {
          name,
          description,
          address,
          phone,
          user: {
            connect: { id: user.id },
          },
        },
        include: { user: true },
      });

      if (user.userType !== Role.BUSINESS) {
        await tx.user.update({
          where: { id: user.id },
          data: { userType: Role.BUSINESS },
        });
      }

      return business;
    });
  }

  // TODO: implement update a business.
  // TODO: implement delete a business.

  /**
   * Deletes a business by its ID.
   *
   * This method sets the `isDeleted` field of the business to true, effectively
   * soft-deleting it. This allows the business to be recovered if needed.
   * @param id - The unique identifier of the business to delete.
   * @returns A promise that resolves with the deleted business entity.
   * @throws NotFoundException if the business with the given ID is not found.
   */
  async deleteBusiness(id: string) {
    return this.prisma.business.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
