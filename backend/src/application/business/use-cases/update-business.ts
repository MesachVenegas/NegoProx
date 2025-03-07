import { Role } from '@/domain/constants/role.enum';
import { UpdateBusinessParamsDto } from '../dto/update-business';
import { BusinessRepository } from '@/domain/interfaces/business-repository';
import { ForbiddenException } from '@nestjs/common';

export class UpdateBusinessUseCase {
  constructor(private readonly businessRepository: BusinessRepository) {}

  /**
   * Updates a business entity with new data after verifying user permissions.
   *
   * This method performs the following operations:
   * - Retrieves the business using the provided business ID.
   * - Checks if the business exists.
   * - Verifies that the user requesting the update is either the owner of the business or has an admin role.
   * - Updates the business with the provided data, converting latitude and longitude to Decimal types if present.
   * - Saves the updated business entity back to the repository.
   *
   * @param userId - The ID of the user attempting to update the business.
   * @param businessId - The ID of the business to be updated.
   * @param role - The role of the user, which can affect permission.
   * @param dto - A partial DTO containing the updated business data.
   * @returns A promise that resolves with the updated business entity.
   * @throws Error if the business is not found.
   * @throws Error if the user does not have the necessary permission.
   */
  async execute({ userId, businessId, role, dto }: UpdateBusinessParamsDto) {
    const result = await this.businessRepository.findBusinessById(businessId);
    if (!result) throw new Error('Business not found');

    const { business } = result;

    if (business.userId !== userId && role !== Role.ADMIN)
      throw new ForbiddenException(
        'Cannot update business. Does not have the necessary permission',
      );

    business.update({
      ...dto,
      latitude: dto.latitude ? dto.latitude : undefined,
      longitude: dto.longitude ? dto.longitude : undefined,
    });

    const updated = await this.businessRepository.updateBusiness(
      business,
      businessId,
    );

    return updated;
  }
}
