import { AvailabilityRepository } from '@/domain/interfaces/availability-repository';
import { NotFoundException } from '@nestjs/common';

export class GetBusinessAvailabilityUseCase {
  constructor(
    private readonly availabilityRepository: AvailabilityRepository,
  ) {}

  async execute(businessId: string) {
    const availability =
      await this.availabilityRepository.getAvailabilityByBusinessId(businessId);
    if (!availability)
      throw new NotFoundException(
        'Not availability found for this business or business does not exist.',
      );

    return availability;
  }
}
