import { User } from '@/domain/entities/user';
import { Role } from '@/domain/constants/role.enum';
import { PrismaService } from '../orm/prisma.service';
import { AccountRepository } from '@/domain/interfaces/account-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountPrismaRepository implements AccountRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAccount(provider: string, providerId: string) {
    const account = await this.prisma.account.findUnique({
      where: {
        provider_providerId: { provider: provider, providerId: providerId },
      },
      include: { user: true },
    });

    if (!account?.user) return null;

    return new User({
      ...account?.user,
      userType: account?.user.userType as Role,
    });
  }
}
