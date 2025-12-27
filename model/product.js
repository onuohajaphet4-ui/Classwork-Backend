import mongoose from "mongoose";

const productSchmema = new mongoose.Schema(
    {
        name:{
            type:String 
        },
        price:{
            type:Number 
        },
        discription:{
            type:String 
            
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