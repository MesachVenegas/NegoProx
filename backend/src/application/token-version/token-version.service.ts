import { TokenVersionPrismaRepository } from '@/infrastructure/repositories/token-version.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenVersionService {
  constructor(private readonly repo: TokenVersionPrismaRepository) {}

  async getTokenVersion(id: string): Promise<number> {
    return await this.repo.getVersion(id);
  }
  async invalidateTokenVersion(id: string): Promise<boolean> {
    return await this.repo.invalidateVersion(id);
  }
}
