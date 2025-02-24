import { UserRepository } from '@/domain/interfaces/user-repository';
import { UpdateUserDto } from '../dto/update-user';
import { User } from '@/domain/entities';
import { plainToInstance } from 'class-transformer';

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
    const result = await this.userRepository.findUserById(id);
    if (!result) throw new Error('User not found or not exist');

    const user = plainToInstance(User, result);

    user.update(dto);

    return await this.userRepository.updateUser(user);
  }
}
