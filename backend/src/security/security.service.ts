import { Inject, Injectable } from '@nestjs/common';
import { DoubleCsrfUtilities } from 'csrf-csrf';
import { Request, Response } from 'express';

@Injectable()
export class SecurityService {
  constructor(
    @Inject('CSRF_UTILITIES') private readonly csrfUtils: DoubleCsrfUtilities,
  ) {}

  generateToken(req: Request, res: Response) {
    return this.csrfUtils.generateToken(req, res);
  }

  get middleware() {
    return this.csrfUtils.doubleCsrfProtection;
  }
}
