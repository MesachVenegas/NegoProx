import { Work } from '../work/work.entity';
import { Review } from '../review/review.entity';
import { Account } from '../account/account.entity';
import { Role } from '@/shared/constants/role.enum';
import { Payment } from '../payment/payment.entity';
import { Business } from '../business/business.entity';
import { Appointment } from '../appointment/appointment.entity';
import { UserProfile } from '../user-profile/user-profile.entity';
import { TokenVersion } from '../token-version/token-version.entity';
import { Verification } from '../verification/verification.entity';

export class User {
  public id: string;
  public name: string;
  public lastName: string;
  public email: string;
  public emailVerified: boolean;
  public password: string;
  public phone: string | null;
  public isDisabled: boolean;
  public isDeleted: boolean;
  public userType: Role;
  public registeredAt: Date;

  public userProfile?: UserProfile;
  public accounts?: Account[];
  public businesses?: Business[];
  public clientAppointments?: Appointment[];
  public clientWorks?: Work[];
  public payments?: Payment[];
  public reviews?: Review[];
  public tokenVersion?: TokenVersion;
  public verification?: Verification[];

  update(partial: Partial<User>) {
    delete partial.id;
    delete partial.registeredAt;

    Object.assign(this, partial);
  }
}
