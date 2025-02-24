import { Injectable } from '@nestjs/common';

import { Role } from '@/domain/constants/role.enum';
import { Account, User, UserProfile } from '@/domain/entities';
import { PrismaService } from '@/infrastructure/orm/prisma.service';
import { UserRepository } from '@/domain/interfaces/user-repository';

@Injectable()
export class UserPrismaRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Retrieves a list of users from the database with optional pagination and sorting.
   *
   * @param skip - The number of users to skip, for pagination.
   * @param limit - The maximum number of users to retrieve.
   * @param order - The order in which to sort the users, either 'asc' or 'desc'.
   * @returns A promise that resolves with an array of User objects.
   */
  async getAllUsers(skip: number, limit: number, order: 'asc' | 'desc') {
    const users = await this.prisma.user.findMany({
      skip,
      take: limit,
      orderBy: { registerAt: order },
    });

    if (!users.length) return null;

    return users.map(
      (user) => new User({ ...user, userType: user.userType as Role }),
    );
  }

  /**
   * Retrieves the total count of users in the database.
   *
   * @returns A promise that resolves with the total count of users.
   */
  async countUsers(): Promise<number> {
    return this.prisma.user.count({
      where: { isDeleted: false, isDisabled: false },
    });
  }

  /**
   * Retrieves a user from the database by one of the following criteria:
   * - ID
   * - Email
   * - Phone
   *
   * @param id - (Optional) The unique identifier of the user to retrieve.
   * @param email - (Optional) The email address of the user to retrieve.
   * @param phone - (Optional) The phone number of the user to retrieve.
   * @returns A promise that resolves with the User object if found.
   */
  async searchUserByQuery(id?: string, email?: string, phone?: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ id }, { email }, { phone }],
      },
      include: {
        userProfile: { omit: { userId: true } },
        accounts: { omit: { userId: true } },
      },
    });

    if (!user) return null;

    return new User({
      ...user,
      userType: user.userType as Role,
      userProfile: user.userProfile as UserProfile,
      accounts: user.accounts as Account[],
    });
  }

  /**
   * Creates a new user in the database with a local account.
   *
   * @param data - The user entity containing the data for the new user.
   * @returns A promise that resolves with the newly created User object.
   */
  async saveLocalUser(data: User) {
    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        lastName: data.lastName,
        email: data.email,
        password: data.getPassword(),
        accounts: { create: { provider: 'local', providerId: data.email } },
        userProfile: { create: {} },
        tokenVersion: { create: {} },
      },
    });

    return new User({ ...user, userType: user.userType as Role });
  }

  /**
   * Updates a user in the database with the given id.
   *
   * @param user - The user entity containing the updated data.
   * @param id - The id of the user to update.
   * @returns A promise that resolves with the updated User object.
   */
  async updateUser(user: User) {
    const userUpdated = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        userProfile: {
          update: {
            bio: user.userProfile?.bio,
            profilePicture: user.userProfile?.profilePicture,
            address: user.userProfile?.address,
          },
        },
      },
      include: {
        userProfile: { omit: { userId: true } },
        accounts: { omit: { userId: true } },
      },
    });

    return new User({
      ...userUpdated,
      userType: userUpdated.userType as Role,
      userProfile: userUpdated.userProfile as UserProfile,
      accounts: userUpdated.accounts as Account[],
    });
  }

  /**
   * Updates the password for a user with the given ID.
   *
   * @param password - The new password to set for the user.
   * @param id - The unique identifier of the user whose password is to be updated.
   * @returns A promise that resolves with the updated User object.
   */
  async updatePassword(password: string, id: string): Promise<User> {
    const userUpdated = await this.prisma.user.update({
      where: { id },
      data: { password },
    });

    return new User({ ...userUpdated, userType: userUpdated.userType as Role });
  }

  /**
   * Retrieves a user by their ID.
   *
   * @param id - The unique identifier of the user to retrieve.
   * @returns A promise that resolves with the User object if found.
   */
  async findUserById(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) return null;

    return new User({ ...user, userType: user.userType as Role });
  }

  /**
   * Retrieves a user by their email address.
   *
   * @param email - The email address of the user to retrieve.
   * @returns A promise that resolves with the User object if found.
   */
  async findUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) return null;

    return new User({ ...user, userType: user.userType as Role });
  }

  /**
   * Disables a user account by setting the `isDisabled` field to true.
   *
   * @param id - The unique identifier of the user account to disable.
   * @returns A promise that resolves with the updated User object, including the user's profile and accounts.
   */
  async disableAccount(id: string) {
    const result = await this.prisma.user.update({
      where: { id },
      data: { isDisabled: true },
      include: {
        userProfile: { omit: { userId: true } },
        accounts: { omit: { userId: true } },
      },
    });

    return new User({
      ...result,
      userType: result.userType as Role,
      userProfile: result.userProfile as UserProfile,
      accounts: result.accounts as Account[],
    });
  }

  /**
   * Deletes a user account logically by setting the `isDeleted` field to true.
   *
   * @param id - The unique identifier of the user account to delete.
   * @returns A promise that resolves with the deleted User object.
   */
  async logicDeleteAccount(id: string): Promise<User> {
    const deleted = await this.prisma.user.update({
      where: { id },
      data: {
        isDeleted: true,
      },
    });

    return new User({ ...deleted, userType: deleted.userType as Role });
  }
}
