import cohortFour from "../model/users.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
//user registattion//
export const createStudents  = async (req, res) => {
    const{
        names,email,phoneNumber,password,country,state 
    } = req.body

    try {
    //check if emaill exist//
    const exist = await cohortFour.findOne({email})
    if (exist) return res.status(400).json({message:"Email Already Exist"})

    //Hash password//
     const salt = await bcrypt.genSalt(10);
     const hashPassword = await bcrypt.hash(password, salt);

    // creat user
    const students = await cohortFour.create({
       names,
       email,
       phoneNumber,
       password:hashPassword ,
       country,
       state
    }) 
    return res.status(201).json ({
        message: 'Registration Was Succesfful', students
    })
    } catch (error) {
        console.error(error)
        res.status(500).json ({
            message:'Server Error', error
        })
    }

    
}
   //Get all user//
export const getAllStudents = async (req, res) => {
        try {
            let students = await cohortFour.find().select('-password')
            res.status(200).json(students)
        } catch (error) {
            res.status(500).json({message:"Sever Error", error})
        }
}


 //Login
   export const loginUser = async (req, res) => {
    const{email, password}  = req.body 

    try {
        //check user exist
        const user = await cohortFour.findOne({email})
        if(!user) return res.status(400).json({message: 'invalid Email'})

            //check if password is correct
            const isMatch = await  bcrypt.compare(password, user.password)
            if (!isMatch) return res.status(400).json({message:'incorrect password'})
              
                const token = jwt.sign(
                    {id:user._id},
                    process.env.SECRET_KEY,
                    {expiresIn: "1d"}
                )

             res.status(200).json({message:'Login successful', token, 
                user:{
                    id: user._id,
                    names: user.names ,
                    email: user.email ,
                    phoneNumber: user.phoneNumber 
                }
             })   

    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
   }

   //Get User by id

   export const getUserById = async (req, res) => {
      const userId  = req.params.id
      try {
         const user = await cohortFour.findById(userId)
            if(!user) return res.status(404).json({message: 'User Not Found'})
            res.status(200).json({user})

      } catch (error) {
        res.status(500).json({message: error.message})
      }
   }


   //Update User  //
    export const updateUser = async (req, res) => { 
        let userId =req.params.id 
        const {names, email , phoneNumber, password,country, state} = req.body

        try {
            let user = await cohortFour.findByIdAndUpdate(userId)
              if(!user) return res.status(404).json({message: 'User Not Found'})
             

          // update only provided fields //
           
            user.names= names || user.names
            user.email= email || user.email
            user.phoneNumber=phoneNumber || user.phoneNumber
            user.password=password || user.password
            user.country=country || user.country
            user.state=state || user.state
            
            await user.save()

             res.status(200).json({message: 'user succesfully updated', user: {
                id: user._id,
                names: user.names,
                email: user.email,
                phoneNumber: user.phoneNumber,
                password: user.password,
                country: user.country,
                state : user.state
             }

             })

         


        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }


    //delete user
     export const deleteUser  = async (req, res) => {
    try {
        const id  = req.params.id
        const user = await cohortFour.findByIdAndDelete(id)
        if(!user) return res.status(400).json({message: 'user do not exist'}) 
        res.status(201).json({message: 'user deleted successful'})
        await user.deleteOne ()
          
    } catch (error) {
        res.status(500).json({message:"Sever Error", error})
    }
  }
    