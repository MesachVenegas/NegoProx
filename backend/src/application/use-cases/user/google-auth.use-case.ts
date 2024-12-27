import { BadRequestException, Injectable } from '@nestjs/common';

import {
  UserRepository,
  AccountRepository,
} from '@infrastructure/repositories';
import { Role } from '@domain/enums';
import { UserRegisteredDTO } from '@app/dto/user';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class GoogleAuthUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly accountRepository: AccountRepository,
  ) {}

  async execute(profile: any): Promise<UserRegisteredDTO> {
    const { email, fisrtName, lastName, picture, refreshToken, accessToken } =
      profile;
    try {
      const account = await this.accountRepository.findAccountByProviderId(
        profile.id,
      );
      if (account) {
        return account.user;
      } else {
        const newUser = await this.userRepository.userOAthCreate({
          name: fisrtName,
          last_name: lastName,
          email,
          user_role: Role.USER,
          profile_img: picture,
        });

        this.accountRepository.create({
          provider: 'google',
          provider_id: profile.id,
          user_id: newUser.id,
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        return plainToInstance(UserRegisteredDTO, newUser);
      }
    } catch (error) {
      throw new BadRequestException('Invalid token', error);
    }
  }
}
