import { Response, Request } from 'express'
import { PrismaClient } from '@prisma/client'

export const getHistory = async (req: Request, res: Response): Promise<void> => {
  const prisma = new PrismaClient()

  try {
    const { id, idHistory } = req.query as { id: string; idHistory: string };

    const existUser = await prisma.user.findUnique({
      where: {
        id: parseInt(id)
      }
    })

    if (!existUser) {
      res.status(404).json({ error: 'Login or Register please' })
    }

    const dataHistory = await prisma.history.findUnique({
      where: {
        id: parseInt(idHistory)
      },
    })

    res.status(201).json({ message: 'Get History Successful', data: dataHistory })
  } catch (error) {
    res.sendStatus(500)
    console.log(error)
  }
}
