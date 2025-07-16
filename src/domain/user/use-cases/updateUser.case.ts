import { UpdateUserDTO } from '../dto/updateUser.dto';
import { UserMapper } from '../mappers/users';
import { UserRepository } from '../repositories/UserRepository';
import { PasswordHasher } from '../services/passwordHasher';

export class UpdateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private hasher: PasswordHasher,
  ) {}

  async execute(data: UpdateUserDTO): Promise<void> {
    const userExists = await this.userRepository.findById(data.id);

    if (!userExists) throw new Error('User not found');

    const password_hash = data.password
      ? await this.hasher.hash(data.password)
      : undefined;

    const updatedUser = UserMapper.fromUpdateDTO(
      data,
      userExists,
      password_hash,
    );

    await this.userRepository.update(updatedUser);
  }
}
