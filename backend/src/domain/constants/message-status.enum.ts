export enum MessageStatus {
  PENDING = 'PENDING',
  SENT = 'SENT',
  READ = 'READ',
  ARCHIVED = 'ARCHIVED',
}

export type TMessageStatus = keyof typeof MessageStatus;
