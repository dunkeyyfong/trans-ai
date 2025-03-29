import { Response, Request } from 'express'
import { PrismaClient } from '@prisma/client'

export const getInfoUser = async (req: Request, res: Response): Promise<void> => {
  const prisma = new PrismaClient()

  try {

    const { userId } = req.query as { userId: string }

    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId)
      }
    })

    if (!user) {
      res.status(404)
    }

    res.status(201).json({ message: 'Get Info User Successful', data: user })
  } catch (error) {
    res.sendStatus(500)
    console.log(error)
  }
}
