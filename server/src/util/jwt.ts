import { User } from '@prisma/client'
import jwt from 'jsonwebtoken'

export const generateToken = (user: User) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET || 'secret')
}
