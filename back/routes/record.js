import {Router} from 'express'
import * as record from '../controllers/record.js'

const router = Router()

// 定義路徑
router.get('/',record.getAllRecords)
router.post('/',record.createNewRecord)

export default router