import { Request, Response } from 'express';
import { DoubleCsrfUtilities } from 'csrf-csrf';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class SecurityService {
  constructor(
    @Inject('CSRF_UTILITIES') private readonly csrfUtils: DoubleCsrfUtilities,
  ) {}

  generateCsrfToken(req: Request, res: Response) {
    const token = this.csrfUtils.generateToken(req, res);
    return token;
  }
}
