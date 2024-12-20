import { Message } from './message.entity';

export class Conversation {
  constructor(
    public id: string,
    public user_id: string,
    public business_id: string,
    public lastMessage_id: string | null,
    public createdAt: Date,
    public updatedAt: Date,

    public messages?: Message[],
  ) {}
}
