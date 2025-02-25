import { NotFoundException } from '@nestjs/common';
import { BusinessRepository } from '@/domain/interfaces/business-repository';

export class GetBusinessByOwnerUseCase {
  constructor(private readonly businessRepository: BusinessRepository) {}

  /**
   * Retrieves a business by the owner's ID.
   *
   * This method performs the following operations:
   * - Finds the business using the provided owner ID.
   * - Throws a NotFoundException if the business is not found.
   *
   * @param id - The unique identifier of the business owner.
   * @returns A promise that resolves with the business details associated with the owner.
   * @throws NotFoundException if the business cannot be found or does not exist.
   */
  async execute(id: string) {
    const result = await this.businessRepository.findBusinessByOwnerId(id);
    if (!result)
      throw new NotFoundException('The business cannot be found or not exists');

    return result;
  }
}
