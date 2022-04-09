import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from "colors"
import connctDB from './config/db.js'
import { errorHandler, notFound } from './middleware/errorMidleware.js'
import productRouts from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import offerRoutes from './routes/offerRoutes.js'
import morgan from 'morgan'

dotenv.config()
connctDB()
const app = express()
if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
}
app.use(express.json())

app.get('/', (req, res) => {
    res.send('API is running...')
})
app.use('/api/products', productRouts)
app.use('/api/users', userRoutes )
app.use('/api/orders',orderRoutes)
app.use('/api/upload',uploadRoutes)
app.use('/api/offers',offerRoutes)
app.get('/api/config/paypal',(req,res)=>res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname =path.resolve()

app.use('/uploads',express.static(path.join(__dirname,'/uploads')))
app.use(notFound)
app.use(errorHandler)




const PORT = process.env.PORT || 6001
app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))