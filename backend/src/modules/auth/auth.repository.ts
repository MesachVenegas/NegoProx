import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/prisma/prisma.service';
import { Profile } from './interfaces/profile.interface';
import { UserProfileAccDto } from '../user/dto/user-profile-acc.dto';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Authenticates a user via their Google account.
   *
   * This method searches for an existing user account associated with a given Google profile.
   * If an account is found, the associated user is returned. If not, a new user is created
   * using the profile information provided.
   *
   * @param data - The Google profile data containing the user's ID, email, and display name.
   * @returns A promise that resolves with the authenticated or newly created user.
   */
  async authenticateGoogleAccount(data: Profile): Promise<UserProfileAccDto> {
    const email = data.emails[0];
    const existing = await this.prisma.account.findUnique({
      where: {
        provider_providerId: {
          provider: 'google',
          providerId: data.id,
        },
      },
      include: { user: { include: { userProfile: true, accounts: true } } },
    });

    if (existing) return new UserProfileAccDto(existing.user);

    const user = await this.prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        name: data.displayName,
        lastName: '',
        emailVerified: true,
        accounts: {
          create: {
            provider: 'google',
            providerId: data.id,
          },
        },
        userProfile: { create: {} },
      },
      include: { userProfile: true, accounts: true },
    });

    return new UserProfileAccDto(user);
  }
}
