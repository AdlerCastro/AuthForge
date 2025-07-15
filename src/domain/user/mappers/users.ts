import { User } from '@/core/entities/user';
import { PublicUserDTO } from '../dto/publicUser.dto';
import { randomUUID } from 'crypto';
import { CreateUserDTO } from '../dto/createUser.dto';

export class UserMapper {
  static toDTO(user: User): PublicUserDTO {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      RG: user.RG,
      phone: user.phone,
      address: user.address,
      birth_date: user.birth_date,
      created_at: user.created_at,
    };
  }

  static fromCreateDTO(dto: CreateUserDTO, passwordHash: string): User {
    return new User(
      randomUUID(),
      dto.name,
      dto.email,
      dto.role,
      dto.RG,
      dto.phone,
      dto.address,
      dto.birth_date,
      new Date(),
      passwordHash,
    );
  }
}
