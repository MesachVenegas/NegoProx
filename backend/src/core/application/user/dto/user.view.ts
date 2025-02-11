import { Role } from '@/core/domain/enums';
import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class RegisteredUserView {
  @Expose() id: string;
  @Expose() name: string;
  @Expose() lastName: string;
  @Expose() email: string;
  @Expose() emailVerified: boolean;
  @Expose() userType: Role;
  @Expose() registerAt: Date;
  @Expose() phone?: string;
}
