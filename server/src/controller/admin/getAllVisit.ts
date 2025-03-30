import { Response, Request } from 'express'
import { PrismaClient } from '@prisma/client'

export const getAllVisit = async (req: Request, res: Response): Promise<void> => {
  const prisma = new PrismaClient()

  try {
    const visit = await prisma.countVistor.findMany()

    if (!visit) {
      res.status(404)
    }

    res.status(201).json({ message: 'Get All visit Successful', data: visit })
  } catch (error) {
    res.sendStatus(500)
    console.log(error)
  }
}
