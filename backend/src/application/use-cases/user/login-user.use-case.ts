import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { LoginDto } from '@app/dto/auth';
import { ValidatePassword } from '@shared/utils';
import { UserRepository } from '@infrastructure/repositories/user.repository';

@Injectable()
export class LoginUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(dto: LoginDto) {
    const user = await this.userRepository.findUserByEmail(dto.email);

    if (!user) {
      throw new NotFoundException('User not found or not exists');
    }

    if (!ValidatePassword(dto.password, user.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return { id: user.id, email: user.email, role: user.user_role };
  }
}
