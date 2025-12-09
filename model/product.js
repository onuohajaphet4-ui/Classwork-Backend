import mongoose from "mongoose";

const productSchmema = new mongoose.Schema(
    {
        name:{
            type:String , required:true
        },
        price:{
            type:Number , required:true
        },
        discription:{
            type:String , required:true
        },
        img:{
            type:String 
        },
        stock:{
            type:String 
        },
        category:{
            type:String 
        },
    } , 
    {timestamps:true}
)

export const product = mongoose.model("product", productSchmema)