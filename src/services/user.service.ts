import { userModel } from '@/models/user.model';
import { RegisterSchemaType } from '@/schemas/register.schema';
import { UpdateSchemaType } from '@/schemas/update.schema';

export const userService = {
  getAll: async () => {
    const users = await userModel.findAll();
    return users;
  },
  getById: async (id: string) => {
    const user = await userModel.findById(id);
    return user;
  },

  update: async (
    id: string,
    { name, email, password_hash }: UpdateSchemaType,
  ) => {
    const user = await userModel.update(id, { name, email, password_hash });
    return user;
  },

  create: async ({ name, email, password_hash, role }: RegisterSchemaType) => {
    const user = await userModel.create({ name, email, password_hash, role });
    return user;
  },
};
