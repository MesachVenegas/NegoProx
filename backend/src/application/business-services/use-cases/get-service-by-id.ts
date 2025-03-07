import { NotFoundException } from '@nestjs/common';
import { BusinessServicesRepository } from '@/domain/interfaces/services-repository';

export class GetServiceByIdUseCase {
  constructor(private readonly serviceRepository: BusinessServicesRepository) {}

  /**
   * Retrieves a service by its ID.
   *
   * This method performs the following operations:
   * - Attempts to find a service using the provided ID.
   * - Throws a NotFoundException if the service is not found or the result is empty.
   *
   * @param id - The unique identifier of the service to retrieve.
   * @returns A promise that resolves with the service details.
   * @throws NotFoundException if the service cannot be found or does not exist.
   */
  async execute(id: string) {
    const result = await this.serviceRepository.getServiceById(id);
    if (!result || Object.keys(result).length === 0)
      throw new NotFoundException("Service not found or doesn't exist");

    return result;
  }
}
