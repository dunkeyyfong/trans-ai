import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

export const postVisitCount = async (req: Request, res: Response): Promise<void> => {
  
  const prisma = new PrismaClient()

  try {
    const { count } = req.body as { count: string } 
    await prisma.count.create({
      data: {
        count: count
      }
    })
    res.status(200).send('Update')

  } catch (error) {
    res.status(500).send('Error')
    console.log(error)
  }
}
