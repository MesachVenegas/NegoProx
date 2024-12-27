import { Work } from './work.entity';
import { Date } from './date.entity';
import { Review } from './review.entity';
import { RoleType } from '@domain/enums';
import { Message } from './message.entity';
import { Account } from './account.entity';
import { Business } from './business.entity';
import { Conversation } from './conversation.entity';

export class User {
  constructor(
    public id: string,
    public name: string,
    public last_name: string | null,
    public email: string,
    public email_confirmed: boolean,
    public phone: string | null,
    public password: string | null,
    public profile_img: string | null,
    public user_role: RoleType,
    public createdAt: Date,
    public updatedAt: Date,

    public dates?: Date[],
    public works?: Work[],
    public reviews?: Review[],
    public accounts?: Account[],
    public business?: Business[],
    public messagesSent?: Message[],
    public messagesReceived?: Message[],
    public conversations?: Conversation[],
  ) {}

  hasRole(role: RoleType) {
    return this.user_role.includes(role);
  }
}
