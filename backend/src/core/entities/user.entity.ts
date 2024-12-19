import { Role } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

export class User {
  @Expose() id: string;
  @Expose() name: string;
  @Expose() last_name: string | null;
  @Expose() email: string;
  @Expose() email_confirmed: boolean;
  @Expose() phone: string | null;
  @Expose() user_role: Role;
  @Expose() createdAt: Date;
  @Expose() updatedAt: Date;

  @Exclude() password: string | null;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
