import { Response, Request } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { generateToken } from '~/util/jwt'

export const postRegister = async (req: Request, res: Response): Promise<void> => {
  const prisma = new PrismaClient()

  try {
    const { email, password } = req.body as { email: string; password: string }

    const user = await prisma.user.findFirst({
      where: { email }
    })

    if (user) {
      res.status(401).send('Email already exists')
      return
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: 'USER'
      }
    })

    const accessToken = generateToken(newUser)

    res.status(200).json({ accessToken, id: newUser.id, email: newUser.email, role: newUser.role })
  } catch (error) {
    res.sendStatus(500)
    console.log(error)
  }
}
