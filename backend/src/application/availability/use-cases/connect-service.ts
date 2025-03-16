import { ForbiddenException, NotFoundException } from '@nestjs/common';

import { Role } from '@/domain/constants/role.enum';
import { ConnectServiceAvailabilityDto } from '../dto/connect-availability';
import { AvailabilityRepository } from '@/domain/interfaces/availability-repository';
import { Availability } from '@/domain/entities/business';

export class ConnectServiceUseCase {
  constructor(
    private readonly availabilityRepository: AvailabilityRepository,
  ) {}

  /**
   * Connects a service to an availability by its ID, verifying user permissions.
   *
   * @param {ConnectServiceAvailabilityDto} dto - The ConnectServiceAvailabilityDto object containing the availability ID to update, the service ID to add, the user ID and role.
   * @returns {Promise<Availability>} A promise that resolves with the updated Availability object.
   * @throws {NotFoundException} if the availability is not found.
   * @throws {ForbiddenException} if the user does not have the necessary permission.
   */
  async execute({
    availabilityId,
    serviceId,
    userId,
    role,
  }: ConnectServiceAvailabilityDto): Promise<Availability> {
    const availability =
      await this.availabilityRepository.getAvailabilityById(availabilityId);
    if (!availability) throw new NotFoundException('Availability not found.');
    if (availability.business?.userId !== userId && role !== Role.ADMIN)
      throw new ForbiddenException(
        'You do not have the necessary permissions.',
      );

    const linked = await this.availabilityRepository.addServiceToAvailability(
      availabilityId,
      serviceId,
    );

    return linked;
  }
}
