import { loginModel } from '@/models/login.model';
import { LoginSchemaType } from '@/schemas/login.schema';

export const loginService = {
  getByEmail: async ({ email }: Partial<LoginSchemaType>) => {
    const user = await loginModel.getByEmail({ email });
    return user;
  },
  comparePassword: async (password: string, hashedPassword: string) => {
    const isPasswordValid = await loginModel.comparePassword(
      password,
      hashedPassword,
    );

    return isPasswordValid;
  },
};
