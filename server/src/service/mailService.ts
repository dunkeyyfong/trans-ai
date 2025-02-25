import nodemailer from 'nodemailer'
import winston from 'winston'
import dotenv from 'dotenv'
dotenv.config()

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.json(),
  transports: [new winston.transports.Console()]
})

export const sendMail = async (to: string, subject: string, html: string) => {

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  })

  const mailOptions = {
    from: `${process.env.MAIL_USER}`,
    to: to,
    subject: subject,
    html: html
  }

  logger.info(`Sending email to ${to}`)

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      logger.error(`Error sending email to ${to}`)
      logger.error(err)
    } else {
      logger.info(`Email sent to ${to}`)
      logger.info(info)
    }
  })
}
