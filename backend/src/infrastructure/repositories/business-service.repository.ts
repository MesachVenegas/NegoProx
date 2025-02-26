import { Injectable } from '@nestjs/common';

import { Business, BusinessService } from '@/domain/entities/business';
import { PrismaService } from '@/infrastructure/orm/prisma.service';
import { BusinessServicesRepository } from '@/domain/interfaces/services-repository';

@Injectable()
export class BusinessServicesPrismaRepository
  implements BusinessServicesRepository
{
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Retrieves all services from the database, sorted by name in ascending order.
   *
   * @returns A promise that resolves with an array of BusinessService objects, or null if no services are found.
   */
  async getAllServices() {
    const result = await this.prisma.service.findMany({
      where: { isDisabled: false },
      orderBy: { name: 'asc' },
    });

    if (result.length === 0) return null;

    const service = result.map(
      (service) =>
        new BusinessService({
          ...service,
          price: service.price.toNumber(),
        }),
    );

    return service;
  }

  /**
   * Retrieves all services of the given business from the database.
   *
   * @param id - The unique identifier of the business to retrieve its services.
   * @returns A promise that resolves with an array of BusinessService objects, or null if no services are found.
   */
  async getServicesByBusinessId(id: string) {
    const result = await this.prisma.service.findMany({
      where: { businessId: id },
      include: { business: true },
    });

    if (!result || result.length === 0) return null;

    const service = result.map(
      (service) =>
        new BusinessService({
          ...service,
          price: service.price.toNumber(),
          business: new Business({
            ...service.business,
            latitude: service.business.latitude?.toNumber(),
            longitude: service.business.longitude?.toNumber(),
          }),
        }),
    );

    return service;
  }

  /**
   * Retrieves a service by its ID from the database.
   *
   * @param id - The unique identifier of the service to retrieve.
   * @returns A promise that resolves with a BusinessService object, or null if no service is found.
   */
  async getServiceById(id: string) {
    const result = await this.prisma.service.findUnique({
      where: { id },
      include: { business: true },
    });

    if (!result) return null;

    const service = new BusinessService({
      ...result,
      price: result.price.toNumber(),
      business: new Business({
        ...result.business,
        latitude: result.business.latitude?.toNumber(),
        longitude: result.business.longitude?.toNumber(),
      }),
    });

    return service;
  }

  /**
   * Creates a new service and associates it with a business.
   *
   * @param service - The BusinessService object to create.
   * @returns A promise that resolves with the created BusinessService object, or null if no service is created.
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

    if (!result) return null;

    const newService = new BusinessService({
      ...result,
      price: result.price.toNumber(),
      business: new Business({
        ...result.business,
        latitude: result.business.latitude?.toNumber(),
        longitude: result.business.longitude?.toNumber(),
      }),
    });

    return newService;
  }

  /**
   * Updates a service in the database with the provided data.
   *
   * @param service - The BusinessService object with the updated data.
   * @returns A promise that resolves with the updated BusinessService object, or null if no service is updated.
   */
  async updateService(service: BusinessService) {
    const result = await this.prisma.service.update({
      where: { id: service.id as string },
      data: {
        name: service.name,
        price: service.price,
        description: service.description,
        time: service.time,
        isDisabled: service.isDisabled,
      },
    });

    const updatedService = new BusinessService({
      ...result,
      price: result.price.toNumber(),
    });

    return updatedService;
  }

  /**
   * Disables a service in the database, effectively marking it as inactive.
   *
   * @param id - The unique identifier of the service to disable.
   * @returns A promise that resolves with true if the service is disabled, otherwise false.
   */
  async disableService(id: string): Promise<BusinessService | false> {
    const result = await this.prisma.service.update({
      where: { id },
      data: { isDisabled: true },
    });

    if (!result) return false;

    return new BusinessService({ ...result, price: result.price.toNumber() });
  }

  /**
   * Deletes a service from the database.
   *
   * @param id - The unique identifier of the service to delete.
   * @returns A promise that resolves with true if the service is deleted, otherwise false.
   */
  async deleteService(id: string) {
    const result = await this.prisma.service.delete({
      where: { id },
    });

    if (!result) return false;

    return true;
  }

  /**
   * Retrieves a service by its name and business ID from the database.
   *
   * @param name - The name of the service to retrieve.
   * @param businessId - The unique identifier of the business associated with the service.
   * @returns A promise that resolves with a BusinessService object, or null if no service is found.
   */
  async filterServiceByNameAndBusiness(name: string, businessId: string) {
    const result = await this.prisma.service.findUnique({
      where: {
        name_businessId: { name, businessId },
      },
    });

    if (!result) return null;

    const service = new BusinessService({
      ...result,
      price: result.price.toNumber(),
    });

    return service;
  }
}
