import mongoose from "mongoose";
const cohortFourSchmema = new mongoose.Schema(
    {
        names:{
            type:String , require:true  
        },
        email:{
            type:String , require:true , unique:true
        },
         phoneNumber:{
            type:String , require:true , unique:true
        },
         password:{
            type:String , require:true 
        },
         country:{
            type:String , require:false 
        },
         state:{
            type:String , require:false 
        },
        address:{
            type:String , require:false 
        },

    }, 
    {timestamps:true}
)

const cohortFour = mongoose.model("cohortFour", cohortFourSchmema)
export default cohortFour