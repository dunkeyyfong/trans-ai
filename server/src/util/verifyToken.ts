import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

export const verifyToken = async (token: string) => {
  const prisma = new PrismaClient()

  try {
    const tokenDecode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || 'secret')

    if (typeof tokenDecode !== 'string' && 'email' in tokenDecode) {
      const user = await prisma.user.findUnique({
        where: {
          email: tokenDecode.email
        }
      })

      if (user) {
        await prisma.user.update({
          where: {
            email: tokenDecode.email
          },
          data: {
            isActive: true
          }
        })

        return 'Email verified'
      }
    }
  } catch (error) {
    return 'Token invalid'
  }
}
