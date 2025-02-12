import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { PrismaService } from '@/prisma/prisma.service';
import { User } from './user.entity';

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
