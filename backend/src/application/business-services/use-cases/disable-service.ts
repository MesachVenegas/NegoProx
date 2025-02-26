import {
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';

import { Role } from '@/domain/constants/role.enum';
import { VerifiesParamsDto } from '../dto/validation-params';
import { BusinessService } from '@/domain/entities/business';
import { BusinessServicesRepository } from '@/domain/interfaces/services-repository';

export class DisableServiceUseCase {
  constructor(private readonly serviceRepository: BusinessServicesRepository) {}

  /**
   * Disables a service by its ID, verifying ownership.
   *
   * This method performs the following operations:
   * - Checks if the service exists and is not already marked as disabled.
   * - Verifies that the user requesting the deletion is either the owner or an admin.
   * - Marks the service as disabled in the repository.
   *
   * @param {VerifiesParamsDto} dto - The VerifiesParamsDto object containing the service ID, user ID, and role.
   * @returns {Promise<BusinessService>} A promise that resolves true if the service is successfully disabled.
   * @throws {NotFoundException} if the service is not found.
   * @throws {ForbiddenException} if the user does not have the necessary permission.
   * @throws {ConflictException} if the service is already disabled.
   */
  async execute({
    userId,
    serviceId,
    role,
  }: VerifiesParamsDto): Promise<BusinessService> {
    const service = await this.serviceRepository.getServiceById(serviceId);
    if (!service) throw new NotFoundException('Service not found');
    if (service.businessId !== userId && role !== Role.ADMIN) {
      throw new ForbiddenException(
        'You do not have permission to delete this service or not are owner.',
      );
    }
    if (service.isDisabled)
      throw new ConflictException('Service already disabled');

    await this.serviceRepository.disableService(serviceId);

    service.update({ isDisabled: true });

    return service;
  }
}
