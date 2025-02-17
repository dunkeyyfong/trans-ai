import { Response, Request } from 'express'
import { PrismaClient } from '@prisma/client'

export const getAllUser = async (req: Request, res: Response): Promise<void> => {
  const prisma = new PrismaClient()

  try {
    const user = await prisma.user.findMany()

    if (!user) {
      res.status(404)
    }

    res.status(201).json({ message: 'Get All user Successful', data: user })
  } catch (error) {
    res.sendStatus(500)
    console.log(error)
  }
}
