import { adminModel } from '@/models/admin.model';
import { RegisterSchemaType } from '@/schemas/register.schema';
import { UpdateSchemaType } from '@/schemas/update.schema';

export const adminService = {
  create: async (data: RegisterSchemaType) => await adminModel.create(data),

  update: async (id: string, data: UpdateSchemaType) => {
    await adminModel.update(id, data);
  },

  delete: async (id: string) => {
    await adminModel.delete(id);
  },
};
