import { Injectable } from '@nestjs/common';

import { User } from './user.entity';
import { PrismaService } from '@/prisma/prisma.service';
import { FindQuery } from './interfaces/common.interface';
import { IUserRepository } from './interfaces/repository.interface';
import { NotFoundException } from '@/shared/exceptions/not-found.exception';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Retrieves all users from the database.
   *
   * @returns A promise that resolves with an array of User objects.
   */
  async getAllUsers(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => new User(user));
  }

  /**
   * Retrieves a user from the database using the provided FindQuery object.
   * The query can contain an id, email, or phone number to search for.
   * If a user is found, it is returned as a User object, otherwise null is returned.
   *
   * @param query - The FindQuery object to search with.
   * @returns A promise that resolves with a User object or null if no user was found.
   */
  async findUser(query: FindQuery): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ id: query.id }, { email: query.email }, { phone: query.phone }],
      },
      include: {
        userProfile: { omit: { userId: true } },
        accounts: { omit: { userId: true } },
      },
    });
    if (!user) throw new NotFoundException('User not found');
    return new User(user);
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
