import { BusinessRepository } from '@/domain/interfaces/business-repository';
import { PromoteUserParamsDto } from '../dto/promote-user';
import { ConflictException, NotAcceptableException } from '@nestjs/common';
import { Business } from '@/domain/entities';
import { Role } from '@/domain/constants/role.enum';

export class PromoteUserToBusinessUseCase {
  constructor(private readonly businessRepository: BusinessRepository) {}

  /**
   * Promotes a user to a business owner by creating a new business entity and associating it with the user.
   *
   * This method performs the following operations:
   * - Checks if the user exists and is not disabled.
   * - Checks if a business with the same name and user already exists.
   * - Converts the provided DTO into a Business entity.
   * - Promotes the user to a business owner by creating the business and linking it to the user in the repository.
   *
   * @param user - The user to promote to a business owner.
   * @param dto - The data transfer object containing the business registration details.
   * @returns A promise that resolves with the newly created Business entity.
   * @throws ConflictException if the user is not found or disabled.
   * @throws ConflictException if a business with the same name and user already exists.
   * @throws NotAcceptableException if the business cannot be created, try again.
   */
  async execute({ user, dto }: PromoteUserParamsDto) {
    if (!user || user.isDisabled)
      throw new ConflictException('User not found or disabled');

    const exist = await this.businessRepository.checkExistBusiness(
      dto.name,
      user.id,
    );
    if (exist)
      throw new ConflictException('User already has a business with this name');

    const newBusiness = new Business(dto);

    const business = await this.businessRepository.promoteBusinessOwner(
      newBusiness,
      user.id,
      user.userType as Role,
    );

    if (!business)
      throw new NotAcceptableException(
        'Business cannot be not created, try again',
      );

    return business;
  }
}
