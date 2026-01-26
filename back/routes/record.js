import {Router} from 'express'
import * as record from '../controllers/record.js'
import * as auth from '../middlewares/auth.js'

const router = Router()

// 定義路徑
router.get('/',record.getAllRecords)
router.post('/',auth.token,auth.admin,record.createNewRecord)
router.patch('/:id',auth.token,auth.admin,record.updateRecord)
router.delete('/:id',auth.token,auth.admin,record.deleteRecord)

export default router