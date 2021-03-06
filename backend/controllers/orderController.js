// import expressAsyncHandler from 'express-async-handler'
import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

//@desc Creat new order
// @route Post /api/orders
//@access Private

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    couponPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice: Number(itemsPrice),
      taxPrice,
      shippingPrice,
      couponPrice,
      totalPrice,
   
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});
//@desc Get order by ID
//@desc GET /api/orders/:id
//@access Private

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc Update order to paid
//@route GET/api/orders/:id/pay
// @access Private

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.Update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  }
});
// @desc    Get all orders for a user
// @route   Get /api/orders/myorders
// @access  Private

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });

  res.json(orders);
});

//@desc Get All orders
//@route Get /api/orders
//@access Private/Admin

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.json(orders);
});

//@desc Update order to delivered
//@route GET /api/orders/:id/deliver
//@access Private

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelvered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
    console.log(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});


const updateOrderToShipped = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isShipped = true;
    order.shippedAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
    console.log(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});


const cancelledOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isCancelled = true;
    order.deliverdAt = Date.now();
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("order Not found");
  }
});

const getOrderReports=asyncHandler(async(req,res)=>{
  const orders=await Order.find({})
  const ordersLength=orders.length

  let totalRevenue = 0
  let unpaidPrice = 0
  let paidPrice = 0
  let paidOrders=0
  let unpaidOrders=0
  orders.forEach((order)=>{
     if(order.totalPrice){
          totalRevenue=totalRevenue+order.totalPrice;
     }
     if(!order.isPaid){
      unpaidPrice=unpaidPrice+order.totalPrice
      unpaidOrders=unpaidOrders+1;
     }
     if(order.isPaid){
      paidPrice=paidPrice+order.totalPrice
      paidOrders=paidOrders+1;
     }
  })
  res.json({totalPrice:totalRevenue,unpaid:unpaidPrice,paidprice:paidPrice,totalOrders:ordersLength,paidOrdersNumber:paidOrders,unpaidOrdersNumber:unpaidOrders})
}) 

// @desc    Get details for report
// @route   GET /api/orders/report/:id
// @access  Private/ Admin
const report = asyncHandler(async (req, res) => {
  const upper = req.params.id
  const lower = req.query.lower
  let products = []
  let total = 0
  let qty = 0
  let paid = 0
  let unpaid = 0
  let paidAmount = 0
  let unpaidAmount = 0
  let paidQty = 0
  const orders = await Order.find({
    createdAt: {
      $gte: lower,
      $lt: upper,
    },
  })
    .sort({ createdAt: -1 })
    .populate('orderItems', 'product price qty name')
  orders.forEach((order) => {
    order.orderItems.forEach((item) => {
      if (item.product) {
        let product = products.find((product) => product.name === item.name)
        if (product) {
          product.qty += item.qty
          product.total += item.price
          if (order.isPaid) {
            product.paid += item.price
          } else {
            product.unpaid += item.price
          }
        } else {
          products.push({
            id: item.product,
            name: item.name,
            qty: item.qty,
            total: item.price,
            paid: 0,
            unpaid: 0,
            paidQty: 0,
          })
          if (order.isPaid) {
            products[products.length - 1].paid += item.price
            products[products.length - 1].paidQty += item.qty
          } else {
            products[products.length - 1].unpaid += item.price
          }
        }
      }
    })
  })
  products.forEach((product) => {
    qty += product.qty
    total += product.total
    if (product.paid) {
      paid += product.paid
    } else {
      unpaid += product.unpaid
    }
    paidAmount += product.paid
    unpaidAmount += product.unpaid
  })
  res.json({
    products,
    qty: qty,
    total: total,
    unpaid: Math.round(unpaid * 100) / 100,
    paid: Math.round(paid * 100) / 100,
    paidAmount: Math.round(paidAmount * 100) / 100,
    unpaidAmount: Math.round(unpaidAmount * 100) / 100,
  })
})


export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  cancelledOrder,
  report,
  getOrderReports,
  updateOrderToShipped
};
