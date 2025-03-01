import {
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { comparePassword } from '@/shared/utils/hash.util';
import { AuthRepository } from '@/domain/interfaces/auth-repository';
import { LoginDto } from '@/infrastructure/dto/auth/login.dto';

export class LoginLocalUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  /**
   * Executes the process of local login.
   *
   * This method performs the following operations:
   * - Checks if the user exists and is not disabled.
   * - Checks if the user signed with a local provider.
   * - Checks if the password is correct.
   * - Checks if the user account is not disabled or deleted.
   *
   * @param email - The email of the user to be logged in.
   * @param password - The password of the user to be logged in.
   * @returns A promise that resolves with the user entity.
   * @throws NotFoundException if the user is not found.
   * @throws NotFoundException if the user signed with external provider.
   * @throws ConflictException if the user account has no password.
   * @throws UnauthorizedException if the password is incorrect.
   * @throws UnauthorizedException if the user account is disabled or deleted.
   */
  async execute(email: LoginDto['email'], password: LoginDto['password']) {
    const user = await this.authRepository.findLocalUser(email);
    if (!user) throw new NotFoundException('User account not found');
    if (user.accounts?.[0].provider !== 'local')
      throw new NotFoundException('User signed with external provider');
    const userPassword = user.getPassword();
    if (!userPassword)
      throw new ConflictException('User account has no password');

    const match = await comparePassword(password, userPassword);
    if (!match) throw new UnauthorizedException('Invalid credentials');

    if (user.isDisabled || user.isDeleted)
      throw new UnauthorizedException('User account disabled or deleted');

    return user;
  }
}
