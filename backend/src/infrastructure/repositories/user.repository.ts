import { ConflictException, Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { User } from '../../Domain/entities/user.entity';
import { UserRepositoryInterface } from '@app/interfaces/user';
import { PrismaService } from '@infrastructure/database/prisma.service';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Creates a new user.
   *
   * @param {Prisma.UserCreateInput} user
   * @returns {Promise<User>}
   * @throws {ConflictException} if the user already exists
   */
  async create(user: Prisma.UserCreateInput): Promise<User> {
    try {
      return this.prisma.user.create({ data: user });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('User already exists');
      }
      throw error;
    }
  }

  async findUserByEmail(email?: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findUserById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async markEmailAsConfirmed(id: string): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: { email_confirmed: true },
    });
  }
}
