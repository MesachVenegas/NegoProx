import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import chalk from 'chalk';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('RequestLogger');

  use(req: Request, res: Response, next: NextFunction): void {
    const { method, ip, originalUrl } = req;
    const userAgent = req.get('user-agent') || '';
    const startTime = Date.now();

    res.on('finish', () => {
      const { statusCode } = res;
      const resTime = Date.now() - startTime;
      const compressed = res.get('content-encoding') ? true : false;
      const size = res.get('content-length');
      const message = `${ip} - [${method}:${statusCode}] ${originalUrl} - ${size ? `size:${size}kb(s)` : `compresed:${compressed}`} - ${resTime}ms >>> Agent: ${userAgent}`;
      let log: string;

      if (statusCode >= 500) {
        log = chalk.red(message);
      } else if (statusCode >= 400) {
        log = chalk.yellow(message);
      } else if (statusCode >= 300) {
        log = chalk.cyan(message);
      } else {
        log = chalk.green(message);
      }

      this.logger.log(log);
    });

    next();
  }
}
