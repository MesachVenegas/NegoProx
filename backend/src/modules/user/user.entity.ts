import { Exclude } from 'class-transformer';
import { Account } from '../account/account.entity';
import { UserProfile } from '../user-profile/user-profile.entity';
import { Role } from '@/shared/constants/role.enum';

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
  userProfile?: UserProfile | null;
  accounts?: Account[] | null;
}
