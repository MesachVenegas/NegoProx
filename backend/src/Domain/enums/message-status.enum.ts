export enum MessageStatus {
  SENT = 'SENT',
  READ = 'READ',
  PENDING = 'PENDING',
  ARCHIVED = 'ARCHIVED',
}

export type MessageStatusType = keyof typeof MessageStatus;
