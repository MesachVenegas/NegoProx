import { UserRepository } from '@/domain/interfaces/user-repository';
import { LogicDeleteBusinessDto } from '../dto/logic-delete';
import { BusinessRepository } from '@/domain/interfaces/business-repository';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Role } from '@/domain/constants/role.enum';

export class LogicDeleteBusinessUseCase {
  constructor(
    private readonly businessRepository: BusinessRepository,
    private readonly userRepository: UserRepository,
  ) {}

  /**
   * Deletes a business logically by verifying the user's ownership or admin role.
   *
   * This method performs the following operations:
   * - Checks if the business exists and is not already marked as deleted.
   * - Verifies that the user requesting the deletion is either the owner or an admin.
   * - Marks the business as deleted in the repository.
   *
   * @param id - The unique identifier of the business to delete.
   * @param userId - The unique identifier of the user attempting to delete the business.
   * @param userType - The role of the user attempting the deletion, which can affect permission.
   * @throws NotFoundException if the business is not found or is already deleted.
   * @throws ForbiddenException if the user does not have the necessary permission.
   * @returns A promise that resolves with the deletion result.
   */
  async execute({ id, userId, userType }: LogicDeleteBusinessDto) {
    const result = await this.businessRepository.findBusinessById(id);
    if (!result) throw new NotFoundException('Business not found');

    const { business } = result;

    if (business.isDeleted)
      throw new NotFoundException('Business already deleted');

    if (business.userId !== userId && userType !== Role.ADMIN)
      throw new ForbiddenException('Does not have the necessary permission');

    return this.businessRepository.deleteBusiness(id);
  }
}
