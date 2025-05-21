import { prisma } from '@/lib/prisma';
import { UpdateSchemaType } from '@/schemas/update.schema';

export const userModel = {
  findAll: () => prisma.user.findMany(),

  findById: (id: string) => prisma.user.findUnique({ where: { id: id } }),

  update: (id: string, { name, email, password_hash }: UpdateSchemaType) => {
    return prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        password_hash,
      },
    });
  },
};
