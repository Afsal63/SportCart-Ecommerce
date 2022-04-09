import express from "express";
const router = express.Router()
import { getProduts,
     getProductById,
     deleteProduct, 
     updateProduct,
     createProduct,
createProductReview,
getProductsReport,
getTopProducts} from '../controllers/productCorntroller.js'
import {protect,admin}from '../middleware/authMiddleware.js'
import User from "../models/userModel.js";
router.get('/top', getTopProducts)
router.route('/').get(getProduts).post(protect,admin,createProduct)
router.route('/:id').get(getProductById).delete(protect,admin,deleteProduct).put(protect,admin,updateProduct)
router.route('/report/products').get(getProductsReport)
router.route('/:id/reviews').post(protect,createProductReview)


export default router