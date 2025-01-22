import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Tạo một user mới
  const newUser = await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@transai.site',
      password: '$2a$12$.KE88GSEPuO5x.XGeG8qh.XL3ittFwN3ndGUDqqZ62ZWZFlh2d/P2',
      isActive: true,
      role: 'ADMIN'
    }
  })
  console.log('New User:', newUser)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
