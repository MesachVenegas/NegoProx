import { plainToInstance } from 'class-transformer';
import { ConflictException, Injectable } from '@nestjs/common';

import { RegisterDto } from '@app/dto/auth';
import { HashPassword } from '@shared/utils';
import { UserRegisteredDTO } from '@app/dto/user/user.dto';
import { UserRepository } from '@infrastructure/repositories/user.repository';

@Injectable()
export class RegisterUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(dto: RegisterDto): Promise<UserRegisteredDTO> {
    const userExists = await this.userRepository.findUserByEmail(dto.email);

    if (userExists) {
      throw new ConflictException(
        `A account whit this email (${userExists.email}) already exists`,
      );
    }

    dto.password = HashPassword(dto.password);
    const user = await this.userRepository.create(dto);

    return plainToInstance(UserRegisteredDTO, user, {
      excludeExtraneousValues: true,
    });
  }
}
