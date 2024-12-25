import { MessageStatusType } from '@domain/enums';

export class Message {
  constructor(
    public id: string,
    public content: string,
    public status: MessageStatusType,
    public read_at: Date | null,
    public sender_id: string,
    public receiver_id: string,
    public work_id: string | null,
    public date_id: string | null,
    public conversationId: string | null,
  ) {}
}
