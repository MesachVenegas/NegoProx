import { Catch, ExceptionFilter, ArgumentsHost, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientUnknownRequestError)
export class PrismaUnknownExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(PrismaUnknownExceptionFilter.name);

  catch(
    exception: Prisma.PrismaClientUnknownRequestError,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = 500;

    response.status(statusCode).json({
      statusCode: 500,
      message: 'Internal Server Error, because of Database',
      cause: exception.stack,
    });
  }
}
