import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import chalk from 'chalk';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('Request');

  use(req: Request, res: Response, next: NextFunction): void {
    const { method, originalUrl, ip } = req;
    const userAgent = req.get('user-agent') || '';
    const startTime = Date.now();

    res.on('finish', () => {
      const { statusCode } = res;
      const resTime = Date.now() - startTime;
      const message = `${ip} - ${method} ${originalUrl} [${statusCode}] - ${userAgent} ${res.get('content-length')}kb ${resTime}ms`;

      if (statusCode >= 500) {
        this.logger.error(chalk.red(message));
      } else if (statusCode >= 400) {
        this.logger.warn(chalk.yellow(message));
      } else if (statusCode >= 300) {
        this.logger.verbose(chalk.cyan(message));
      } else {
        this.logger.log(chalk.blueBright(message));
      }
    });

    next();
  }
}
