import asyncHandler from "express-async-handler"
import Product from "../models/productModel.js"

//@dec Fetch all products 
//@route Get /api/products
//@acces Public  

const getProduts = asyncHandler(async (req, res) => {
  const pageSize =4
  const page = Number(req.query.pageNumber) || 1
  const keyword=req.query.keyword ? {
    name:{
      $regex:req.query.keyword,
      $options:'i'
    }
  } : {}
 const count = await Product.countDocuments({...keyword})
    const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize *(page -1))
    res.json({products, page,pages:Math.ceil(count/pageSize)})
})

const getProductsReport = asyncHandler(async (req, res) => {
  const product = await Product.find({})
  const productNum=product.length
  const categories = await Category.find({})
  const categoriesNum=categories.length

  const categoryData= await Product.aggregate([
      { 
          $group:{
              _id:"$category",
              qty:{$sum:1}
          },
      },
      {
          $project:{
              category:"$_id",
              qty:1
          }
      }
  ]) 
  res.json({productCount:productNum,categoriesCount:categoriesNum,categoryReport:categoryData})
})



//@dec Fetch single product 
//@route Get /api/products/:id
//@acces Public 

const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.json(product)

    } else {
        res.status(200)
        throw new Error('Product not found')


    }

})

//@desc Delete a product
//@route DELETE /api/procuct/:id
//@accesss Private/Admin

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        await product.remove()
        res.json({ message: 'Product removed' })
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc Create a product
//@route POST /api/products/id
//@access Private/Admin

const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Badmintion ',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description'
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})



//@desc Update a product
//@route PUT /api/products/:id
//@access Private/Admin

const updateProduct = asyncHandler(async (req, res) => {
    const { name,
        price,
        description,
        image,
        brand,
        category,
        countInStock
    } = req.body
    const product = await Product.findById(req.params.id)
    if (product) {
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})




// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body
  
    const product = await Product.findById(req.params.id)
  console.log(product.id)
    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      )
  
      if (alreadyReviewed) {
        res.status(400)
        throw new Error('Product already reviewed')
      }
  
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      }
  
      product.reviews.push(review)
  
      console.log(product.reviews.length);
      product.numReview = product.reviews.length
      
  
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length
  
      await product.save()
      res.status(201).json({ message: 'Review added' })
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  })

  // @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(1)

  res.json(products)
})

export {
    getProduts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    createProductReview,
    getProductsReport,
    getTopProducts
}