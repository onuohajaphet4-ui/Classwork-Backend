import mongoose from "mongoose";
const cohortFourSchmema = new mongoose.Schema(
    {
        names:{
            type:String , required:true  
        },
        email:{
            type:String , required:true , unique:true
        },
         phoneNumber:{
            type:String , required:true , unique:true
        },
         password:{
            type:String , required:true 
        },
         country:{
            type:String , required:false 
        },
         state:{
            type:String , required:false 
        },
        address:{
            type:String , required:false 
        },

    }, 
    {timestamps:true}
)

const cohortFour = mongoose.model("cohortFour", cohortFourSchmema)
export default cohortFour