import { Response, Request } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { generateToken } from '~/util/jwt'
import { generateTokenVerify } from '~/util/generateTokenVerify'
import { sendMail } from '~/service/mailService'

export const postRegister = async (req: Request, res: Response): Promise<void> => {
  const prisma = new PrismaClient()

  try {
    const { name, email, password } = req.body as { name: string; email: string; password: string }

    const user = await prisma.user.findFirst({
      where: { email }
    })

    if (user) {
      res.status(401).send('Email already exists')
      return
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const tokenVerify = await generateTokenVerify(email)

    const newUser = await prisma.user.create({
      data: {
        name: name,
        email,
        password: hashedPassword,
        role: 'USER',
        verifyToken: tokenVerify
      }
    })

    const accessToken = generateToken(newUser)

    const to = email

    const contentMail = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f9f9f9;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 30px auto;
      background-color: #ffffff;
      padding: 20px;
      border: 1px solid #e0e0e0;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      padding-bottom: 20px;
    }
    .header img {
      width: 100px;
    }
    .content {
      text-align: center;
      color: #333333;
      line-height: 1.6;
    }
    .btn {
      display: inline-block;
      margin-top: 20px;
      padding: 12px 25px;
      background-color: #4CAF50;
      color: #ffffff;
      text-decoration: none;
      border-radius: 5px;
      font-size: 16px;
    }
    .btn:hover {
      background-color: #45a049;
    }
    .footer {
      margin-top: 30px;
      text-align: center;
      color: #888888;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Verify Your Email</h1>
    </div>
    <div class="content">
      <p>Hello ${newUser.name},</p>
      <p>Thank you for signing up. Please verify your email address to complete your registration.</p>
      <a href="${process.env.URL_AUTHENICATE}/verify-email?t=${newUser.verifyToken}" class="btn">Verify Email</a>
      <p>If you didn’t create an account, you can safely ignore this email.</p>
      <p><strong>Note:</strong> If you do not verify your email within 2 hours, we will proceed to delete your account.</p>
    </div>
    <div class="footer">
      <p>&copy; 2025 Kotoba AI. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`

    await sendMail(to, 'Verify your email', contentMail)

    res.status(200).json({
      accessToken,
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      verifyToken: newUser.verifyToken
    })
  } catch (error) {
    res.sendStatus(500)
    console.log(error)
  }
}
