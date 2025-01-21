import { Response, Request } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { generateToken } from '~/util/jwt'

export const postLogin = async (req: Request, res: Response): Promise<void> => {
  const prisma = new PrismaClient()

  try {
    const { email, password } = req.body as { email: string; password: string }

    const user = await prisma.user.findFirst({
      where: { email }
    })

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).send('Invalid email or password')
      return
    }

    const accessToken = generateToken(user)
    res.status(200).json({ accessToken, id: user.id, email: user.email, role: user.role })
  } catch (error) {
    res.sendStatus(500)
    console.log(error)
  }
}
