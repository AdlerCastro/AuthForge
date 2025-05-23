import { prisma } from '@/lib/prisma';
import { RegisterSchemaType } from '@/schemas/register.schema';
import { UpdateSchemaType } from '@/schemas/update.schema';
import { hashPassword } from '@/utils/hashPassword';

export const adminModel = {
  create: async (data: RegisterSchemaType) => {
    const { password, ...rest } = data;

    return prisma.user.create({
      data: {
        ...rest,
        password_hash: await hashPassword(password),
      },
    });
  },

  update: async (id: string, data: UpdateSchemaType) => {
    const { password, ...rest } = data;

    if (!password) {
      return prisma.user.update({
        where: { id },
        data: {
          ...rest,
        },
      });
    }

    return prisma.user.update({
      where: { id },
      data: {
        ...rest,
        password_hash: await hashPassword(password),
      },
    });
  },

  delete: async (id: string) => {
    return prisma.user.delete({
      where: { id },
    });
  },
};
