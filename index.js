import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import userRoutes from './route/user.js'
import productRoutes from './route/product.js'
import cors from 'cors'


dotenv.config()
const app = express()
app.use(cors({
  origin: "*",
  methods:'GET,POST,PUT,DELETE',
  allowedHeaders:'Content-Type,Authorization'
}))

app.use(express.json())
app.listen(3000, () => {
    console.log(`backend is running in port ${process.env.PORT}`)
})

//Routes
app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.get ('/' , (req, res) => {
res.send ("hello Japhet you are cute")
})





mongoose.connect (process.env.MOGODB_URL) 
.then (() => {
  console.log('Connected to database')
}).catch (() => {
  console.log(' E no Connect')
})

