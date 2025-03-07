import { ForbiddenException, NotFoundException } from '@nestjs/common';

import { Role } from '@/domain/constants/role.enum';
import { UpdateServiceDto } from '../dto/update-service';
import { BusinessServicesRepository } from '@/domain/interfaces/services-repository';

export class UpdateServiceUseCase {
  constructor(private readonly serviceRepository: BusinessServicesRepository) {}

  /**
   * Updates a service entity with new data after verifying user permissions.
   *
   * This method performs the following operations:
   * - Retrieves the service using the provided service ID.
   * - Checks if the service exists.
   * - Verifies that the user requesting the update is either the owner of the service or has an admin role.
   * - Updates the service with the provided data.
   * - Saves the updated service entity back to the repository.
   *
   * @param userId - The ID of the user attempting to update the service.
   * @param role - The role of the user, which can affect permission.
   * @param serviceId - The ID of the service to be updated.
   * @param dto - A partial DTO containing the updated service data.
   * @returns A promise that resolves with the updated service entity.
   * @throws Error if the service is not found.
   * @throws Error if the user does not have the necessary permission.
   */
  async execute({ userId, role, serviceId, dto }: UpdateServiceDto) {
    const service = await this.serviceRepository.getServiceById(serviceId);
    if (!service) throw new NotFoundException('Service not found');
    if (service.businessId !== userId && role !== Role.ADMIN) {
      throw new ForbiddenException(
        'You do not have permission to update this service or not are owner.',
      );
    }

    service.update({
      ...dto,
      isDisabled: false,
    });

    const result = await this.serviceRepository.updateService(service);

    return result;
  }
}
