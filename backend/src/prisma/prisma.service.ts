import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, 'query' | 'error'>
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger: Logger = new Logger(PrismaService.name);
  private isConnected = false;

  constructor() {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'event', level: 'error' },
        { emit: 'event', level: 'info' },
        { emit: 'event', level: 'warn' },
      ],
    });

    this.setupLogging();
  }

  async onModuleInit() {
    await this.connectionWithRetry();
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
      this.logger.log('Database connection closed');
    } catch (error) {
      this.logger.error(`Failed to disconnect from database: ${error}`);
      throw error;
    }
  }

  private setupLogging() {
    this.$on('query', (e) => {
      if (!this.isConnected) {
        this.logger.log(`Database connection lost, Attempting to reconnect...`);
        void this.reconnect();
      }

      this.logger.debug(`Query: ${e.query}`);
      this.logger.debug(`Params: ${e.params}`);
      this.logger.debug(`Duration: ${e.duration}ms`);
    });

    this.$on('error', (e) => {
      if (e.message.includes('E57P01')) {
        this.logger.warn(
          `Warning: database server connection lost, database in on hibernation`,
        );
        // void this.reconnect();
      }
      this.logger.error(`Error: ${JSON.stringify(e.message)}`);
    });
  }

  private async connectionWithRetry(retries = 5, delay = 5000) {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        await this.$connect();
        this.isConnected = true;
        this.logger.log('Database connection established');
        return;
      } catch (error) {
        this.logger.error(
          `Database connection failed,(Attempt  ${attempt}/${retries} failed: ${error})`,
        );
        this.isConnected = false;
        if (attempt < retries) {
          this.logger.warn(`Retrying in ${delay / 1000} seconds...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
        } else {
          throw new Error('Database connection failed, after all retries.');
        }
      }
    }
  }

  private async reconnect() {
    this.isConnected = false;
    try {
      await this.$disconnect();
      await this.connectionWithRetry();
    } catch (error) {
      this.logger.error(`Failed to reconnect to database: ${error}`);
    }
  }
}
