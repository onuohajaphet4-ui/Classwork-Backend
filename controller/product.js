import {product} from "../model/product.js"

export const createProduct  = async (req, res) => {
    try {
        const{
        name,price,discription,img,category 
    } = req.body
    const newProducts = await product.create({
       name,
       price,
       discription,
       img,
       category
    })
    res.status(201).json ({
        success:true,
        message: 'product created', newProducts
    })
    } catch (error) {
         res.status(500).json ({
            success:false,
            message:'Server Error', error
        })
    }
}

 //Get all product//

export const getAllProducts = async (req, res) => {
        try {
            let products = await product.find()
            res.status(201).json ({
            success:true,
             products
    })
        } catch (error) {
           res.status(500).json ({
            success:false,
            message:'Server Error', error
        }) 
        }
}


//Get Product by id

   export const getProductById = async (req, res) => {
      const productId  = req.params.id
      try {
         const productss = await product.findById(productId)
            if(!productss) return res.status(404).json({message: 'product not found'})
            res.status(200).json({
              success:true,
             productss})

      } catch (error) {
        res.status(500).json({ success:false,
            message: error.message})
      }
   }

   //delete
export const deleteProduct  = async (req, res) => {
       try {
           const id  = req.params.id
           const productss = await product.findByIdAndDelete(id)
           if(!productss) return res.status(400).json({message: 'product not exist'}) 
           res.status(201).json({ success:true,
        message: 'product deleted successful'})
           await productss.deleteOne ()
             
       } catch (error) {
           res.status(500).json({ success:false,message:"Sever Error", error})
       }
}


//Update productss  //
    export const updateProduct = async (req, res) => { 
        let productId =req.params.id 
        const {name, price , discription, img,category} = req.body

        try {
            let productss = await product.findByIdAndUpdate(productId)
              if(!productss) return res.status(404).json({message: 'productss Not Found'})
             

          // update only provided fields //
           
            productss.name= name || productss.name
            productss.price= price || productss.price
            productss.discription=discription || productss.discription
            productss.img=img || productss.img
            productss.category || productss.category
           
            
            await productss.save()

             res.status(200).json({ success:true,message: 'productss succesfully updated', productss: {
                id: productss._id,
                name: productss.name,
                price: productss.price,
                discription: productss.discription,
                img: productss.img,
                category: productss.category,
               
             }

             })

         


        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
