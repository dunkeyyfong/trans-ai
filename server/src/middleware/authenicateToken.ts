import { NextFunction, Response, Request as ExpressRequest } from 'express'
import jwt from 'jsonwebtoken'
import { PrismaClient, User } from '@prisma/client'

export interface Request extends ExpressRequest {
  user?: User
}

export const authenicateToken = (req: Request, res: Response, next: NextFunction) => {
  const prisma = new PrismaClient()

  try {
    const authHeader = req.headers['authorization']
    const token = authHeader?.split(' ')[1]

    if (!token) {
      return res.sendStatus(401)
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || 'secret', async (err, user) => {
      if (
        err ||
        !(await prisma.user.findFirst({
          where: {
            id: (user as User).id,
            email: (user as User).email,
            role: (user as User).role,
            createdAt: (user as User).createdAt,
            updatedAt: (user as User).updatedAt,
            password: (user as User).password
          } as User
        }))
      ) {
        return res.sendStatus(403)
      }

      req.user = user as User
      next()
    })
  } catch (error) {
    res.sendStatus(500)
    console.log(error)
  }
}
