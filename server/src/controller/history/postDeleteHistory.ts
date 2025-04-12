import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

export const postDeleteHistory = async (req: Request, res: Response): Promise<void> => {
  const prisma = new PrismaClient()

  const { id, idHistory } = req.body as { id: string; idHistory: string }

  try {
    const existUser = await prisma.user.findUnique({
      where: {
        id: parseInt(id)
      }
    })

    if (!existUser) {
      res.status(404).json({ error: 'Login or Register please' })
      return
    }

    const existHistory = await prisma.history.findUnique({
      where: {
        id: parseInt(idHistory)
      }
    })

    if (!existHistory) {
      res.status(404).json({ error: 'History not found' })
      return
    }

    await prisma.message.deleteMany({
      where: { historyId: parseInt(idHistory) }
    })

    await prisma.history.delete({
      where: {
        id: parseInt(idHistory)
      }
    })

    res.status(200).json({ message: 'Deleted history successfully' })
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
