import express from 'express'
const router =express.Router()
import{ addOrderItems, 
    getOrderById,
     updateOrderToPaid,
     updateOrderToDelivered,
    getMyOrders, 
    getOrders,
cancelledOrder,report,
getOrderReports,
updateOrderToShipped} 
    from '../controllers/orderController.js'
getOrderById
import {admin, protect } from '../middleware/authMiddleware.js'

router.route('/').post(protect,addOrderItems).get(protect,admin,getOrders)
router.route('/myorders').get(protect,getMyOrders)
router.route('/:id').get(protect,getOrderById)
router.route('/:id/pay').put(protect,updateOrderToPaid)
router.route('/:id/deliver').put(protect,admin,updateOrderToDelivered)
router.route('/:id/shipping').put(protect,admin,updateOrderToShipped)
router.route('/report/orders').get(getOrderReports)
router.route('/:id/cancel').put(protect,cancelledOrder)
router.route('/salesreport').get(protect,admin,report)
router.route('/salesreport/:id').get(protect,admin,report)
export default router