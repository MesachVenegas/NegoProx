import { Injectable } from '@nestjs/common';

import { TokenVersionRepository } from './token-version.repository';

@Injectable()
export class TokenVersionService {
  constructor(private readonly repo: TokenVersionRepository) {}

  async getTokenVersion(id: string): Promise<number> {
    return await this.repo.getVersion(id);
  }
  async invalidateTokenVersion(id: string): Promise<boolean> {
    return await this.repo.invalidateVersion(id);
  }
}
