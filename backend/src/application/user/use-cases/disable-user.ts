import { NotFoundException } from '@nestjs/common';
import { UserRepository } from '@/domain/interfaces/user-repository';

export class DisableUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * Disables a user by its ID.
   *
   * @param id - The ID of the user to be disabled.
   * @returns A promise that resolves with the disabled user entity.
   * @throws NotFoundException if the user is not found or not exist.
   */
  async execute(id: string) {
    const user = await this.userRepository.findUserById(id);
    if (!user) throw new NotFoundException('User not found or not exist');

    return await this.userRepository.disableAccount(id);
  }
}
