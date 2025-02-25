import { UserProfile } from '@/domain/entities/user';
import { UpdateUserDto } from '../dto/update-user';
import { UserRepository } from '@/domain/interfaces/user-repository';

export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * Updates a user by its ID.
   *
   * @param id - The ID of the user to be updated.
   * @param dto - A partial DTO containing the updated user data.
   * @returns A promise that resolves with the updated user entity.
   * @throws Error if the user is not found or not exist.
   */
  async execute(dto: UpdateUserDto, id: string) {
    const user = await this.userRepository.findUserById(id);
    if (!user) throw new Error('User not found or not exist');

    user.update({
      ...dto,
      userProfile: dto.userProfile as UserProfile,
    });

    return await this.userRepository.updateUser(user);
  }
}
