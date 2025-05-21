import { prisma } from '@/lib/prisma';
import { RegisterSchemaType } from '@/schemas/register.schema';
import { UpdateSchemaType } from '@/schemas/update.schema';
import { hashPassword } from '@/utils/hashPassword';

export const adminModel = {
  create: async ({ name, email, password_hash, role }: RegisterSchemaType) => {
    return prisma.user.create({
      data: {
        name,
        email,
        password_hash: password_hash
          ? await hashPassword(password_hash)
          : password_hash,
        role,
      },
    });
  },

  update: async (
    id: string,
    { name, email, password_hash, role }: UpdateSchemaType,
  ) => {
    return prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        password_hash: password_hash
          ? await hashPassword(password_hash)
          : password_hash,
        role,
      },
    });
  },

  delete: async (id: string) => {
    return prisma.user.delete({
      where: { id },
    });
  },
};
