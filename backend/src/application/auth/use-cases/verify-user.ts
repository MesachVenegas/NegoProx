import { UserRepository } from '@/domain/interfaces/user-repository';
import { ResponseUserDto } from '@/infrastructure/dto/user';
import { plainToInstance } from 'class-transformer';

export class VerifyUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<ResponseUserDto | null> {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      return null;
    }
    return plainToInstance(ResponseUserDto, user);
  }
}
