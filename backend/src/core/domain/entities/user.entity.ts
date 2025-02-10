import { Role } from '../enums';
import {
  InvalidEmailException,
  InvalidPhoneException,
} from '@/core/application/errors/user.exception';

export class User {
  private _id: string;
  private _name: string;
  private _lastName: string | null;
  private _email: string;
  private _phone: string | null;
  private _role: Role;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(
    id: string,
    name: string,
    email: string,
    role: Role = Role.USER,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
    lastName?: string,
    phone?: string,
  ) {
    this.validateEmail(email);
    if (phone) this.validatePhone(phone);

    this._id = id;
    this._name = name;
    this._email = email;
    this._role = role;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
    this._lastName = lastName || null;
    this._phone = phone || null;
  }

  private validateEmail(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new InvalidEmailException(email);
    }
  }

  private validatePhone(phone: string): void {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneRegex.test(phone)) {
      throw new InvalidPhoneException(phone);
    }
  }

  public updateProfile(data: {
    name?: string;
    lastName?: string;
    phone?: string;
  }): void {
    if (data.name) this._name = data.name;
    if (data.lastName) this._lastName = data.lastName;

    if (data.phone) {
      this.validatePhone(data.phone);
      this._phone = data.phone;
    }

    this._updatedAt = new Date();
  }

  public promoteToBusinessOwner(): void {
    if (this._role === Role.BUSINESS) return;

    this._role = Role.BUSINESS;
    this._updatedAt = new Date();
  }

  get id(): string {
    return this._id;
  }

  get email(): string {
    return this._email;
  }

  get isBusinessOwner(): boolean {
    return this._role === Role.BUSINESS;
  }

  public toJSON() {
    return {
      id: this._id,
      name: this._name,
      lastName: this._lastName,
      email: this._email,
      phone: this._phone,
      createdAt: this._createdAt.toISOString(),
      updatedAt: this._updatedAt.toISOString(),
    };
  }
}
