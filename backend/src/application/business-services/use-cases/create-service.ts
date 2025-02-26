import {
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';

import { Role } from '@/domain/constants/role.enum';
import { CreateNewServiceDto } from '../dto/create-service';
import { BusinessService } from '@/domain/entities/business';
import { BusinessRepository } from '@/domain/interfaces/business-repository';
import { BusinessServicesRepository } from '@/domain/interfaces/services-repository';

export class CreateServiceUseCase {
  constructor(
    private readonly serviceRepository: BusinessServicesRepository,
    private readonly businessRepository: BusinessRepository,
  ) {}

  /**
   * Creates a new service in the database, verifying user permissions.
   *
   * This method performs the following operations:
   * - Checks if the business exists.
   * - Verifies that the user requesting the creation is either the owner of the business or has an admin role.
   * - Checks if a service with the same name already exists for the business.
   * - Creates the service with the provided data.
   * - Saves the created service entity back to the repository.
   *
   * @param businessId - The unique identifier of the business to associate the service with.
   * @param data - A CreateServiceDto object containing the service data.
   * @param userId - The unique identifier of the user attempting to create the service.
   * @param role - The role of the user, which can affect permission.
   * @returns A promise that resolves with the created service entity.
   * @throws NotFoundException if the business is not found.
   * @throws ForbiddenException if the user does not have the necessary permission.
   * @throws ConflictException if a service with the same name already exists for the business.
   */
  async execute({ businessId, data, userId, role }: CreateNewServiceDto) {
    const result = await this.businessRepository.findBusinessById(businessId);
    if (!result || Object.keys(result).length === 0)
      throw new NotFoundException('Business not found or does not exist');
    const { business } = result;
    if (business.userId !== userId && role !== Role.ADMIN)
      throw new ForbiddenException('Does not have the necessary permission');

    const exist = await this.serviceRepository.filterServiceByNameAndBusiness(
      data.name,
      businessId,
    );
    if (exist)
      throw new ConflictException('A service with this name already exist');

    const newService = new BusinessService({ ...data, businessId: businessId });

    const service = await this.serviceRepository.createService(newService);

    return service;
  }
}
