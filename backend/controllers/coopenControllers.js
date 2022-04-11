import asyncHandler from "express-async-handler";
import Coopen from "../models/coopenModel.js";
import Product from '../models/productModel.js'

const addNewCoopen = asyncHandler(async(req,res) => {
   console.log('fksjdfjsjdkfjlkasjdflks=========');
    const {coopenName, coopenDiscount, category }=req.body
    const existingCoopen=await Coopen.findOne({coopenName:coopenName})
    if(existingCoopen) {
        res.status(400)
        throw new Error('Coopen is already exists')
    }else{
    const coopen= await Coopen.create({
        coopenName, coopenDiscount, category 
       
    })
    res.json(coopen)

    const products=await Product.find({})
    products.forEach(async(product)=>{
        product.coopenPrice=coopen.coopenDiscount
        await product.save()
    })
    if(coopen){
        res.json(coopen)
   }
   }
})



const getCoopens = asyncHandler(async(req,res) => {
   const coopens=await Coopen.find({})
   res.json(coopens)
})

const deleteCoopens = asyncHandler(async(req,res) => {
    const coopen=await Coopen.findById(req.params.id)
    if(coopen){
        const products=await Product.find({})
        products.forEach(async(product)=>{
        product.coopenPrice=product.coopenPrice-coopen.coopenDiscount
        await product.save()
    })
        await coopen.remove()
        res.json({message:'Coopen Removed'})
    }else{
        res.status(404)
        throw new Error('Coopen not found')
    }
 })

const getCoopenDetails = asyncHandler(async(req,res) => {
    const coopenDetails=await Offer.findById(req.params.id)
    if(coopenDetails){
        res.json(coopenDetails)
    }else{
        res.status(404)
        throw new Error('coopen not found')
    }
 }) 



export {addNewCoopen,getCoopens,deleteCoopens,getCoopenDetails}