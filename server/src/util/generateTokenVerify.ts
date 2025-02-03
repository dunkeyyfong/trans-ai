import jwt from 'jsonwebtoken'

export const generateTokenVerify = async (email: string) => {
  return jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET || 'secret', { expiresIn: '2h' })
}
