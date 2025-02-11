import { Status } from '../enums';
import { User } from './user.entity';
import { Work } from './work.entity';
import { Appointment } from './appointment.entity';
import { Conversation } from './conversation.entity';

export class Message {
  constructor(
    public readonly id: string,
    public content: string,
    public timestamp: Date,
    public status: Status,
    public sender: User,
    public senderId: string,
    public receiver: User,
    public receiverId: string,
    public lastMessage: Conversation[],
    public readAt?: Date,
    public work?: Work,
    public workId?: string,
    public appointment?: Appointment,
    public appointmentId?: string,
    public conversation?: Conversation,
    public conversationId?: string,
  ) {}
}
