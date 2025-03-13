import { Response, Request } from 'express'
import { PrismaClient } from '@prisma/client'
import { sendMail } from '~/service/mailService'

export const postFindEmail = async (req: Request, res: Response): Promise<void> => {
  const prisma = new PrismaClient()

  try {
    const { email } = req.body as { email: string }

    const user = await prisma.user.findFirst({
      where: { email: email }
    })

    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    const to = email

    const contentMail = `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f0f4f8;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: linear-gradient(135deg, #ffffff, #f8f9fd);
      padding: 40px;
      border-radius: 16px;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
      text-align: center;
    }
    .header img {
      width: 140px;
      border-radius: 12px;
    }
    .header h1 {
      color: #007bff;
      font-size: 28px;
      margin: 20px 0 10px;
      font-weight: bold;
    }
    .content {
      color: #333;
      font-size: 18px;
      line-height: 1.8;
    }
    .content p {
      margin: 15px 0;
    }
    .btn {
      display: inline-block;
      margin-top: 25px;
      padding: 16px 35px;
      background: linear-gradient(135deg, #007bff, #0056b3);
      color: #ffffff;
      text-decoration: none;
      border-radius: 50px;
      font-size: 20px;
      font-weight: bold;
      box-shadow: 0 5px 15px rgba(0, 123, 255, 0.3);
      transition: all 0.3s ease-in-out;
    }
    .btn:hover {
      background: linear-gradient(135deg, #0056b3, #003d80);
      box-shadow: 0 7px 20px rgba(0, 123, 255, 0.4);
      transform: scale(1.05);
    }
    .note {
      font-size: 16px;
      color: #666;
      margin-top: 20px;
    }
    .footer {
      margin-top: 30px;
      color: #555;
      font-size: 14px;
    }
    .footer a {
      color: #007bff;
      text-decoration: none;
    }
    .footer a:hover {
      text-decoration: underline;
    }
    .support {
      font-size: 16px;
      color: #444;
      font-weight: bold;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="${process.env.URL_AUTHENICATE}/ABOUT_US.jpg" alt="Kotoba AI Logo">
      <h1>Reset Your Password</h1>
      <p style="color: #555; font-size: 16px;">Secure your account with a new password.</p>
    </div>
    <div class="content">
      <p>Hello <strong>${user.name}</strong>,</p>
      <p>We received a request to reset your password. Click the button below to set a new password:</p>
      <a href="${process.env.URL_AUTHENICATE}/reset-password?t=${user.verifyToken}" class="btn">Reset My Password</a>
      <p class="note"><strong>Note:</strong> This link will expire in <strong>1 hour</strong>. If you did not request a password reset, please ignore this email.</p>
    </div>
    <div class="footer">
      <p class="support">Need help? Contact us at <a href="mailto:support@kotoba.tokyo">support@kotoba.tokyo</a></p>
      <p>&copy; 2025 Kotoba AI. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`

    await sendMail(to, 'Reset your password', contentMail)

    res.status(200).json({ message: 'Email sent' })
  } catch (error) {
    res.sendStatus(500)
    console.log(error)
  }
}
