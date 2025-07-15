import { PasswordHasher } from '@/domain/user/services/passwordHasher';
import bcrypt from 'bcryptjs';

export class BcryptHasher implements PasswordHasher {
  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
}
