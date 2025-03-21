import express, { Request as ExpressRequest, Response } from 'express'
import http from 'http'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import cookieParser from 'cookie-parser'
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
import { postVisitCount } from './controller/postVisitCount'
import { postUpdatePassword } from './controller/authenicate/postUpdatePassword'
import { postFindEmail } from './controller/authenicate/postFindEmail'
import { getDownload } from './controller/scripts/getDownload'
import { getHistory } from './controller/history/getHistory'

const app = express()
const server = http.createServer(app)
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
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

//Authenicate
app.post('/api/login', postLogin)
app.post('/api/register', postRegister)
app.post('/api/update-password', postUpdatePassword)
app.post('/api/find-email', postFindEmail)


//Verify email
app.post('/api/verify-email', postVerifyEmail)

//Delete account
app.post('/api/delete-account', authenicateToken, postDeleteAccount)

//Save History
app.get('/api/get-history', authenicateToken, getAllHistory)
app.get('/api/get-message-history', authenicateToken, getMessageHistory)
app.get('/api/get-data-history', authenicateToken, getHistory)
app.post('/api/create-history', authenicateToken, postSaveHistory)
app.post('/api/delete-history', authenicateToken, postDeleteHistory)
app.post('/api/update-history', authenicateToken, postUpdateHistory)

//admin
app.get('/api/get-all-user', authenicateToken, getAllUser)

//Visit Count
app.post('/api/visit-count', postVisitCount)

//Download
app.get('/api/download', authenicateToken, getDownload)