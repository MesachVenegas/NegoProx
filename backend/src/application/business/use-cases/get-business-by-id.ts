import { NotFoundException } from '@nestjs/common';
import { BusinessRepository } from '@/domain/interfaces/business-repository';

export class GetBusinessByIdUseCase {
  constructor(private readonly businessRepository: BusinessRepository) {}

  /**
   * Retrieves a business by its ID.
   *
   * This method performs the following operations:
   * - Finds the business using the provided ID.
   * - Throws a NotFoundException if the business is not found.
   *
   * @param id - The unique identifier of the business to find.
   * @returns A promise that resolves with the business details associated with the ID.
   * @throws NotFoundException if the business cannot be found or does not exist.
   */
  async execute(id: string) {
    const result = await this.businessRepository.findBusinessById(id);
    if (!result || Object.keys(result).length === 0)
      throw new NotFoundException('The business cannot be found or not exists');

    const { business, rate } = result;

    return {
      business: business,
      rate: rate,
    };
  }
}
