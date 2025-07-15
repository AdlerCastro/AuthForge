import { Role } from '@/core/enum/role.enum';

export interface PublicUserDTO {
  id: string;
  name: string;
  email: string;
  role: Role;
  RG: string;
  phone: string;
  address: string;
  birth_date: Date;
  created_at: Date;
}
