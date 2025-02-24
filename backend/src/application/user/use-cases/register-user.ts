import { ConflictException } from '@nestjs/common';

import { User } from '@/domain/entities';
import { hashPassword } from '@/shared/utils/hash.util';
import { IUserRepository } from '@/domain/interfaces/user-repository.interface';
import { RegisterLocalUserDto } from '@/infrastructure/dto/user/register-local-user.dto';

export class CreateLocalUserUseCase {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(dto: RegisterLocalUserDto): Promise<User> {
    const exist = await this.userRepo.findUser({ email: dto.email });
    if (exist)
      throw new ConflictException('User whit this email already exist');

    const passwordHashed = await hashPassword(dto.password);
    const user = new User({ ...dto, password: passwordHashed });

    await this.userRepo.saveLocalUser(user);

    return user;
  }
}
