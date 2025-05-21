import { Role } from '@/enum/role.enum';

export interface User {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  createdAt: Date;
  role: Role;
}
