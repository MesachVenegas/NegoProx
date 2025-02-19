import { Injectable, NotFoundException } from '@nestjs/common';
import { BusinessRepository } from './business.repository';
import {
  PaginationDto,
  PaginationResponseDto,
} from '@/shared/dto/pagination.dto';
import { plainToInstance } from 'class-transformer';
import { BusinessResponseDto } from './dto/business-response.dto';
import { BusinessProfileServiceDto } from './dto/business-profile.dto';

@Injectable()
export class BusinessService {
  constructor(private readonly repo: BusinessRepository) {}

  /**
   * Retrieves a paginated list of businesses with optional sorting.
   *
   * @param page - The page number to retrieve, defaults to 1.
   * @param limit - The maximum number of businesses per page, defaults to 10.
   * @param sortBy - The field by which to sort the businesses, defaults to 'createdAt'.
   * @param order - The order in which to sort the businesses, either 'asc' or 'desc', defaults to 'desc'.
   * @returns A promise that resolves with a PaginationResponseDto containing an array of BusinessResponseDto objects.
   * @throws NotFoundException if no businesses are found.
   */
  async getAllBusiness({
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    order = 'desc',
  }: PaginationDto): Promise<PaginationResponseDto<BusinessResponseDto[]>> {
    const skip = (page - 1) * limit;

    const [count, result] = await Promise.all([
      await this.repo.countBusiness(),
      await this.repo.getAllBusiness({ skip, limit, sortBy, order }),
    ]);

    if (result.length === 0) throw new NotFoundException('No business found');
    return {
      pages: count ? Math.ceil(count / limit) : 1,
      prev: page > 1 ? page - 1 : null,
      next: page * limit < count ? page + 1 : null,
      limit,
      data: plainToInstance(BusinessResponseDto, result),
    };
  }

  /**
   * Retrieves a business from the database by its id.
   * @param id - The id of the business to be retrieved.
   * @returns A promise that resolves with a BusinessProfileServiceDto object.
   * @throws A NotFoundException if the business does not exist.
   */
  async findBusinessById(id: string): Promise<BusinessProfileServiceDto> {
    const business = await this.repo.findBusinessById(id);
    return plainToInstance(BusinessProfileServiceDto, business);
  }
  // TODO: implement find business by query(address, name, latitude, longitude).
  // TODO: implemente create a new business.
  // TODO: implement promote user a business owner.
  // TODO: implement update a business.
  // TODO: implement delete a business.
}
