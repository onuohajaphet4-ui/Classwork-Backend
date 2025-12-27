import mongoose from "mongoose";

const gallerySchmema = new mongoose.Schema(
    {
        
        img:{
            type:String 
        }
    } , 
    {timestamps:true}
)

export const gallery = mongoose.model("gallery", gallerySchmema)