import { TokenVersionRepository } from '@/domain/interfaces/token-version-repository';
import { Response } from 'express';

export class LogOutUserUseCase {
  constructor(
    private readonly tokenVersionRepository: TokenVersionRepository,
  ) {}

  async execute(id: string, res: Response) {
    const token = await this.tokenVersionRepository.invalidateVersion(id);

    res.cookie('_ngx_access_token', '', {
      maxAge: 0,
    });

    res.cookie('__ngx_csrf__', '', { maxAge: 0 });

    return token;
  }
}
