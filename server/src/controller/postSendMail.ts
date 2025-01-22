import { Request, Response } from 'express'
import { sendMail } from '~/service/mailService'

export const postSendMail = async (req: Request, res: Response): Promise<void> => {
  const to = req.body.to

  const subject = 'Verify your email'

  const html = `<!DOCTYPE html>
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
      <p>Hello ${req.body.name}</p>
      <p>Thank you for signing up. Please verify your email address to complete your registration.</p>
      <a href="http://localhost:8080/verify-email/${req.body.token}" class="btn">Verify Email</a>
      <p>If you didn’t create an account, you can safely ignore this email.</p>
    </div>
    <div class="footer">
      <p>&copy; 2025 Kotoba AI. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`

  try {
    await sendMail(to, subject, html)
    res.status(200).send('Email sent')
  } catch (err) {
    res.status(500).send('Error sending email')
  }
}
