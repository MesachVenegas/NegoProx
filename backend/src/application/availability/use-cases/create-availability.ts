import {
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';

import { Role } from '@/domain/constants/role.enum';
import { Availability } from '@/domain/entities/business';
import { CreateAvalability } from '../dto/create-availability';
import { BusinessRepository } from '@/domain/interfaces/business-repository';
import { AvailabilityRepository } from '@/domain/interfaces/availability-repository';

export class CreateAvailabilityUseCase {
  constructor(
    private readonly availabilityRepository: AvailabilityRepository,
    private readonly businessRepository: BusinessRepository,
  ) {}

  /**
   * Creates a new availability for a business after verifying user permissions.
   *
   * This method performs the following operations:
   * - Checks if the business exists.
   * - Verifies that the user requesting the creation is either the owner of the business or has an admin role.
   * - Checks if an availability for the business already exists.
   * - Creates the availability with the provided data and associates it with the business.
   * - Saves the created availability entity back to the repository.
   *
   * @param userId - The ID of the user attempting to create the availability.
   * @param role - The role of the user, which can affect permission.
   * @param businessId - The ID of the business to associate the availability with.
   * @param data - A CreateAvalabilityDto object containing the availability data.
   * @returns A promise that resolves with the created availability entity.
   * @throws ConflictException if the business already has availability set.
   * @throws NotFoundException if the business is not found.
   * @throws ForbiddenException if the user does not have the necessary permission.
   */
  async execute({ userId, role, businessId, data }: CreateAvalability) {
    const exist =
      await this.availabilityRepository.getAvailabilityByBusinessId(businessId);

    if (exist)
      throw new ConflictException('The business already has availability set.');

    const result = await this.businessRepository.findBusinessById(businessId);
    if (!result || Object.keys(result).length === 0)
      throw new NotFoundException('Business not found or does not exist');
    const { business } = result;

    if (business.userId !== userId && role !== Role.ADMIN)
      throw new ForbiddenException('Does not have the necessary permission');

    const entity = data.map(
      (item) =>
        new Availability({
          ...item,
          startTime: new Date(`1970-01-01T${item.startTime}:00Z`),
          endTime: new Date(`1970-01-01T${item.endTime}:00Z`),
          businessId,
        }),
    );

    const availability =
      await this.availabilityRepository.saveAvailability(entity);

    return availability;
  }
}
