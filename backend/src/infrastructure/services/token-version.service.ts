import { TokenVersionPrismaRepository } from '@/infrastructure/repositories/token-version.repository';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class TokenVersionService {
  constructor(private readonly repo: TokenVersionPrismaRepository) {}

  async getTokenVersion(id: string): Promise<number> {
    const version = await this.repo.getVersion(id);
    if (!version) throw new NotFoundException('Token not found');

    return version;
  }
  async invalidateTokenVersion(id: string): Promise<boolean> {
    return await this.repo.invalidateVersion(id);
  }
}
