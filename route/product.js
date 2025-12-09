import express from 'express'
import { createProduct, deleteProduct, getAllProducts ,  getProductById, updateProduct} from '../controller/product.js'

const router = express.Router ()

router.post ('/', createProduct)
router.get ('/' ,  getAllProducts)
router.get ('/:id', getProductById)
router.delete ('/delete/:id', deleteProduct)
router.put ('/update/:id', updateProduct)
export default router    