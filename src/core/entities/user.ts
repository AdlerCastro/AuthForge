import { Role } from '@/core/enum/role.enum';

export class User {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly role: Role,
    public readonly RG: string,
    public readonly phone: string,
    public readonly address: string,
    public readonly birth_date: Date,
    public readonly created_at: Date,
    public readonly passwordHash?: string,
  ) {}
}
