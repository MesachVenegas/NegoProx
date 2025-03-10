import { Work } from '../work';
import { Review } from '../review';
import { Payment } from '../payment';
import { Account } from '../account';
import { Business } from '../business/business';
import { Role } from '../../constants/role.enum';
import { Appointment } from '../appointment';
import { UserProfile } from './user-profile';
import { Verification } from '../verification';
import { TokenVersion } from '../token-version';

export class User {
  public id: string | undefined;
  public name: string;
  public lastName: string;
  public email: string;
  public emailVerified: boolean;
  private password: string | null;
  public phone: string | null;
  public isDisabled: boolean;
  public isDeleted: boolean;
  public userType: Role;
  public registerAt: Date;

  public userProfile?: UserProfile;
  public accounts?: Account[];
  public businesses?: Business[];
  public clientAppointments?: Appointment[];
  public clientWorks?: Work[];
  public payments?: Payment[];
  public reviews?: Review[];
  public tokenVersion?: TokenVersion;
  public verification?: Verification[];

  constructor(params: {
    id?: string;
    name?: string | null;
    lastName?: string | null;
    email: string;
    emailVerified?: boolean;
    password: string | null;
    phone?: string | null;
    isDisabled?: boolean;
    isDeleted?: boolean;
    userType?: Role;
    registerAt?: Date;

    userProfile?: UserProfile;
    accounts?: Account[];
    businesses?: Business[];
    clientAppointments?: Appointment[];
    clientWorks?: Work[];
    payments?: Payment[];
    reviews?: Review[];
    tokenVersion?: TokenVersion;
    verification?: Verification[];
  }) {
    this.id = params.id;
    this.name = params.name ?? '';
    this.lastName = params.lastName ?? '';
    this.email = params.email;
    this.emailVerified = params.emailVerified ?? false;
    this.password = params.password;
    this.phone = params.phone ?? null;
    this.userType = params.userType ?? Role.USER;
    this.isDisabled = params.isDisabled ?? false;
    this.isDeleted = params.isDeleted ?? false;
    this.registerAt = params.registerAt ?? new Date();

    this.userProfile = params.userProfile;
    this.accounts = params.accounts;
    this.businesses = params.businesses;
    this.clientAppointments = params.clientAppointments;
    this.clientWorks = params.clientWorks;
    this.payments = params.payments;
    this.reviews = params.reviews;
    this.tokenVersion = params.tokenVersion;
    this.verification = params.verification;
  }

  getPassword() {
    return this.password;
  }

  update(partial: Partial<Omit<User, 'id' | 'registeredAt'>>) {
    Object.assign(this, partial);
  }

  updatePassword(password: string) {
    if (!password) throw new Error('Password is required');
    this.password = password;
  }
}
