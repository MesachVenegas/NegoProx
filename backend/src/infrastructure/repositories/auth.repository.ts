import { Injectable } from '@nestjs/common';
import { Profile } from 'passport-google-oauth20';
import { plainToInstance } from 'class-transformer';

import { User } from '@/domain/entities';
import { PrismaService } from '@/infrastructure/orm/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Retrieves a user's profile and token version by their email address.
   *
   * @param email - The email address of the user to retrieve.
   * @returns The user's profile, including their token version, or null if the user does not exist.
   */
  async findLocalUser(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { userProfile: true, accounts: true, tokenVersion: true },
    });
    return user;
  }

  /**
   * Authenticates a user using their Google account profile.
   *
   * This method checks if a Google account with the given profile ID exists
   * in the database. If an account exists, it returns the associated user.
   * If no account is found, it creates a new user with the provided email,
   * display name, and associates it with a new Google account and user profile.
   * The newly created or existing user is returned with their profile and accounts.
   *
   * @param profile - The profile information from Google.
   * @returns The authenticated user object, either existing or newly created.
   */

  async authenticateGoogleAccount(profile: Profile) {
    const { id, emails, name, photos } = profile;
    const email = emails?.[0].value;
    const verified = emails?.[0].verified;
    const existing = await this.prisma.account.findUnique({
      where: {
        provider_providerId: {
          provider: 'google',
          providerId: id,
        },
      },
      include: {
        user: {
          include: { tokenVersion: true, userProfile: true, accounts: true },
        },
      },
    });

    if (existing) return plainToInstance(User, existing.user);
    const user = await this.prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email: email as string,
        name: name?.givenName,
        lastName: name?.familyName,
        emailVerified: verified,
        accounts: {
          create: {
            provider: 'google',
            providerId: id,
          },
        },
        userProfile: {
          create: {
            profilePicture: photos?.[0].value,
          },
        },
        tokenVersion: { create: {} },
      },
      include: { tokenVersion: true, userProfile: true },
    });

    return plainToInstance(User, user);
  }
}
