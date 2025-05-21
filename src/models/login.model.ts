import { prisma } from '@/lib/prisma';
import { LoginSchemaType } from '@/schemas/login.schema';
import bcrypt from 'bcryptjs';

export const loginModel = {
  getByEmail: async ({ email }: Partial<LoginSchemaType>) => {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  },

  comparePassword: async (password: string, hashedPassword: string) => {
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);
    return isPasswordValid;
  },
};
