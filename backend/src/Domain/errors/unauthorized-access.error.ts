export class UnauthorizedAccessException extends Error {
  constructor(
    message: string = 'User does not have the required permissions.',
  ) {
    super(message);
    this.name = 'UnauthorizedAccessException';
  }
}
