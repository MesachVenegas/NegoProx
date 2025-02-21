import { Inject, Injectable } from '@nestjs/common';
import { DoubleCsrfUtilities } from 'csrf-csrf';
import { Request, Response } from 'express';

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
