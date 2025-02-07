import express from 'express'
import { getFiles, getAvailableFiles } from './file.controller.js'

const fileRouter = express.Router()

fileRouter.get('/data', getFiles)
fileRouter.get('/list', getAvailableFiles)

export default fileRouter
