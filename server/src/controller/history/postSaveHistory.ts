import { Response, Request } from 'express'
import { PrismaClient } from '@prisma/client'

export const postSaveHistory = async (req: Request, res: Response): Promise<void> => {
  const prisma = new PrismaClient()

  try {
    const { name, id } = req.body as { name: string; id: string }

    const existUser = await prisma.user.findUnique({
      where: {
        id: parseInt(id)
      }
    })

    if (!existUser) {
      res.status(404).json({ error: 'Login or Register please' })
    }

    await prisma.history.create({
      data: {
        title: name,
        userId: parseInt(id)
      }
    })

    res.status(201).json({ message: 'Created successful' })
  } catch (error) {
    res.sendStatus(500)
    console.log(error)
  }
}
