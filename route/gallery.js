import express from 'express'
import {createGallery,getAllGallery,getGalleryById,deleteGallery } from '../controller/gallery.js'
import upload  from '../middleware/upload.js'

const router = express.Router ()

router.post ('/', upload.single("img"), createGallery)
router.get ('/',  getAllGallery)
router.get ('/:id', getGalleryById)
router.delete ('/delete/:id', deleteGallery)
// router.put ('/update/:id', updateGallery)
export default router 