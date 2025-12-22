import dotenv from "dotenv"
dotenv.config()

// console.log("CLIENT_ID:", process.env.CLIENT_ID )

import express from 'express'
import mongoose from 'mongoose'
import userRoutes from './route/user.js'
import productRoutes from './route/product.js'
import adminRoutes from './route/admin.js'
import authRoutes from './route/passport.js'
import cors from 'cors'
import passport from 'passport'
import "./controller/passport.js"


const app = express()
app.use(cors({
  origin: "*",
  methods:'GET,POST,PUT,DELETE',
  allowedHeaders:'Content-Type,Authorization'
}))

app.use(express.json())
app.use(passport.initialize())
app.listen(3000, () => {
    console.log(`backend is running in port ${process.env.PORT}`)
})

//Routes
app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/admin', adminRoutes)
app.use('/', authRoutes)
app.get ('/' , (req, res) => {
res.send ("hello Japhet you are cute")
})





mongoose.connect (process.env.MOGODB_URL) 
.then (() => {
  console.log('Connected to database')
}).catch (() => {
  console.log(' E no Connect')
})

