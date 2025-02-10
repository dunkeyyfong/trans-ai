import { Response, Request } from 'express'
import { PrismaClient } from '@prisma/client'

export const getMessageHistory = async (req: Request, res: Response): Promise<void> => {
  const prisma = new PrismaClient()

  try {
    const { id, idHistory } = req.body as { id: string; idHistory: string }

    const existUser = await prisma.user.findUnique({
      where: {
        id: parseInt(id)
      }
    })

    if (!existUser) {
      res.status(404).json({ error: 'Login or Register please' })
    }

    const existHistory = await prisma.history.findUnique({
      where: {
        id: parseInt(idHistory)
      }
    })

    if (!existHistory) {
      res.status(404).json({ error: 'History not found' })
    }

    const dataMessageHistory = await prisma.history.findUnique({
      where: {
        userId: parseInt(id),
        id: parseInt(idHistory)
      },
      include: {
        message: true
      }
    })

    res.status(201).json({ message: 'Get All message History Successful', data: dataMessageHistory })
  } catch (error) {
    res.sendStatus(500)
    console.log(error)
  }
}
