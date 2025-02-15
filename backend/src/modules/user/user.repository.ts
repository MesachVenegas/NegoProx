import { Injectable } from '@nestjs/common';

import { User } from './user.entity';
import { PrismaService } from '@/prisma/prisma.service';
import { QuerySearchUserDto } from './dto/user-query-search.dto';
import { IUserRepository } from './interfaces/repository.interface';
import { NotFoundException } from '@/shared/exceptions/not-found.exception';
import { IPagination } from '@/shared/common/interfaces/pagination.interface';
import { UserProfileAccDto } from './dto/user-profile-acc.dto';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Retrieves all users from the database.
   *
   * @returns A promise that resolves with an array of User objects.
   */
  async getAllUsers({
    skip,
    limit,
    sortBy,
    order,
  }: Partial<IPagination>): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      skip,
      take: limit,
      orderBy: { [sortBy ?? 'registerAt']: order },
    });
    return users.map((user) => new User(user));
  }

  async countUsers(): Promise<number> {
    return this.prisma.user.count();
  }

  /**
   * Retrieves a user from the database using the provided FindQuery object.
   * The query can contain an id, email, or phone number to search for.
   * If a user is found, it is returned as a User object, otherwise null is returned.
   *
   * @param query - The FindQuery object to search with.
   * @returns A promise that resolves with a User object or null if no user was found.
   */
  async findUser(query: QuerySearchUserDto): Promise<UserProfileAccDto> {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ id: query.id }, { email: query.email }, { phone: query.phone }],
      },
      include: {
        userProfile: true,
        accounts: true,
      },
    });
    if (!user) throw new NotFoundException('User not found');
    return new UserProfileAccDto(user);
  }

  /**
   * Creates a new user in the database using the provided User object.
   * The password is retrieved from the User object using the getPasword method.
   * The user is created with a local account and an associated user profile.
   *
   * @param data - The User object to create.
   * @returns A promise that resolves with the created User object.
   */
  async createLocalUser(data: User): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        lastName: data.lastName,
        email: data.email,
        password: data.getPasword(),
        accounts: { create: { provider: 'local', providerId: data.email } },
        userProfile: { create: {} },
      },
    });

    return new User(user);
  }
}
