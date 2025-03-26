import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const existingUser = await prisma.user.findUnique({
    where: { email: 'admin@kotoba.tokyo' },
  });
  if (!existingUser) {
    // Tạo một user mới
    const newUser = await prisma.user.create({
      data: {
        name: 'Admin',
        email: 'admin@kotoba.tokyo',
        password: '$2a$12$.KE88GSEPuO5x.XGeG8qh.XL3ittFwN3ndGUDqqZ62ZWZFlh2d/P2', //Admin@123
        isActive: true,
        role: 'ADMIN',
        verifyToken: 'eyJhbGciOiJIUzI1NiJ9.YWRtaW5AdHJhbnNhaS5zaXRl.2P6eaHjkipMGef88Dz3tbsrBFw1BJSAPZ2RLq4d7J2E'
      }
    })
    console.log('New User:', newUser)
  } else {
    console.log('Skip run seed')
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
