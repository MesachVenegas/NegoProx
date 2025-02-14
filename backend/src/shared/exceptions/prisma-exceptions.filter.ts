import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let statusCode = 500;
    let message = 'Something went wrong in the database';

    if (exception.code === 'P2002') {
      statusCode = 409;
      message = 'Resource already exists';
    }

    response.status(statusCode).json({
      statusCode,
      message,
      error: 'Database Error',
    });
  }
}
