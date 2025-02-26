import { BusinessServicesRepository } from '@/domain/interfaces/services-repository';
import { NotFoundException } from '@nestjs/common';

export class GetServiceByBusinessUseCase {
  constructor(private readonly serviceRepository: BusinessServicesRepository) {}

  /**
   * Retrieves a list of services associated with a specific business ID.
   *
   * This method performs the following operations:
   * - Retrieves a list of services associated with the provided business ID.
   * - Throws a NotFoundException if the services are not found.
   *
   * @param businessId - The unique identifier of the business whose services are to be retrieved.
   * @returns A promise that resolves with an array of BusinessService objects.
   * @throws NotFoundException if the services are not found.
   */
  async execute(businessId: string) {
    const services =
      await this.serviceRepository.getServicesByBusinessId(businessId);

    if (!services || services.length === 0)
      throw new NotFoundException('Not services found');

    return services;
  }
}
