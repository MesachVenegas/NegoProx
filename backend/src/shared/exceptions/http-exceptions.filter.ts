import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response, Request } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.getResponse();

    this.logger.error(
      `HTTP Exception: ${JSON.stringify(message)} - ${request.url} - ${request.method} - ${request.ip}`,
    );

    response.status(status).json({
      message,
      cause: exception.cause,
      timestamp: new Date().toISOString(),
    });
  }
}
