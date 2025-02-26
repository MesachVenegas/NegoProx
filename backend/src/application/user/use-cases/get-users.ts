import { UserRepository } from '@/domain/interfaces/user-repository';

export class GetAllUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(page: number, limit: number, order: 'asc' | 'desc') {
    const skip = (page - 1) * limit;

    const [totalUsers, users] = await Promise.all([
      this.userRepository.countUsers(),
      this.userRepository.getAllUsers(skip, limit, order),
    ]);

    return { totalUsers, users };
  }
}
