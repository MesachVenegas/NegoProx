import { Catch, ExceptionFilter, ArgumentsHost, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaKnownExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(PrismaKnownExceptionFilter.name);

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let statusCode = 500;
    let message = 'Something went wrong in the database';

    switch (exception.code) {
      case 'P2002':
        statusCode = 409;
        message = 'Record already exists';
        break;
      case 'P2005':
        statusCode = 400;
        message = 'Invalid field type';
        break;
      case 'P2013':
        statusCode = 400;
        message = 'Missing required field';
        break;
      default:
        statusCode = 500;
        message = 'Internal Server Error';
    }

    response.status(statusCode).json({
      statusCode,
      message,
      cause: exception.meta,
      error: 'Database Error',
    });
  }
}
