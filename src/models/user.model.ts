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

  create: async (data: RegisterSchemaType) => {
    const { password_hash } = data;

    return prisma.user.create({
      data: {
        ...data,
        password_hash: await hashPassword(password_hash),
      },
    });
  },
};
