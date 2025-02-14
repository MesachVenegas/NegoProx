import { Account } from '../account/account.entity';
import { UserProfile } from '../user-profile/user-profile.entity';
import { UpdateProfile } from './interfaces/common.interface';
import { Role, TRole } from '@/shared/constants/role.enum';

export class User {
  public id: string;
  public name: string;
  public lastName: string;
  public email: string;
  public emailVerified: boolean;
  private password: string;
  public phone: string | null;
  public userType: TRole;
  public registeredAt: Date;
  public userProfile?: UserProfile | null;
  public accounts?: Account[] | null;
  constructor(partial: Partial<User>, password?: string) {
    this.id = partial.id ?? '';
    this.name = partial.name ?? 'No Name';
    this.lastName = partial.lastName ?? 'No Last Name';
    this.email = partial.email ?? '';
    this.emailVerified = partial.emailVerified ?? false;
    this.phone = partial.phone || null;
    this.userType = partial.userType || Role.USER;
    this.registeredAt = partial.registeredAt ?? new Date();
    this.userProfile = partial.userProfile ?? null;
    this.accounts = partial.accounts ?? null;
    if (password) this.updatePassword(password);
  }

  /**
   * Updates the user's profile with the given data.
   * If the value of any key is not provided, it will be left unchanged.
   * @param data - The data to update the user's profile with.
   */
  updateProfile(data: Partial<UpdateProfile>): void {
    if (data.name) this.name = data.name;
    if (data.lastName) this.lastName = data.lastName;
    if (data.email) this.email = data.email;
    if (data.phone) this.phone = data.phone;
  }

  /**
   * Updates the user's password with the given new password.
   * If the new password is less than 6 characters, or if the new password is the same as the current password, an error will be thrown.
   * @param newPassword - The new password to set.
   */
  updatePassword(newPassword: string): void {
    if (newPassword.length < 6) {
      throw new Error('password must be at least 6 characters.');
    }
    if (this.password === newPassword) {
      throw new Error('password cannot be the same.');
    }
    this.password = newPassword;
  }

  /**
   * Updates the user's email verification status.
   * If the email is already verified/unverified, this method will do nothing.
   * @param verified - Whether the email should be verified or not.
   */
  updateVerified(verified: boolean): void {
    if (this.emailVerified === verified) return;
    this.emailVerified = verified;
  }

  /**
   * Retrieves the user's password.
   * @throws {Error} If the password is not set.
   * @returns The user's password.
   */
  getPasword(): string {
    if (!this.password) throw new Error('password is not set.');
    return this.password;
  }
}
