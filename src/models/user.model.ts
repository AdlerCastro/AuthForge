import { prisma } from '@/lib/prisma';
import { RegisterSchemaType } from '@/schemas/register.schema';
import { UpdateSchemaType } from '@/schemas/update.schema';
import { hashPassword } from '@/utils/hashPassword';

export const userModel = {
  findAll: () =>
    prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        created_at: true,
        RG: true,
        phone: true,
        address: true,
        birth_date: true,
      },
    }),

  findById: (id: string) =>
    prisma.user.findUnique({
      where: { id: id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        created_at: true,
        RG: true,
        phone: true,
        address: true,
        birth_date: true,
      },
    }),

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
        ...data,
        password_hash: await hashPassword(password),
      },
    });
  },

  create: async (data: RegisterSchemaType) => {
    const { password, ...rest } = data;

    return prisma.user.create({
      data: {
        ...rest,
        password_hash: await hashPassword(password),
      },
    });
  },
};
