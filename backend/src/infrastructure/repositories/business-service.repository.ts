import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { BusinessService } from '@/domain/entities/business';
import { PrismaService } from '@/infrastructure/orm/prisma.service';

@Injectable()
export class BusinessServicesRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Retrieves a list of all services in the database, excluding disabled services.
   *
   * @returns A promise that resolves with an array of Service objects.
   */
  async getAllService() {
    const result = await this.prisma.service.findMany({
      where: { isDisabled: false },
      orderBy: { name: 'asc' },
    });

    return plainToInstance(BusinessService, result);
  }

  /**
   * Retrieves a list of services associated with a given business ID.
   *
   * @param id - The unique identifier of the business to retrieve services for.
   * @returns A promise that resolves with an array of Service objects associated with the business.
   */
  async getServicesByBusinessId(id: string) {
    const result = await this.prisma.service.findMany({
      where: { businessId: id },
      include: { business: true },
    });

    return plainToInstance(BusinessService, result);
  }

  /**
   * Retrieves a service by its ID.
   *
   * @param id - The unique identifier of the service to retrieve.
   * @returns A promise that resolves with a Service object, or throws a NotFoundException if the service is not found.
   */
  async getServiceById(id: string) {
    const result = await this.prisma.service.findUnique({
      where: { id },
      include: { business: true },
    });

    return plainToInstance(BusinessService, result);
  }

  /**
   * Creates a new service and associates it with a business.
   *
   * @param service - The service entity containing the data for the new service.
   * @returns A promise that resolves with the newly created Service object.
   */
  async createService(service: BusinessService) {
    const result = await this.prisma.service.create({
      data: {
        name: service.name,
        price: service.price,
        description: service.description,
        time: service.time,
        business: { connect: { id: service.businessId } },
      },
      include: { business: true },
    });

    return plainToInstance(BusinessService, result);
  }

  /**
   * Updates an existing service entity with new data.
   *
   * @param service - The service entity containing updated data.
   * @returns A promise that resolves with the updated Service object.
   */
  async updateService(service: BusinessService) {
    const result = await this.prisma.service.update({
      where: { id: service.id as string },
      data: {
        name: service.name,
        price: service.price,
        description: service.description,
        time: service.time,
      },
    });

    return plainToInstance(BusinessService, result);
  }

  /**
   * Disables a service, effectively removing it from the service list.
   *
   * @param id - The unique identifier of the service to disable.
   * @returns A promise that resolves with the updated Service object.
   */
  async disableService(id: string) {
    const result = await this.prisma.service.update({
      where: { id },
      data: { isDisabled: true },
    });

    return plainToInstance(BusinessService, result);
  }

  /**
   * Deletes a service by its ID.
   *
   * This method permanently removes the service from the database.
   * @param id - The unique identifier of the service to delete.
   * @returns A promise that resolves with the deleted Service object.
   */
  async deleteService(id: string) {
    const result = await this.prisma.service.delete({
      where: { id },
    });

    return plainToInstance(BusinessService, result);
  }

  /**
   * Filters a service by its name and business ID.
   *
   * @param name - The name of the service to filter.
   * @param businessId - The unique identifier of the business whose services are to be filtered.
   * @returns A promise that resolves with the filtered Service object, or null if no service is found.
   */
  async filterServiceByNameAndBusiness(name: string, businessId: string) {
    const result = await this.prisma.service.findUnique({
      where: {
        name_businessId: { name, businessId },
      },
    });

    return plainToInstance(BusinessService, result);
  }
}
