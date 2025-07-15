import { CreateUserDTO } from '../dto/createUser.dto';
import { UserRepository } from '../repositories/UserRepository';
import { PasswordHasher } from '../services/passwordHasher';
import { UserMapper } from '../mappers/users';

export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private hasher: PasswordHasher,
  ) {}

  async execute(data: CreateUserDTO): Promise<void> {
    const password_hash = await this.hasher.hash(data.password);

    const user = UserMapper.fromCreateDTO(data, password_hash);

    await this.userRepository.create(user);
  }
}
