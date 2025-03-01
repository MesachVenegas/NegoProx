import { Injectable } from '@nestjs/common';
import { Profile } from 'passport-google-oauth20';

import { Role } from '@/domain/constants/role.enum';
import { Account, Business, TokenVersion } from '@/domain/entities';
import { User, UserProfile } from '@/domain/entities/user';
import { PrismaService } from '@/infrastructure/orm/prisma.service';
import { AuthRepository } from '@/domain/interfaces/auth-repository';

@Injectable()
export class AuthPrismaRepository implements AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Retrieves a user by their email address if the user is a local user.
   *
   * @param email - The email address of the user to retrieve.
   * @returns A promise that resolves with the User object if found.
   */
  async findLocalUser(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        userProfile: true,
        accounts: true,
        tokenVersion: true,
        businesses: true,
      },
    });

    if (!user) return null;

    return new User({
      ...user,
      userType: user.userType as Role,
      tokenVersion: user.tokenVersion as TokenVersion,
      userProfile: user.userProfile as UserProfile,
      accounts: user.accounts as Account[],
      businesses: user.businesses.map(
        (business) =>
          new Business({
            ...business,
            latitude: business.latitude?.toNumber(),
            longitude: business.longitude?.toNumber(),
          }),
      ),
    });
  }

  async registerGoogleAccount(profile: Profile) {
    const { id, emails, name, photos, provider } = profile;
    const email = emails?.[0].value as string;
    const verified = emails?.[0].verified;

    const user = await this.prisma.user.create({
      data: {
        email: email,
        name: name?.givenName,
        lastName: name?.familyName,
        emailVerified: verified,
        accounts: {
          create: {
            provider,
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

    return new User({
      ...user,
      userType: user.userType as Role,
      userProfile: user.userProfile as UserProfile,
      tokenVersion: user.tokenVersion as TokenVersion,
    });
  }
}
