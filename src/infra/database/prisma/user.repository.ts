import { User } from '@/core/entities/user';
import { UserRepository } from '@/domain/user/repositories/UserRepository';
import { prisma } from '@/lib/prisma';
import { Role } from '@/core/enum/role.enum';

export class PrismaUserRepository implements UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const data = await prisma.user.findUnique({
      where: { email },
    });

    if (!data) return null;

    return new User(
      data.id,
      data.name,
      data.email,
      data.role as Role,
      data.RG,
      data.phone,
      data.address,
      data.birth_date,
      data.created_at,
      data.password_hash,
    );
  }

  async findAll(): Promise<User[]> {
    const users = await prisma.user.findMany();

    return users.map(
      (user) =>
        new User(
          user.id,
          user.name,
          user.email,
          user.role as Role,
          user.RG,
          user.phone,
          user.address,
          user.birth_date,
          user.created_at,
        ),
    );
  }

  async findById(id: string): Promise<User | null> {
    const data = await prisma.user.findUnique({
      where: { id },
    });

    if (!data) return null;

    return new User(
      data.id,
      data.name,
      data.email,
      data.role as Role,
      data.RG,
      data.phone,
      data.address,
      data.birth_date,
      data.created_at,
    );
  }

  async create(user: User): Promise<void> {
    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        role: user.role,
        RG: user.RG,
        phone: user.phone,
        address: user.address,
        birth_date: user.birth_date,
        password_hash: user.passwordHash!,
      },
    });
  }

  async update(user: User): Promise<void> {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        name: user.name,
        email: user.email,
        role: user.role,
        RG: user.RG,
        phone: user.phone,
        address: user.address,
        birth_date: user.birth_date,
        password_hash: user.passwordHash,
      },
    });
  }
  async delete(id: string): Promise<void> {
    await prisma.user.delete({
      where: { id },
    });
  }
}
