import { adminModel } from '@/models/admin.model';
import { RegisterSchemaType } from '@/schemas/register.schema';
import { UpdateSchemaType } from '@/schemas/update.schema';

export const adminService = {
  create: async ({ name, email, password_hash, role }: RegisterSchemaType) =>
    await adminModel.create({ name, email, password_hash, role }),

  update: async (
    id: string,
    { name, email, password_hash, role }: UpdateSchemaType,
  ) => {
    await adminModel.update(id, { name, email, password_hash, role });
  },

  delete: async (id: string) => {
    await adminModel.delete(id);
  },
};
