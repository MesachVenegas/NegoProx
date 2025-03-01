import { Role } from '@/domain/constants/role.enum';
import { Availability } from '@/domain/entities/business';
import { AvailabilityRepository } from '@/domain/interfaces/availability-repository';
import { AuthorizationDto } from '@/infrastructure/dto/auth/authorization.dto';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

export class DeleteAvailabilityUseCase {
  constructor(
    private readonly availabilityRepository: AvailabilityRepository,
  ) {}

  async execute(
    { userId, role }: AuthorizationDto,
    availabilityId: string,
  ): Promise<Availability> {
    const result =
      await this.availabilityRepository.getAvailabilityById(availabilityId);
    if (!result) throw new NotFoundException('Availability not found.');

    if (result.business?.userId !== userId && role !== Role.ADMIN) {
      throw new ForbiddenException('You do not have permission to delete.');
    }

    const response = await this.availabilityRepository.deleteAvailability(
      result.id as string,
    );

    return response;
  }
}
