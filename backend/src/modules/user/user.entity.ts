import { UpdateProfile } from './user.interface';
import { Role, TRole } from '@/shared/constants/role.enum';

export class User {
  public id: string;
  public name: string;
  public lastName: string;
  public email: string;
  public emailVerified: boolean;
  private password?: string;
  public phone?: string | null;
  public userType: TRole;
  public registeredAt: Date;
  constructor(partial: Partial<User>) {
    this.id = partial.id ?? '';
    this.name = partial.name ?? 'No Name';
    this.lastName = partial.lastName ?? 'No Last Name';
    this.email = partial.email ?? '';
    this.emailVerified = partial.emailVerified ?? false;
    this.phone = partial.phone || null;
    this.userType = partial.userType || Role.USER;
    this.registeredAt = partial.registeredAt ?? new Date();
  }

  updateProfile(data: Partial<UpdateProfile>): void {
    if (data.name) this.name = data.name;
    if (data.lastName) this.lastName = data.lastName;
    if (data.email) this.email = data.email;
    if (data.phone) this.phone = data.phone;
  }

  updatePassword(newPassword: string): void {
    if (newPassword.length < 6) {
      throw new Error('password must be at least 6 characters.');
    }
    if (this.password === newPassword) {
      throw new Error('password cannot be the same.');
    }
    this.password = newPassword;
  }

  updateVerified(verified: boolean): void {
    if (this.emailVerified === verified) return;
    this.emailVerified = verified;
  }

  getPasword(): string {
    if (!this.password) throw new Error('password is not set.');
    return this.password;
  }
}
