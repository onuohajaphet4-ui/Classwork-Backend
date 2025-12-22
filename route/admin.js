import express from 'express'
import { creatUser, loginUsers, getAllUser ,  getUsersById, forgotPassword,resetPassword} from '../controller/admin.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router ()

router.post ('/', creatUser)
router.post ('/reset-password', forgotPassword)
router.post ('/reset-password/:token', resetPassword)
router.get ('/', protect,  getAllUser)
router.get ('/:id', getUsersById)
router.post ('/login', loginUsers)

export default router 