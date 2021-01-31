import express from 'express'

import { getAll } from '../controllers/discovery'

const router = express.Router()

router.get('/', getAll)

export default router