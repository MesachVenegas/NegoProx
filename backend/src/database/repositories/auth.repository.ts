import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createLocalAccount(userId: string, provider: string, password: string) {
    await this.prisma.account.create({
      data: {
        userId,
        provider,
        passwordHash: password,
      },
    });
  }
}
