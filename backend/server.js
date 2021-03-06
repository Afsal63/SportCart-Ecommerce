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
import coopenRoutes from './routes/coopenRoutes.js'
import googleLoginRoutes from './routes/googleLoginRoutes.js'
import morgan from 'morgan'
import Razorpay from 'razorpay'
import Order from './models/orderModel.js'

dotenv.config()
connctDB()
const app = express()
if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
}
app.use(express.json())


app.use('/api/products', productRouts)
app.use('/api/users', userRoutes )
app.use('/api/orders',orderRoutes)
app.use('/api/upload',uploadRoutes)
app.use('/api/offers',offerRoutes)
app.use('/api/coopens',coopenRoutes)
app.use('/api/googlelogin',googleLoginRoutes)
app.get('/api/config/paypal',(req,res)=>res.send(process.env.PAYPAL_CLIENT_ID))

var razorpay = new Razorpay({
  key_id:process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
})

const getOrder = async (id) => {
  const data = Order.findById(id).populate('user', 'name email')
  // console.log(data)
  return data
}

app.post('/razorpay/:id', async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email')
  const payment_capture = 1
  const amount = 500
  const currency = 'INR'
  const options = {
    amount: order.totalPrice * 100,
    currency,
    receipt: "receipt332s",
    payment_capture,
  }
  console.log(options.amount)

  try {
    const response = await razorpay.orders.create(options)
    res.status(200).json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    })
  } catch (err) {
    console.log(err)
  }
})

app.post('/razorpay/success/:id', async (req, res) => {
  
  const order = await getOrder(req.params.id)
  order.isPaid = true
  order.paidAt = Date.now()
  await order.save()
  res.status(200).json('success')
})



const __dirname =path.resolve()
app.use('/uploads',express.static(path.join(__dirname,'/uploads')))

if(process.env.NODE_ENV === 'production'){
 app.use(express.static(path.join(__dirname, '/frontend/build')))

 app.get('*', (req,res)=> res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
}else{
  app.get('/', (req, res) => {
    res.send('API is running...')
})
}





app.use(notFound)
app.use(errorHandler)




const PORT = process.env.PORT || 6001
app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))