import { prisma } from '@/lib/prisma';
import { RegisterSchemaType } from '@/schemas/register.schema';
import { UpdateSchemaType } from '@/schemas/update.schema';

export const adminModel = {
  create: ({ name, email, password_hash, role }: RegisterSchemaType) => {
    return prisma.user.create({
      data: {
        name,
        email,
        password_hash,
        role,
      },
    });
  },

  update: (
    id: string,
    { name, email, password_hash, role }: UpdateSchemaType,
  ) => {
    return prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        password_hash,
        role,
      },
    });
  },
};
