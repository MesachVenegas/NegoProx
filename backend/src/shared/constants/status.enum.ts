export enum Status {
  Progress = 'Progress',
  Pending = 'Pending',
  Confirm = 'Confirm',
  Cancelled = 'Cancelled',
  Completed = 'Completed',
}

export type TStatus = keyof typeof Status;
