import { Role } from '@/domain/constants/role.enum';
import { Availability } from '@/domain/entities/business';
import { AvailabilityRepository } from '@/domain/interfaces/availability-repository';
import { AuthorizationDto } from '@/infrastructure/dto/auth/authorization.dto';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

export class DeleteAvailabilityUseCase {
  constructor(
    private readonly availabilityRepository: AvailabilityRepository,
  ) {}

  /**
   * Deletes an availability by its business ID, verifying user permissions.
   *
   * This method performs the following operations:
   * - Retrieves the availability using the provided business ID.
   * - Checks if the availability exists.
   * - Verifies that the user requesting the deletion is either the owner of the business or has an admin role.
   * - Deletes the availability in the repository.
   *
   * @param {AuthorizationDto} dto - The AuthorizationDto object containing the user ID and role.
   * @param {string} businessId - The ID of the business whose availability is to be deleted.
   * @returns {Promise<Availability>} A promise that resolves with the deleted availability entity.
   * @throws {NotFoundException} if the availability is not found.
   * @throws {ForbiddenException} if the user does not have the necessary permission.
   */
  async execute(
    { userId, role }: AuthorizationDto,
    businessId: string,
  ): Promise<Availability> {
    const availability =
      await this.availabilityRepository.getAvailabilityByBusinessId(businessId);
    if (!availability) throw new NotFoundException('Availability not found.');

    if (availability.business?.userId !== userId && role !== Role.ADMIN) {
      throw new ForbiddenException('You do not have permission to delete.');
    }

    const result = await this.availabilityRepository.deleteAvailability(
      availability.id as string,
    );

    return result;
  }
}
