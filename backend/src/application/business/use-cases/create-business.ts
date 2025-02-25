import { NotAcceptableException } from '@nestjs/common';

import { Business } from '@/domain/entities';
import { User } from '@/domain/entities/user';
import { hashPassword } from '@/shared/utils/hash.util';
import { RegisterLocalBusinessDto } from '@/infrastructure/dto/business';
import { BusinessRepository } from '@/domain/interfaces/business-repository';

export class CreateBusinessUseCase {
  constructor(private readonly businessRepository: BusinessRepository) {}

  /**
   * Executes the process of creating a new business and associating it with a user.
   *
   * This method performs the following operations:
   * - Creates a new User instance from the provided user data and hashes the user's password.
   * - Creates a new Business instance from the provided business data.
   * - Associates the new user with the business.
   * - Saves the new business entity to the repository.
   *
   * @param user - The user data for the new business owner.
   * @param business - The business data for the new entity to be created.
   * @returns A promise that resolves with the newly created business entity.
   * @throws NotAcceptableException if the business cannot be created.
   */
  async execute({ user, ...business }: RegisterLocalBusinessDto) {
    const newUser = new User(user);
    newUser.updatePassword(await hashPassword(user.password));

    const newBusiness = new Business(business);

    newBusiness.update({
      user: newUser,
    });

    const result = await this.businessRepository.saveLocalBusiness(newBusiness);
    if (!result) throw new NotAcceptableException('Business cannot be created');

    return result;
  }
}
