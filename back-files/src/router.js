import express from 'express'
import fileRouter from './entities/files/file.router.js'

const router = express.Router()

router.use('/files', fileRouter)

export default router
