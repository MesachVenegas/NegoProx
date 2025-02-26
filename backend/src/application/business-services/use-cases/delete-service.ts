import { ConflictException, ForbiddenException } from '@nestjs/common';

import { Role } from '@/domain/constants/role.enum';
import { VerifiesParamsDto } from '../dto/validation-params';
import { BusinessServicesRepository } from '@/domain/interfaces/services-repository';

export class DeleteServiceUseCase {
  constructor(
    private readonly serviceRepository: BusinessServicesRepository,
    // private readonly businessRepository: BusinessPrismaRepository,
  ) {}

  /**
   * Deletes a service by its ID, verifying ownership.
   *
   * This method performs the following operations:
   * - Checks if the service exists and is not already marked as deleted.
   * - Verifies that the user requesting the deletion is either the owner or an admin.
   * - Marks the service as deleted in the repository.
   *
   * @param dto - The DeleteParamsDto object containing the service ID, user ID, and role.
   * @returns A promise that resolves with the deletion result.
   * @throws ForbiddenException if the user does not have the necessary permission.
   * @throws ConflictException if the service is active.
   */
  async execute({ userId, serviceId, role }: VerifiesParamsDto) {
    const service = await this.serviceRepository.getServiceById(serviceId);
    if (!service || (service.businessId !== userId && role !== Role.ADMIN)) {
      throw new ForbiddenException(
        'You do not have permission to delete this service or not are owner.',
      );
    }

    if (!service.isDisabled)
      throw new ConflictException('Cannot delete active service.');

    const result = await this.serviceRepository.deleteService(serviceId);

    return result;
  }
}
