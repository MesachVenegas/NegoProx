import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';

import { AvailabilityPrismaRepository } from '../repositories/availability.repository';
import { GetBusinessAvailabilityUseCase } from '@/application/availability/use-cases/get-business-availability';
import { plainToInstance } from 'class-transformer';
import { AvailabilityResponseDto } from '../dto/availability/res-availability.dto';

@ApiTags('Availability')
@Controller('availability')
export class AvailabilityController {
  constructor(
    private readonly availabilityRepository: AvailabilityPrismaRepository,
  ) {}

  @Get('/business/:id')
  async getAvailability(@Param('id') id: string) {
    const getAvailability = new GetBusinessAvailabilityUseCase(
      this.availabilityRepository,
    );

    const availability = await getAvailability.execute(id);

    return plainToInstance(AvailabilityResponseDto, availability);
  }
}
