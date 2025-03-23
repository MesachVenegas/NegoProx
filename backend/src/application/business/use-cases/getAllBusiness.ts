import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { BusinessWhitAverageDto } from '@/infrastructure/dto/business';
import { BusinessRepository } from '@/domain/interfaces/business-repository';
import {
  PaginationDto,
  PaginationResponseDto,
} from '@/infrastructure/dto/pagination.dto';

export class GetAllBusinessUseCase {
  constructor(private readonly businessRepository: BusinessRepository) {}

  async execute({
    page = 1,
    limit = 10,
  }: Partial<PaginationDto>): Promise<
    PaginationResponseDto<BusinessWhitAverageDto[]>
  > {
    const skip = (page - 1) * limit;

    const count = await this.businessRepository.countBusiness();
    const businesses = await this.businessRepository.getAllBusiness({
      skip,
      limit,
    });

    if (!businesses) throw new NotFoundException('Businesses not found.');

    return {
      pages: count ? Math.ceil(count / limit) : 1,
      prev: page > 1 ? page - 1 : null,
      next: page * limit < count ? page + 1 : null,
      limit,
      data: plainToInstance(BusinessWhitAverageDto, businesses),
    };
  }
}
