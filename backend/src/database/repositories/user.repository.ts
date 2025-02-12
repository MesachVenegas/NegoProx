import { Injectable } from '@nestjs/common';

import { User } from '@/core/domain/entities';
import { PrismaService } from '../prisma/prisma.service';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: {
    name: string;
    lastName: string;
    email: string;
  }): Promise<User> {
    const user = await this.prisma.user.create({
      data: { ...data },
    });

    return plainToInstance(User, user);
  }
}
