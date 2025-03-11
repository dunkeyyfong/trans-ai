import { Response, Request } from 'express'
import { PrismaClient } from '@prisma/client'

export const postFindEmail = async (req: Request, res: Response): Promise<void> => {
  const prisma = new PrismaClient()

  try {
    const { email } = req.body as { email: string }

    const user = await prisma.user.findFirst({
      where: { email: email }
    })

    if (!user) return

    res.status(200).json({ id: user.id, email: user.email, role: user.role, verifyToken: user.verifyToken })
  } catch (error) {
    res.sendStatus(500)
    console.log(error)
  }
}
