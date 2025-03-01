import { ForbiddenException } from '@nestjs/common';

import { Role } from '@/domain/constants/role.enum';
import { UpdateAvalability } from '../dto/update-availability';
import { AvailabilityRepository } from '@/domain/interfaces/availability-repository';

export class UpdateAvailabilityUseCase {
  constructor(
    private readonly availabilityRepository: AvailabilityRepository,
  ) {}

  /**
   * Updates an availability entity with new data after verifying user permissions.
   *
   * This method performs the following operations:
   * - Retrieves the availability using the provided business ID.
   * - Checks if the availability exists.
   * - Verifies that the user requesting the update is either the owner of the availability or has an admin role.
   * - Updates the availability with the provided data.
   * - Saves the updated availability entity back to the repository.
   *
   * @param userId - The ID of the user attempting to update the availability.
   * @param role - The role of the user, which can affect permission.
   * @param businessId - The ID of the business to associate the availability with.
   * @param data - A partial DTO containing the updated availability data.
   * @returns A promise that resolves with the updated availability entity.
   * @throws Error if the availability is not found.
   * @throws Error if the user does not have the necessary permission.
   */

  async execute({ userId, role, businessId, data }: UpdateAvalability) {
    const availability =
      await this.availabilityRepository.getAvailabilityByBusinessId(businessId);
    if (!availability) throw new Error('Availability not found.');

    if (availability.business?.userId !== userId && role !== Role.ADMIN) {
      throw new ForbiddenException(
        'You do not have permission to update this availability.',
      );
    }

    availability.update({
      ...data,
      startTime: data.startTime
        ? new Date(new Date(`1970-01-01T${data.startTime}:00Z`))
        : undefined,
      endTime: data.endTime
        ? new Date(new Date(`1970-01-01T${data.endTime}:00Z`))
        : undefined,
    });

    const updatedAvailability =
      await this.availabilityRepository.updateAvailability(availability);

    return updatedAvailability;
  }
}
