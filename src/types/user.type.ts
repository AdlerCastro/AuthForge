import { Role } from '@/enum/role.enum';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}
