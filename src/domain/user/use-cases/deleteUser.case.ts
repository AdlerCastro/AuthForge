import { UserRepository } from '../repositories/UserRepository';

export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<void> {
    const userExists = await this.userRepository.findById(id);

    if (!userExists) throw new Error('User not found');

    await this.userRepository.delete(id);
  }
}
