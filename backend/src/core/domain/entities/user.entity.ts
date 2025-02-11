import { Role } from '../enums';
import { Work } from './work.entity';
import { Review } from './review.entity';
import { Account } from './account.entity';
import { Message } from './message.entity';
import { Payment } from './payment.entity';
import { Business } from './business.entity';
import { Appointment } from './appointment.entity';
import { UserProfile } from './user-profrile.entity';
import { TokenVersion } from './token-version.entity';
import { Conversation } from './conversation.entity';
import { Verification } from './verification.entity';

export class User {
  constructor(
    public readonly id: string,
    public name: string,
    public lastName: string,
    public email: string,
    public emailVerified: boolean,
    public userType: Role,
    public registerAt: Date,
    public phone?: string,
    public userProfile?: UserProfile,
    public tokenVersion?: TokenVersion,
    public accounts?: Account[],
    public businesses?: Business[],
    public sentMessages?: Message[],
    public receivedMessages?: Message[],
    public clientAppointments?: Appointment[],
    public clientWorks?: Work[],
    public payments?: Payment[],
    public reviews?: Review[],
    public conversationAsClient?: Conversation[],
    public conversationAsBusiness?: Conversation[],
    public verification?: Verification[],
  ) {}
}
