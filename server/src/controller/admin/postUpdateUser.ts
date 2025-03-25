import { Response, Request } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

// Khởi tạo Prisma Client bên ngoài để tái sử dụng
const prisma = new PrismaClient()

export const postUpdateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { idUser, email, name } = req.body as {
      idUser: string
      // password: string
      email: string
      name: string
    }

    const existUser = await prisma.user.findUnique({
      where: {
        id: parseInt(idUser)
      }
    })

    if (!existUser) {
      res.status(404).json({ error: 'User not found' })
    }

    // const hashedPassword = await bcrypt.hash(password, 10)

    const updatedUser = await prisma.user.update({
      where: {
        id: parseInt(idUser)
      },
      data: {
        email: email,
        // password: hashedPassword, 
        name: name
      }
    })

    // Trả về response thành công
    res.status(200).json({
      message: 'User updated successfully',
      data: updatedUser
    })
  } catch (error) {
    console.error('Error updating user:', error)
    res.status(500).json({
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  } finally {
    // Đóng kết nối Prisma
    await prisma.$disconnect()
  }
}