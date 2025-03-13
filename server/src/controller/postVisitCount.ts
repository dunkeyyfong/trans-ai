import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

export const postVisitCount = async (req: Request, res: Response): Promise<void> => {
  const prisma = new PrismaClient()

  try {
    const { newCount } = req.body as { newCount: number }
    await prisma.countVistor.create({
      data: {
        count: newCount
      }
    })
    res.status(200).json({ newCount })

  } catch (error) {
    res.status(500).send('Error')
    console.log(error)
  }
}
