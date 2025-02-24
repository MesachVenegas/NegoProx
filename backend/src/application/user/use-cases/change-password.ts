import { NotFoundException } from '@nestjs/common';

import { comparePassword, hashPassword } from '@/shared/utils/hash.util';
import { UserRepository } from '@/domain/interfaces/user-repository';

export class ChangePasswordUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * Changes the password of a user by its ID.
   *
   * @param id - The ID of the user whose password is to be changed.
   * @param password - The new password of the user.
   * @returns A promise that resolves with the user entity with the updated password.
   * @throws NotFoundException if the user is not found or not exist.
   * @throws Error if the new password is the same as the current password.
   */
  async execute(id: string, password: string) {
    const user = await this.userRepository.findUserById(id);
    if (!user) throw new NotFoundException('User not found or not exist');

    const userPassword = user.getPassword();
    const passwordHashed = await hashPassword(password);

    if (!userPassword) {
      return await this.userRepository.updatePassword(
        passwordHashed,
        user.id as string,
      );
    }

    const samePassword = await comparePassword(password, userPassword);
    if (samePassword) throw new Error('Password cannot be the same');

    await this.userRepository.updatePassword(passwordHashed, user.id as string);

    return user;
  }
}
