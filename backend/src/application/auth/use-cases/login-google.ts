import { Profile } from 'passport-google-oauth20';

import { AccountRepository } from '@/domain/interfaces/account-repository';
import { AuthRepository } from '@/domain/interfaces/auth-repository';

export class GoogleLoginUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly accountRepository: AccountRepository,
  ) {}

  async execute(profile: Profile) {
    const { id, provider } = profile;

    const userExisting = await this.accountRepository.findAccount(provider, id);
    if (userExisting) return userExisting;

    const newUser = await this.authRepository.registerGoogleAccount(profile);

    return newUser;
  }
}
