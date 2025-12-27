import {gallery} from "../model/gallery.js"

export const createGallery  = async (req, res) => {
    try {
        if (!req){
            return res.status(400).json({
                success:'false',
                massage:"image is required"
            })
        }

    const img = req.file?.path 
    const newGallery = await gallery.create({
       
       img
    })
    res.status(201).json ({
        success:true,
        message: 'product created', newGallery
    })
    } catch (error) {
         res.status(500).json ({
            success:false,
            message:'Server Error', error
        })
    }
}

//Get all product//

export const getAllGallery = async (req, res) => {
        try {
            let gallerys = await gallery.find()
            res.status(201).json ({
            success:true,
             gallerys
    })
        } catch (error) {
           res.status(500).json ({
            success:false,
            message:'Server Error', error
        }) 
        }
}

//Get Product by id

   export const getGalleryById = async (req, res) => {
      const galleryId  = req.params.id
      try {
         const galleryss = await gallery.findById(galleryId)
            if(!galleryss) return res.status(404).json({message: 'product not found'})
            res.status(200).json({
              success:true,
             galleryss})

      } catch (error) {
        res.status(500).json({ success:false,
            message: error.message})
      }
}

export const deleteGallery  = async (req, res) => {
       try {
           const id  = req.params.id
           const galleryss = await gallery.findByIdAndDelete(id)
           if(!galleryss) return res.status(400).json({message: 'product not exist'}) 
           res.status(201).json({ success:true,
        message: 'product deleted successful'})
           await galleryss.deleteOne ()
             
       } catch (error) {
           res.status(500).json({ success:false,message:"Sever Error", error})
       }
}

