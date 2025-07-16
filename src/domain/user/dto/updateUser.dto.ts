import { Role } from '@/core/enum/role.enum';

export interface UpdateUserDTO {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  role?: Role;
  RG?: string;
  phone?: string;
  address?: string;
  birth_date?: Date;
}
