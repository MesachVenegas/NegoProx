import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { Role } from '@/domain/constants/role.enum';
import { ResponseUserDto } from '../dto/user/user-response.dto';
import { PrismaService } from '@/infrastructure/orm/prisma.service';
import { IPagination } from '@/shared/interfaces/pagination.interface';
import { BusinessProfileDto } from '../dto/business-profile/profile-response.dto';
import { Business } from '@/domain/entities';

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
   * Searches for businesses with optional filters for name and category, and retrieves a paginated list of results.
   *
   * @param skip - The number of businesses to skip, for pagination.
   * @param limit - The maximum number of businesses to retrieve.
   * @param order - The order in which to sort the businesses, either 'asc' or 'desc'.
   * @param name - (Optional) A name filter to search businesses by name.
   * @param category - (Optional) A category filter to search businesses by category.
   * @returns A promise that resolves with an array of Business entities that match the search criteria.
   */
  async searchBusiness(
    skip: number,
    limit: number,
    order: 'asc' | 'desc',
    name?: string,
    category?: string,
  ) {
    const filters: any[] = [];

    if (name) filters.push({ name: { contains: name, mode: 'insensitive' } });
    if (category)
      filters.push({
        categories: {
          some: {
            category: { name: { contains: category, mode: 'insensitive' } },
          },
        },
      });

    const results = await this.prisma.business.findMany({
      where: {
        isDeleted: false,
        ...(filters.length > 0 ? { OR: filters } : {}),
      },
      skip,
      take: limit,
      orderBy: { name: order },
    });

    return plainToInstance(Business, results);
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
   * Finds a business by the owner's ID and retrieves its details.
   *
   * @param id - The unique identifier of the business owner to find.
   * @returns The business details associated with the owner, or null if not found.
   */
  async findBusinessByOwnerId(id: string) {
    const business = await this.prisma.business.findFirst({
      where: { userId: id },
      include: {
        businessProfile: { omit: { businessId: true } },
        services: { omit: { businessId: true } },
        categories: {
          include: { category: true },
          omit: { businessId: true, categoryId: true },
        },
      },
    });

    return plainToInstance(BusinessProfileDto, business);
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
  async getAllBusiness({ skip, limit, order }: Partial<IPagination>) {
    return await this.prisma.business.findMany({
      where: { isDeleted: false },
      skip,
      take: limit,
      orderBy: { createdAt: order },
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
            password: user?.getPassword() ?? '',
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

  /**
   * Updates a business entity with the provided data.
   *
   * @param business - The updated business data.
   * @returns The updated business entity.
   */
  async updateBusiness(business: Business, businessId: string) {
    return this.prisma.business.update({
      where: { id: businessId },
      data: {
        name: business.name,
        description: business.description,
        address: business.address,
        phone: business.phone,
        latitude: business.latitude,
        longitude: business.longitude,
      },
    });
  }

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
