import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {user} from "../model/admin.js"
import crypto from "crypto"

//Register
export const creatUser  = async (req, res) => {
    const{
        name,email,password
    } = req.body


    try {

         //check if emaill exist//
            const exist = await user.findOne({email})
            if (exist) return res.status(400).json({message:"Email Already Exist"})
        

         //Hash password//
              const salt = await bcrypt.genSalt(10);
              const hashPassword = await bcrypt.hash(password, salt);
            
              

         //Admin logic
              const role = 
               email === "onuohajaphet@gmail.com"? "admin" : "users"

              
        //create user
              const users = await user.create({
                name,email,password:hashPassword ,role}) 
                return res.status(201).json ({
                message: 'Registration Was Succesfful', users
                })

    } catch (error) {
         console.error(error)
        res.status(500).json ({
            message:'Server Error', error
        })
    }
}


//Login
  export const loginUsers = async (req, res) => {
      const{email, password}  = req.body 
  
      try {
          //check user exist
          const users = await user.findOne({email})
          if(!users) return res.status(400).json({message: 'invalid Email'})
  
              //check if password is correct
              const isMatch = await  bcrypt.compare(password, users.password)
              if (!isMatch) return res.status(400).json({message:'incorrect password'})
                
                  const token = jwt.sign(
                      {id:users._id,
                        role:users.role,
                      },
                      process.env.SECRET_KEY,
                      {expiresIn: "1d"}
                  )
  
               res.status(200).json({message:'Login successful', token, 
                  user:{
                      id: users._id,
                      names: users.name,
                      email: users.email ,
                      role:users.role,
                  }
               })   
  
      } catch (error) {
          res.status(500).json({message:error.message})
          
      }
     }



 //Get all user//
export const getAllUser = async (req, res) => {
        try {
            let users = await user.find().select('-password')
            res.status(200).json(users)
        } catch (error) {
            res.status(500).json({message:"Sever Error", error})
        }
}

 export const getUsersById = async (req, res) => {
      const userId  = req.params.id
      try {
         const users = await user.findById(userId)
            if(!users) return res.status(404).json({message: 'User Not Found'})
            res.status(200).json({users})

      } catch (error) {
        res.status(500).json({message: error.message})
      }
   }

///Forggotten email


 //Request for new password link
 
 export const forgotPassword = async  (req, res) => {
    // console.log("forgot password api")
    const {email} = req.body

    try {

        const users = await user.findOne({email})
        
        if (!users) {
            return res.json({
                message:'if email exists, reset link sent'
            })
        }


        //Generate token 
        const token = crypto.randomBytes(32).toString("hex")

        //Hash token

        const hashed = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex")

        // Save token + expiry
       users.resetPasswordToken= hashed
       users.resetPasswordExpires=Date.now() + 15 * 60* 1000
       
       await users.save()


       //create rest link
       const resetUrl= `http://localhost:5173/reset-password/${token}`

    //    console.log("RESET PASSWORD LINK:", resetUrl)

       res.json({message:"Reset link sent",token})

        
    } catch (error) {
        res.status(500).json({message:"error"})
    }
}


// create new password

export const resetPassword = async  (req, res) => {
    try {
        const {token}=req.params
        const {password} = req.body

         //Hash token

        const hashed = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex")

        const users = await user.findOne({
            resetPasswordToken:hashed,
            resetPasswordExpires:{ $gt:Date.now() }
        })

        if (!users){
              return res.status(400).json({
                message:'invalid token'
            })
        }

        
         //Hash password//
              const salt = await bcrypt.genSalt(10);
              users.password = await bcrypt.hash(password, salt);

        users.resetPasswordToken=undefined
        users.resetPasswordExpires=undefined

        await users.save()


          res.json({message:"Password reset successful"})

        
    } catch (error) {
        res.status(500).json({message:"error"})
    }



 
        


    
}

