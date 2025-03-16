import { Module } from '@nestjs/common';
import { AvailabilityController } from '../controllers/availability.controller';
import { AvailabilityPrismaRepository } from '../repositories/availability.repository';
import { BusinessPrismaRepository } from '../repositories/business.repository';

@Module({
  controllers: [AvailabilityController],
  providers: [AvailabilityPrismaRepository, BusinessPrismaRepository],
  exports: [AvailabilityPrismaRepository],
})
export class AvailabilityModule {}
