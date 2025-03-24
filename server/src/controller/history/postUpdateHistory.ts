import { Response, Request } from 'express'
import { PrismaClient } from '@prisma/client'

export const postUpdateHistory = async (req: Request, res: Response): Promise<void> => {
  const prisma = new PrismaClient()

  try {
    const { id, content, url, idHistory } = req.body as { content: string; id: string; idHistory: string; url: string }

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

    await prisma.history.update({
      where: {
        id: parseInt(idHistory)
      },
      data: {
        message: {
          create: {
            message: content,
            url: url
          }
        }
      }
    })

    res.status(201).json({ message: 'Updated History successful' })
  } catch (error) {
    res.sendStatus(500)
    console.log(error)
  }
}
