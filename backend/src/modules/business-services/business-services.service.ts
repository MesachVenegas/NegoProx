import {
  Injectable,
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';

import { plainToInstance } from 'class-transformer';
import { Service } from './business-service.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { BusinessRepository } from '../business/business.repository';
import { BusinessServicesResponseDto } from './dto/services-response.dto';
import { BusinessServicesRepository } from './business-service.repository';

@Injectable()
export class BusinessServicesService {
  constructor(
    private readonly businessRepo: BusinessRepository,
    private readonly serviceRepo: BusinessServicesRepository,
  ) {}

  /**
   * Retrieves a list of all services in the database, excluding disabled services.
   *
   * @returns A promise that resolves with an array of Service objects.
   */
  async getAllServices() {
    const result = await this.serviceRepo.getAllService();

    return plainToInstance(BusinessServicesResponseDto, result);
  }

  /**
   * Retrieves a list of services associated with a specific business ID.
   *
   * @param id - The unique identifier of the business whose services are to be retrieved.
   * @returns A promise that resolves with an array of BusinessServicesResponseDto objects.
   */
  async getServicesByBusinessId(id: string) {
    const result = await this.serviceRepo.getServicesByBusinessId(id);

    return plainToInstance(BusinessServicesResponseDto, result);
  }

  /**
   * Retrieves a service by its ID.
   *
   * @param id - The unique identifier of the service to retrieve.
   * @returns A promise that resolves with a BusinessServicesResponseDto object,
   *          or throws a NotFoundException if the service is not found.
   */
  async getServiceById(id: string) {
    const result = await this.serviceRepo.getServiceById(id);

    return plainToInstance(BusinessServicesResponseDto, result);
  }

  /**
   * Saves a new service to the database and associates it with a business.
   *
   * @param dto - The CreateServiceDto object containing the service data.
   * @param businessId - The unique identifier of the business to associate the service with.
   * @returns A promise that resolves with a BusinessServicesResponseDto object.
   * @throws NotFoundException if the business is not found.
   * @throws ConflictException if a service with the same name already exists for the business.
   */
  async saveService(dto: CreateServiceDto, businessId: string) {
    const business = await this.serviceRepo.getServicesByBusinessId(businessId);
    if (!business) throw new NotFoundException('Business not found');

    const exist = await this.serviceRepo.filterServiceByNameAndBusiness(
      dto.name,
      businessId,
    );
    if (exist) throw new ConflictException('Service already exist');
    const service = plainToInstance(Service, dto);
    service.businessId = businessId;

    const result = await this.serviceRepo.createService(service);

    return plainToInstance(BusinessServicesResponseDto, result);
  }

  /**
   * Updates an existing service associated with a business, verifying ownership.
   *
   * @param ownerId - The ID of the user attempting to update the service.
   * @param id - The unique identifier of the service to be updated.
   * @param dto - A partial DTO containing the updated service data.
   * @returns A promise that resolves with a BusinessServicesResponseDto object.
   * @throws ForbiddenException if the user is not the owner of the business.
   * @throws NotFoundException if the service is not found.
   */
  async updateService(
    ownerId: string,
    id: string,
    dto: Partial<CreateServiceDto>,
  ) {
    const business = await this.businessRepo.findBusinessByOwnerId(ownerId);
    if (!business) {
      throw new ForbiddenException('User is not owner of business');
    }
    const service = await this.serviceRepo.getServiceById(id);
    if (!service) throw new NotFoundException('Service not found');

    service.update(dto);

    const result = await this.serviceRepo.updateService(service);

    if (!result) throw new NotFoundException('Service not found');

    return plainToInstance(BusinessServicesResponseDto, result);
  }

  /**
   * Disables a service by its ID, verifying ownership.
   *
   * @param ownerId - The ID of the user attempting to disable the service.
   * @param servideId - The unique identifier of the service to be disabled.
   * @returns A promise that resolves with a BusinessServicesResponseDto object.
   * @throws ForbiddenException if the user is not the owner of the business.
   * @throws NotFoundException if the service is not found.
   */
  async disableService(ownerId: string, servideId: string) {
    const business = await this.businessRepo.findBusinessByOwnerId(ownerId);
    if (!business) {
      throw new ForbiddenException('User is not owner of business');
    }

    const result = await this.serviceRepo.disableService(servideId);
    if (!result) throw new NotFoundException('Service not found');

    return plainToInstance(BusinessServicesResponseDto, result);
  }

  /**
   * Deletes a service by its ID, verifying ownership.
   *
   * This method permanently removes the service from the database.
   * @param ownerId - The ID of the user attempting to delete the service.
   * @param servideId - The unique identifier of the service to be deleted.
   * @returns A promise that resolves with a BusinessServicesResponseDto object.
   * @throws ForbiddenException if the user is not the owner of the business.
   * @throws ConflictException if the service is active.
   */
  async deleteService(ownerId: string, servideId: string) {
    const business = await this.businessRepo.findBusinessByOwnerId(ownerId);
    if (!business) {
      throw new ForbiddenException('User is not owner of business');
    }

    const service = await this.serviceRepo.getServiceById(servideId);
    if (!service.isDisabled)
      throw new ConflictException('Service is active, cannot delete');

    const result = await this.serviceRepo.deleteService(servideId);

    return plainToInstance(BusinessServicesResponseDto, result);
  }
}
