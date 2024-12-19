import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { User } from '@core/entities/user.entity';
import { UserRepositoryInterface } from '@app/interfaces/user';
import { PrismaService } from '@infrastructure/database/prisma.service';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data: user });
  }

  async findUserByEmail(email?: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findUserById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }
}
