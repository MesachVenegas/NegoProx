import { Injectable } from '@nestjs/common';

import { PrismaService } from '@infrastructure/database/prisma.service';

@Injectable()
export class AccountRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAccountByProviderId(providerId: string) {
    return this.prisma.account.findUnique({
      where: { provider_id: providerId },
      include: { user: true },
    });
  }

  async create(data: any) {
    return this.prisma.account.create({
      data,
    });
  }
}
