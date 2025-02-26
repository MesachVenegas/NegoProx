import { BusinessServicesRepository } from '@/domain/interfaces/services-repository';

export class GetAllServicesUseCase {
  constructor(private readonly serviceRepository: BusinessServicesRepository) {}

  /**
   * Retrieves a list of all services.
   *
   * This method performs the following operations:
   * - Fetches all available services from the repository.
   * - Throws an error if no services are found.
   *
   * @returns A promise that resolves with an array of all service objects.
   * @throws Error if no services are found.
   */
  async execute() {
    const service = await this.serviceRepository.getAllServices();
    if (!service) throw new Error('Services not found');

    return service;
  }
}
