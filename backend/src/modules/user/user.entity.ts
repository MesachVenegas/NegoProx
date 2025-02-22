import { Exclude, Type } from 'class-transformer';
import { Account } from '../account/account.entity';
import { Role } from '@/shared/constants/role.enum';
import { UserProfile } from '../user-profile/user-profile.entity';
import { Business } from '../business/business.entity';
import { Appointment } from '../appointment/appointment.entity';
import { Work } from '../work/work.entity';
import { Payment } from '../payment/payment.entity';
import { Review } from '../review/review.entity';
import { TokenVersion } from '../token-version/token-version.entity';
import { Verification } from '../verification/verification.entity';

export class User {
  id: string;
  name: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
  @Exclude()
  password: string;
  phone: string | null;
  isDisabled: boolean;
  userType: Role;
  registeredAt: Date;

  @Type(() => UserProfile)
  userProfile?: UserProfile;

  @Type(() => Account)
  accounts?: Account[];

  @Type(() => Business)
  businesses?: Business[];

  sentMessages?: any[];
  receivedMessages?: any[];

  @Type(() => Appointment)
  clientAppointments?: Appointment[];

  @Type(() => Work)
  clientWorks?: Work[];

  @Type(() => Payment)
  payments?: Payment[];

  @Type(() => Review)
  reviews?: Review[];

  @Type(() => TokenVersion)
  tokenVersion?: TokenVersion;

  @Type(() => Verification)
  verification?: Verification[];

  conversationAsClient?: any[];
  conversationAsBusiness?: any[];

  update(partial: Partial<User>) {
    delete partial.id;
    delete partial.registeredAt;

    Object.assign(this, partial);
  }
}
