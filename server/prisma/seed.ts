import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Tạo một user mới
  const newUser = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password'
    }
  })
  console.log('New User:', newUser)

  // Lấy danh sách tất cả users
  const users = await prisma.user.findMany()
  console.log('All Users:', users)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
