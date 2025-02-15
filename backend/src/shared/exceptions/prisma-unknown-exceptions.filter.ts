import { Catch, ExceptionFilter, ArgumentsHost, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaUnknownExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(PrismaUnknownExceptionFilter.name);

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let statusCode = 500;
    let message = 'Internal Server Error';

    if (exception.message.includes('E57P01')) {
      statusCode = 503;
      message = 'Server is on deep sleep, please try again on 5 seconds';
    }

    response.status(statusCode).json({
      statusCode,
      message,
      cause: exception.meta,
      stack: exception.stack,
      error: 'Internal Server Error',
    });
  }
}
