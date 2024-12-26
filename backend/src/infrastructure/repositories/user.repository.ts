import { ConflictException, Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { plainToInstance } from 'class-transformer';

import { User } from '@domain/entities';
import { RegisterDto } from '@app/dto/auth';
import { UserRepositoryInterface } from '@domain/interfaces';
import { PrismaService } from '@infrastructure/database/prisma.service';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: RegisterDto): Promise<User> {
    try {
      const userCreated = await this.prisma.user.create({ data: user });

      return userCreated ? plainToInstance(User, userCreated) : null;
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
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user ? plainToInstance(User, user) : null;
  }

  async findUserById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user ? plainToInstance(User, user) : null;
  }

  async markEmailAsConfirmed(id: string): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: { email_confirmed: true },
    });
  }

  async resetPassword(id: string, password: string): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: { password },
    });
  }
}
