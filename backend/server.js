import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'


//App Config

const app = express()
const port = process.env.PORT || 4000
connectDB() 
connectCloudinary()

//middlewares
app.use(express.json())
app.use(cors())

//API endpoints

app.use('/api/user',userRouter)
app.use('/api/product',productRouter)



app.get('/', (req, res) => {
    res.send('API Working')
})
app.use((req,res,next)=>{
    return res.status(404).json({
        message:"API Error",
        success:false
    })
})
app.listen(port, () => {
    console.log(`listening on localhost:${port}`)
})