import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { sendMail } from '~/service/mailService'

export const postDeleteAccount = async (req: Request, res: Response): Promise<void> => {
  const prisma = new PrismaClient()

  const { email } = req.body as { email: string }

  try {
    await prisma.user.delete({
      where: {
        email: email
      }
    })

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
      background-color:rgb(224, 254, 146);
      color: #ffffff;
      text-decoration: none;
      border-radius: 5px;
      font-size: 16px;
    }
    .btn:hover {
      background-color:rgb(178, 175, 20);
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
      <h1>Account Deleted</h1>
    </div>
    <div class="content">
      <p>We noticed that you did not verify your email address within the required time frame.</p>
      <p>As a result, your account has been deleted from our system. If this was a mistake and you would like to use our services, please feel free to sign up again.</p>
      <a href="http://localhost:8080/signup" class="btn">Sign Up Again</a>
      <p>If you have any questions, please contact our support team.</p>
    </div>
    <div class="footer">
      <p>&copy; 2025 Kotoba AI. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`

    await sendMail(to, 'Delete your email', contentMail)

    res.status(200).json({ message: 'Deleted account successfully' })
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
