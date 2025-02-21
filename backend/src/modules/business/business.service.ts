import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BusinessRepository } from './business.repository';

import { plainToInstance } from 'class-transformer';
import { BusinessResponseDto } from './dto/business-response.dto';
import { BusinessProfileServiceDto } from './dto/business-profile.dto';
import {
  RegisterBusinessDto,
  RegisterLocalBusinessDto,
} from './dto/register-local-business.dto';
import { hashPassword } from '@/shared/utils/hash.util';
import { Business } from './business.entity';
import { ResponseUserDto } from '../user/dto/user-response.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { SearchBusinessDto } from './dto/search-business.dto';

@Injectable()
export class BusinessService {
  constructor(
    private readonly repo: BusinessRepository,
    // private readonly userService: UserService,
  ) {}

  async searchBusiness({
    name,
    category,
    page = 1,
    limit = 10,
    order = 'desc',
  }: SearchBusinessDto) {
    const skip = (page - 1) * limit;

    const [count, result] = await Promise.all([
      await this.repo.countBusiness(),
      await this.repo.searchBusiness(skip, limit, order, name, category),
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

  /**
   * Finds a business by the owner's ID and retrieves its details.
   *
   * @param id - The unique identifier of the business owner to find.
   * @returns The business details associated with the owner, or null if not found.
   */
  async findBusinessByOwnerId(id: string) {
    return await this.repo.findBusinessByOwnerId(id);
  }

  /**
   * Creates a new business and associates it with a local user.
   *
   * @param dto - The RegisterLocalBusinessDto object containing the business data and user data.
   * @returns A promise that resolves with a BusinessResponseDto object.
   */
  async createLocalBusiness(dto: RegisterLocalBusinessDto) {
    dto.user.password = await hashPassword(dto.user.password);
    const business = plainToInstance(Business, dto);
    const result = await this.repo.saveLocalBusiness(business);
    return plainToInstance(BusinessResponseDto, result);
  }

  /**
   * Promotes a user to a business owner by creating a new business entity and associating it with the user.
   *
   * This function performs the following steps:
   * - Checks if the user exists and is not disabled.
   * - Converts the provided DTO into a Business entity.
   * - Promotes the user to a business owner by creating the business and linking it to the user in the repository.
   *
   * @param dto - The data transfer object containing the business registration details.
   * @param user - The user to be promoted to a business owner.
   * @returns A promise that resolves with the newly created BusinessResponseDto object.
   * @throws NotFoundException if the user is not found or is disabled.
   */
  async promoteBusinessOwner(dto: RegisterBusinessDto, user: ResponseUserDto) {
    if (!user || user.isDisabled) {
      throw new NotFoundException('User not found or disabled');
    }

    const business = plainToInstance(Business, dto);
    const result = await this.repo.promoteBusinessOwner(business, user);
    return plainToInstance(BusinessResponseDto, result);
  }

  /**
   * Updates an existing business entity with new data, verifying ownership.
   *
   * This method performs the following operations:
   * - Checks if the business exists and is not marked as deleted.
   * - Verifies that the user requesting the update is the owner of the business.
   * - Updates the business with the provided data.
   *
   * @param userId - The ID of the user attempting to update the business.
   * @param businessId - The ID of the business to be updated.
   * @param dto - A partial DTO containing the updated business data.
   * @returns A promise that resolves with the updated business entity.
   * @throws NotFoundException if the business is not found or is deleted.
   * @throws ForbiddenException if the user is not the owner of the business.
   */
  async updateBusiness(
    userId: string,
    businessId: string,
    dto: Partial<UpdateBusinessDto>,
  ) {
    const exist = await this.repo.findBusinessById(businessId);
    if (!exist || exist.isDeleted)
      throw new NotFoundException('Business not found or deleted');
    if (exist.userId !== userId)
      throw new ForbiddenException('User is not owner');

    const businessData = plainToInstance(UpdateBusinessDto, dto);

    return this.repo.updateBusiness(businessData, businessId);
  }

  /**
   * Deletes a business by its ID and verifies the ownership.
   *
   * This method performs a series of checks before marking the business as deleted:
   * - It ensures the business exists and is not already marked as deleted.
   * - It verifies that the user requesting the deletion is the owner of the business.
   *
   * @param id - The unique identifier of the business to delete.
   * @param userId - The unique identifier of the user attempting to delete the business.
   * @returns A promise that resolves with the deleted business entity.
   * @throws NotFoundException if the business is not found or is already deleted.
   * @throws ForbiddenException if the user is not the owner of the business.
   */
  async deleteBusiness(id: string, userId: string) {
    const business = await this.repo.findBusinessById(id);
    if (!business) throw new NotFoundException('Business not found');
    if (business.isDeleted)
      throw new NotFoundException('Business already deleted');
    if (business.userId !== userId)
      throw new ForbiddenException('User is not owner');
    return this.repo.deleteBusiness(id);
  }
}
