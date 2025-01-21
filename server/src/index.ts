import express, { Request as ExpressRequest, Response } from 'express'
import http from 'http'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import { postLogin } from './controller/postLogin'

const app = express()
const server = http.createServer(app)
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
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

app.post('/api/login', postLogin)
