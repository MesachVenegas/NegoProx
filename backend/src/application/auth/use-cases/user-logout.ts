import { TokenVersionRepository } from '@/domain/interfaces/token-version-repository';

export class LogOutUserUseCase {
  constructor(
    private readonly tokenVersionRepository: TokenVersionRepository,
  ) {}

  async execute(id: string) {
    const token = await this.tokenVersionRepository.invalidateVersion(id);

    return token;
  }
}
