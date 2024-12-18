import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
    Logger.log('Database successfully connected');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    Logger.log('Database successfully disconnected');
  }
}
