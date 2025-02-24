import { ConflictException } from '@nestjs/common';

import { User } from '@/domain/entities';
import { hashPassword } from '@/shared/utils/hash.util';
import { UserRepository } from '@/domain/interfaces/user-repository';
import { RegisterLocalUserDto } from '@/infrastructure/dto/user/register-local-user.dto';

export class CreateLocalUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(dto: RegisterLocalUserDto): Promise<User> {
    const exist = await this.userRepository.findUserByEmail(dto.email);
    if (exist)
      throw new ConflictException('User whit this email already exist');

    const passwordHashed = await hashPassword(dto.password);
    const user = new User({ ...dto, password: passwordHashed });

    await this.userRepository.saveLocalUser(user);

    return user;
  }
}
