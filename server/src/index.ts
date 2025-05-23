import express, { Request as ExpressRequest, Response } from 'express'
import http from 'http'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import cookieParser from 'cookie-parser'
import cron from 'node-cron';
import { postLogin } from './controller/authenicate/postLogin'
import { postRegister } from './controller/authenicate/postRegister'
import { postVerifyEmail } from './controller/authenicate/postVerifyEmail'
import { authenicateToken } from './middleware/authenicateToken'
import { postDeleteAccount } from './controller/postDeleteAccount'
import { postSaveHistory } from './controller/history/postSaveHistory'
import { postDeleteHistory } from './controller/history/postDeleteHistory'
import { postUpdateHistory } from './controller/history/postUpdateHistory'
import { getAllHistory } from './controller/history/getAllHistory'
import { getMessageHistory } from './controller/history/getMessageHistory'
import { getAllUser } from './controller/admin/getAllUser'
import { postUpdateUser } from './controller/admin/postUpdateUser' // Thêm import
import { postVisitCount } from './controller/postVisitCount'
import { postUpdatePassword } from './controller/authenicate/postUpdatePassword'
import { postFindEmail } from './controller/authenicate/postFindEmail'
import { getDownload } from './controller/scripts/getDownload'
import { getHistory } from './controller/history/getHistory'
import { getTranscribe } from './controller/scripts/getTranscribe'
import { postTranslate } from './controller/scripts/postTranslate'
import { backUpDB } from './util/backUpDB'
import { moveBackUp } from './util/moveBackUp'
import { getInfoUser } from './controller/admin/getInfoUser'
import { getAllVisit } from './controller/admin/getAllVisit'
import { postResendEmail } from './controller/authenicate/postResendEmail'
import { getSummary } from './controller/scripts/getSummary'

const app = express()
const server = http.createServer(app)
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.text({ type: 'text/plain' }))
app.use(cookieParser())
dotenv.config()

app.use((req, res, next) => {
  next()
})

server.listen(8080, () => {
  console.log('Server is running on port 8080')
})

app.use((req, res, next) => {
  const staticPath = path.join(__dirname, '..', '..', 'dist')
  express.static(staticPath)(req, res, next)
})

app.get(/^(?!\/api\/)/, function (req, res) {
  res.sendFile(path.join(__dirname, '..', '..', 'dist', 'index.html'))
})

//Cron
cron.schedule('0 1 * * *', backUpDB)
cron.schedule('0 1 1 * *', moveBackUp)

// Authenicate
app.post('/api/login', postLogin)
app.post('/api/register', postRegister)
app.post('/api/update-password', postUpdatePassword)
app.post('/api/find-email', postFindEmail)
app.post('/api/resend-email', postResendEmail)
// Verify email
app.post('/api/verify-email', postVerifyEmail)

// Delete account
app.post('/api/delete-account', authenicateToken, postDeleteAccount)

// Save History
app.get('/api/get-history', authenicateToken, getAllHistory)
app.get('/api/get-message-history', authenicateToken, getMessageHistory)
app.get('/api/get-data-history', authenicateToken, getHistory)
app.post('/api/create-history', authenicateToken, postSaveHistory)
app.post('/api/delete-history', authenicateToken, postDeleteHistory)
app.post('/api/update-history', authenicateToken, postUpdateHistory)

// Admin
app.get('/api/get-all-user', authenicateToken, getAllUser)
app.post('/api/update-user', authenicateToken, postUpdateUser) // Thêm route
app.get('/api/get-info-user', authenicateToken, getInfoUser)
app.get('/api/get-all-visit', authenicateToken, getAllVisit)
// Visit Count
app.post('/api/visit-count', postVisitCount)

// Download
app.get('/api/download', authenicateToken, getDownload)

// Transcribe
app.get('/api/transcribe', authenicateToken, getTranscribe)

// Translate
app.post('/api/translate', authenicateToken, postTranslate)

// Summary
app.get('/api/summary', authenicateToken, getSummary)