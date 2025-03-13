import { Response, Request } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

export const postUpdatePassword = async (req: Request, res: Response): Promise<void> => {
  const prisma = new PrismaClient()

  try {
    const { token, password } = req.body as { token: string; password: string }

    const user = await prisma.user.findFirst({
      where: { verifyToken: token }
    })

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).send('Not found account')
      return
    }

    if (!user.isActive) {
      res.status(401).send('User is not active, please verify your email')
      return
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        password: hashedPassword
      }
    })

    res.status(200).send('Updated password success')
  } catch (error) {
    res.sendStatus(500)
    console.log(error)
  }
}
