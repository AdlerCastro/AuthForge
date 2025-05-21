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

  update: async (id: string, data: UpdateSchemaType) => {
    const user = await userModel.update(id, data);
    return user;
  },

  create: async (data: RegisterSchemaType) => {
    const user = await userModel.create(data);
    return user;
  },
};
