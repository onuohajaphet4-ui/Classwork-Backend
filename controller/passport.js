import passport  from "passport";
import { Strategy as GooglesStrategy } from "passport-google-oauth20";
import {user} from '../model/admin.js'
import 'dotenv/config'

// console.log("CLIENT_ID:", process.env.CLIENT_ID )
passport.use(
    new GooglesStrategy (
        {
            clientID:process.env.CLIENT_ID, 
            clientSecret:process.env.CLIENT_SECRET,
            callbackURL:"https://classwork-backend-yhli.onrender.com/auth/google/callback"

            
        },

       
        async(accessToken, refreshToken,profile, done) => {
            try {
                //check if user exist
                let users = await user.findOne({email:profile.emails[0].value})

                //creaye user 
                if (!users) {
                     users=await user.create ({
                        name:profile.displayName,
                        email:profile.emails[0].value,
                        provider: "google",
                        role:"user"
                     })
                }

                //  console.log("CLIENT_ID:", process.env.CLIENT_ID)

                return done (null, users)
            } catch (error) {
                res.status(500).json ({
            success:false,
            message:'Server Error', error
             })
            }
        }




    ) 

) 
export default passport

