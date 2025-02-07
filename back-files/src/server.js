import express from 'express'
import cors from 'cors'
import router from './router.js'

const server = express()
const PORT = 5000

server.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}))

server.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json')
  next()
})

server.use('/', router)

server.listen(PORT, () => console.log(`Listening at ${PORT}`))
