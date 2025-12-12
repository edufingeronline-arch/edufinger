/* Seed script: creates an admin user and sample categories/tags/posts */
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const slugify = require('slugify');

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@example.com';
  const password = 'Admin123!'; // Change here to customize default admin
  const name = 'Admin';

  const passwordHash = await bcrypt.hash(password, 10);

  const admin = await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, password: passwordHash, name, role: 'admin' }
  });

  const catTech = await prisma.category.upsert({
    where: { name: 'Technology' },
    update: {},
    create: { name: 'Technology' }
  });
  const catLife = await prisma.category.upsert({
    where: { name: 'Lifestyle' },
    update: {},
    create: { name: 'Lifestyle' }
  });

  const tagJs = await prisma.tag.upsert({ where: { name: 'JavaScript' }, update: {}, create: { name: 'JavaScript' } });
  const tagNode = await prisma.tag.upsert({ where: { name: 'Node' }, update: {}, create: { name: 'Node' } });

  const title = 'Welcome to Our Blog';
  const slug = slugify(title, { lower: true, strict: true });

  await prisma.post.upsert({
    where: { slug },
    update: {},
    create: {
      title,
      slug,
      excerpt: 'This is the first post of the blog.',
      content: 'Hello world! This blog is built with React, Express, Prisma, and PostgreSQL.',
      authorId: admin.id,
      published: true,
      categories: {
        connect: [{ id: catTech.id }, { id: catLife.id }]
      },
      tags: {
        connect: [{ id: tagJs.id }, { id: tagNode.id }]
      }
    }
  });

  console.log('Seed complete. Admin user:', email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

