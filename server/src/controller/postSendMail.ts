import { Request, Response } from 'express'
import { sendMail } from '~/service/mailService'

export const postSendMail = async (req: Request, res: Response): Promise<void> => {
  const { from, to, subject, html } = req.body

  try {
    await sendMail(from, to, subject, html)
    res.status(200).send('Email sent')
  } catch (err) {
    res.status(500).send('Error sending email')
  }
}
