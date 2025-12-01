import express from 'express'
import { createStudents, getAllStudents , loginUser , getUserById , updateUser, deleteUser } from '../controller/user.js'
const router = express.Router ()

router.post ('/register', createStudents)
router.get ('/', getAllStudents)
router.put ('/update/:id', updateUser)
router.delete ('/delete/:id', deleteUser)
router.get ('/:id', getUserById)
router.post ('/login', loginUser)

export default router    