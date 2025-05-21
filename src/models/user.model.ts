import { prisma } from '@/lib/prisma';
import { UpdateSchemaType } from '@/schemas/update.schema';
import { hashPassword } from '@/utils/hashPassword';

export const userModel = {
  findAll: () => prisma.user.findMany(),

  findById: (id: string) => prisma.user.findUnique({ where: { id: id } }),

  update: async (
    id: string,
    { name, email, password_hash }: UpdateSchemaType,
  ) => {
    return prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        password_hash: password_hash
          ? await hashPassword(password_hash)
          : password_hash,
      },
    });
  },
};
