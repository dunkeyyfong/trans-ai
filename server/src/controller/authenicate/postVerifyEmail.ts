import { Request, Response } from 'express'
import { verifyToken } from '~/util/verifyToken'

export const postVerifyEmail = async (req: Request, res: Response): Promise<void> => {
  const { token } = req.body as { token: string }

  try {
    const verify = await verifyToken(token)

    if (verify) {
      res.status(200).send('Email verified')
    } else {
      res.status(401).send('Invalid token')
    }
  } catch (error) {
    res.status(500).send('Error verifying email')
    console.log(error)
  }
}
