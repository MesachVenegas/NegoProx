import { ConflictException, Injectable } from '@nestjs/common';

import { User } from './user.entity';
import { PrismaService } from '@/prisma/prisma.service';
import { UserProfileAccDto } from './dto/user-profile-acc.dto';
import { QuerySearchUserDto } from './dto/user-query-search.dto';
import { IUserRepository } from './interfaces/repository.interface';
import { NotFoundException } from '@/shared/exceptions/not-found.exception';
import { IPagination } from '@/shared/common/interfaces/pagination.interface';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Retrieves a list of users from the database with optional pagination and sorting.
   *
   * @param skip - The number of users to skip, for pagination.
   * @param limit - The maximum number of users to retrieve.
   * @param sortBy - The field by which to sort the users.
   * @param order - The order in which to sort the users, either 'asc' or 'desc'.
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

  /**
   * Retrieves the total count of users in the database.
   *
   * @returns A promise that resolves with the total count of users.
   */
  async countUsers(): Promise<number> {
    return this.prisma.user.count();
  }

  /**
   * Finds a user in the database based on the provided query.
   * The search can be performed using the user's ID, email, or phone number.
   * If a user is found, their profile and associated accounts are included in the result.
   *
   * @param query - An object containing optional search criteria: id, email, or phone.
   * @returns A promise that resolves with the user's profile and accounts.
   * @throws NotFoundException if no user is found.
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
   * Creates a new user with the provided data, and automatically associates it with a local account.
   * The password is hashed and stored securely.
   * @param data - The user data to create.
   * @returns A promise that resolves with the new user.
   */
  async createLocalUser(data: User): Promise<User> {
    const existing = await this.findUser({ email: data.email });
    if (existing)
      throw new ConflictException(`User with "${data.email}" already exist`);
    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        lastName: data.lastName,
        email: data.email,
        password: data.getPasword(),
        accounts: { create: { provider: 'local', providerId: data.email } },
        userProfile: { create: {} },
        tokenVersion: { create: {} },
      },
    });

    return new User(user);
  }

  /**
   * Updates a user's details in the database based on the provided ID.
   *
   * This method updates the user's name, last name, email, and phone number.
   * Additionally, it updates the user's profile with the provided bio, profile picture,
   * and address. The updated user's profile and associated accounts are included in the result.
   *
   * @param user - An object containing the user's updated details.
   * @param id - The unique identifier of the user to be updated.
   * @returns A promise that resolves with the updated user's profile and accounts.
   */
  async update(user: UpdateUserDto, id: string): Promise<UserProfileAccDto> {
    return await this.prisma.user.update({
      where: { id },
      data: {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        userProfile: {
          update: {
            bio: user.bio,
            profilePicture: user.profilePicture,
            address: user.address,
          },
        },
      },
      include: {
        userProfile: true,
        accounts: true,
      },
    });
  }

  async disableAccount(id: string): Promise<UserProfileAccDto> {
    const result = await this.prisma.user.update({
      where: { id },
      data: { isDisabled: true },
      include: {
        userProfile: true,
        accounts: true,
      },
    });

    return new UserProfileAccDto(result);
  }
}
