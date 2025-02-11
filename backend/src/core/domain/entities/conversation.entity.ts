import { User } from './user.entity';
import { Message } from './message.entity';

export class Conversation {
  constructor(
    public readonly id: string,
    public client: User,
    public clientId: string,
    public businessUser: User,
    public businessUserId: string,
    public messages: Message[],
    public lastMessage: Message,
    public lastMessageId: string,
  ) {}
}
