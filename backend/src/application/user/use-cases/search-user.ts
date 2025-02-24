import { UserRepository } from '@/domain/interfaces/user-repository';

export class SearchUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * Searches a user by any of its id, email, or phone.
   *
   * @param id - The ID of the user to be searched.
   * @param email - The email of the user to be searched.
   * @param phone - The phone of the user to be searched.
   * @returns A promise that resolves with the user entity if found, or `null` if not.
   */
  async execute(id?: string, email?: string, phone?: string) {
    const user = await this.userRepository.searchUserByQuery(id, email, phone);

    return user;
  }
}
