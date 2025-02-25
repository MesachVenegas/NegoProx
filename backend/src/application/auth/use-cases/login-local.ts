import {
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { comparePassword } from '@/shared/utils/hash.util';
import { AuthRepository } from '@/domain/interfaces/auth-repository';

export class LoginLocalUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(email: string, password: string) {
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
