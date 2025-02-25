import {
  BusinessResponseDto,
  SearchBusinessDto,
} from '@/infrastructure/dto/business';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PaginationResponseDto } from '@/infrastructure/dto/pagination.dto';
import { BusinessRepository } from '@/domain/interfaces/business-repository';

export class FilterBusinessByUserByCategoryNameUseCase {
  constructor(private readonly businessRepository: BusinessRepository) {}

  /**
   * Executes the process of searching a business by name or category name.
   *
   * This method performs the following operations:
   * - Counts the total number of businesses in the repository.
   * - Searches the business using the provided name and category name
   *   and returns the result paginated.
   * - Returns a pagination response with the result data.
   *
   * @param {SearchBusinessDto} searchDto - The search query data transfer object.
   * @returns {Promise<PaginationResponseDto<BusinessResponseDto[]>>} A promise that resolves with a pagination response containing the result data.
   * @throws {NotFoundException} If the business is not found.
   */
  async execute({
    name,
    category,
    page = 1,
    limit = 10,
    order = 'desc',
  }: SearchBusinessDto): Promise<PaginationResponseDto<BusinessResponseDto[]>> {
    const skip = (page - 1) * limit;

    const [count, result] = await Promise.all([
      this.businessRepository.countBusiness(),
      this.businessRepository.searchBusiness(
        skip,
        limit,
        order,
        name,
        category,
      ),
    ]);

    if (!result) throw new NotFoundException('Not found business');

    return {
      pages: count ? Math.ceil(count / limit) : 1,
      prev: page > 1 ? page - 1 : null,
      next: page * limit < count ? page + 1 : null,
      limit,
      data: plainToInstance(BusinessResponseDto, result),
    };
  }
}
