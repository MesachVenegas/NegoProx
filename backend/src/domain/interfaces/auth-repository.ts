import { Profile } from 'passport-google-oauth20';

import { User } from '../entities/user';

export interface AuthRepository {
  registerGoogleAccount(profile: Profile): Promise<User>;
  findLocalUser(email: string): Promise<User | null>;
}
