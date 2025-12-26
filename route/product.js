import express from 'express'
import { createProduct, deleteProduct, getAllProducts ,  getProductById, updateProduct} from '../controller/product.js'
// import { protect } from '../middleware/authMiddleware.js'

const router = express.Router ()

router.post ('/', createProduct)
router.get ('/',  getAllProducts)
router.get ('/:id', getProductById)
router.delete ('/delete/:id', deleteProduct)
router.put ('/update/:id', updateProduct)
export default router 