import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('abcd1234', 10);

  await prisma.user.upsert({
    where: { email: 'JohnDoe@example.com' },
    update: {},
    create: {
      name: 'John Doe',
      email: 'JohnDoe@example.com',
      password_hash: hashedPassword,
      role: 'ADMIN',
      RG: '123456789',
      address: 'Rua Exemplo, 123',
      phone: '1234567890',
      birth_date: new Date('2000-01-01'),
    },
  });

  console.log('✅ Seed concluído: admin criado (ou já existia).');
}

main()
  .catch((e) => {
    console.error('❌ Erro ao rodar seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
