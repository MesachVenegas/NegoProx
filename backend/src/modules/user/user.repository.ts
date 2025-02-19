import { ConflictException, Injectable } from '@nestjs/common';

import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { UserProfileAccDto } from './dto/user-profile-acc.dto';
import { QuerySearchUserDto } from './dto/user-query-search.dto';
import { IUserRepository } from './interfaces/repository.interface';
import { IPagination } from '@/shared/interfaces/pagination.interface';
import { comparePassword, hashPassword } from '@/shared/utils/hash.util';
import { NotFoundException } from '@/shared/exceptions/not-found.exception';
import { plainToInstance } from 'class-transformer';
import { RegisterLocalUserDto } from './dto/register-local-user.dto';

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
    return plainToInstance(User, users);
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

  async findUser(dto: QuerySearchUserDto) {
    const { id, email, phone } = dto;
    console.log(dto);
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ id }, { email }, { phone }],
      },
      include: {
        userProfile: true,
        accounts: true,
      },
    });
    if (!user) throw new NotFoundException('User not found');
    return plainToInstance(UserProfileAccDto, user);
  }

  /**
   * Creates a new user with the provided data, and automatically associates it with a local account.
   * The password is hashed and stored securely.
   * @param data - The user data to create.
   * @returns A promise that resolves with the new user.
   */
  async createLocalUser(data: RegisterLocalUserDto): Promise<User> {
    console.log(data);
    const existing = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existing)
      throw new ConflictException(`User with "${data.email}" already exist`);
    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        accounts: { create: { provider: 'local', providerId: data.email } },
        userProfile: { create: {} },
        tokenVersion: { create: {} },
      },
    });

    return plainToInstance(User, user);
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

  /**
   * Disables a user account.
   *
   * This method sets the user's 'isDisabled' flag to true, effectively disabling their account.
   * The updated user's profile and associated accounts are included in the result.
   *
   * @param id - The unique identifier of the user to be disabled.
   * @returns A promise that resolves with the disabled user's profile and accounts.
   */
  async disableAccount(id: string): Promise<UserProfileAccDto> {
    const result = await this.prisma.user.update({
      where: { id },
      data: { isDisabled: true },
      include: {
        userProfile: true,
        accounts: true,
      },
    });

    return plainToInstance(UserProfileAccDto, result);
  }

  /**
   * Updates a user's password.
   *
   * This method first checks if the user exists in the database. If not, it throws a NotFoundException.
   * It then hashes the provided password and checks if the user already has a password in the database.
   * If the user has no password, it sets the user's password to the newly hashed password.
   * If the user has a password, it checks if the newly hashed password is the same as the existing password.
   * If the passwords are the same, it throws a ConflictException. Otherwise, it updates the user's password to the newly hashed password.
   *
   * @param id - The unique identifier of the user to be updated.
   * @param password - The new password to be set for the user.
   */
  async updatePassword(id: string, password: string) {
    console.log(id);
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    const hashed = await hashPassword(password);
    if (!user.password) {
      await this.changePass(id, hashed);
      return true;
    }
    const match = await comparePassword(password, user.password);
    if (match) throw new ConflictException('Password cannot be the same.');
    await this.changePass(id, hashed);
    return true;
  }

  private async changePass(id: string, password: string) {
    await this.prisma.user.update({
      where: { id },
      data: { password },
    });
  }
}
