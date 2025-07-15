import { User } from '@/core/entities/user';

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  create(user: User): Promise<void>;
}
