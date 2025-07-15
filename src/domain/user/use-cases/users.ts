import { UserRepository } from '../repositories/UserRepository';

export class UsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async getAll() {
    return this.userRepository.findAll();
  }

  async getById(id: string) {
    return this.userRepository.findById(id);
  }
}
