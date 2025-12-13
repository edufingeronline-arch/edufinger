// Create a user from the command line.
// Usage: node scripts/create-user.js <email> <password> [name] [role]

require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const [, , email, password, nameArg, roleArg] = process.argv;
  const name = nameArg || 'Admin';
  const role = roleArg || 'admin';

  if (!email || !password) {
    console.error('Usage: node scripts/create-user.js <email> <password> [name] [role]');
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: { password: passwordHash, name, role },
    create: { email, password: passwordHash, name, role }
  });

  console.log(`User ready: ${user.email} (role: ${user.role})`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
