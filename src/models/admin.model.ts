import { prisma } from '@/lib/prisma';
import { RegisterSchemaType } from '@/schemas/register.schema';
import { UpdateSchemaType } from '@/schemas/update.schema';
import { hashPassword } from '@/utils/hashPassword';

export const adminModel = {
  create: async (data: RegisterSchemaType) => {
    const { password_hash } = data;

    return prisma.user.create({
      data: {
        ...data,
        password_hash: await hashPassword(password_hash),
      },
    });
  },

  update: async (id: string, data: UpdateSchemaType) => {
    const { password_hash } = data;

    if (!password_hash) {
      return prisma.user.update({
        where: { id },
        data: {
          ...data,
        },
      });
    }

    return prisma.user.update({
      where: { id },
      data: {
        ...data,
        password_hash: await hashPassword(password_hash),
      },
    });
  },

  delete: async (id: string) => {
    return prisma.user.delete({
      where: { id },
    });
  },
};
