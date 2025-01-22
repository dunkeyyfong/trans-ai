import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

export const verifyToken = async (token: string) => {
  const prisma = new PrismaClient()

  console.log(token)

  try {
    const tokenDecode = jwt.decode(token) as string | jwt.JwtPayload

    if (!tokenDecode) {
      return 'Token invalid'
    }

    const user = await prisma.user.findUnique({
      where: {
        email: typeof tokenDecode === 'string' ? tokenDecode : tokenDecode.email
      }
    })

    if (user) {
      await prisma.user.update({
        where: {
          email: typeof tokenDecode === 'string' ? tokenDecode : tokenDecode.email
        },
        data: {
          isActive: true
        }
      })

      return 'Email verified'
    }
  } catch (error) {
    return 'Token invalid'
  }
}
