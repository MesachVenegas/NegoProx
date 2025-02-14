import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
  constructor(message: string = 'Resource not found') {
    super({ message, error: 'NOT_FOUND' }, HttpStatus.NOT_FOUND);
  }
}
