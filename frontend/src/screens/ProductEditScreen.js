import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProductDetails, updateProduct } from '../actions/productAction'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import CropImage from '../components/CropImage'



const ProductEditScreen = () => {
    const params = useParams()
    const productId = params.id;
    const navigate = useNavigate();
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)
   
    //Have to delete after cleaning-----------------------
   
    const [images, setImages] = useState([])
    // const [showCropper, setShowCropper] = useState(false)
    const [rating, setRating] = useState('')
    const [cropImage, setCropImage] = useState(null)
    const [editedImage, setEditedImage] = useState(null)
    // //-------------------------------------------------

    const dispatch = useDispatch()
    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetails
    const productUpdate = useSelector((state) => state.productUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate
    
    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            navigate('/admin/productlist')
        } else {
            if (!product.name || product._id !== productId) {
                dispatch(listProductDetails(productId))
                // dispatch(listCategories()) noted
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
                // setRating(product.rating)
                // setNumReviews(product.numReviews)
            }
        }
    }, [dispatch, navigate, productId, product, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()

        console.log('in submit');
         dispatch(updateProduct({
           _id: productId,
           name,
           price,
           image: editedImage,
           brand,
           category,
           description,
           countInStock,
         }))
        // const formData = new FormData()
        // formData.set('name', name)
        // formData.set('price', price)
        // // formData.set('discountPrice', discountPrice)
        // formData.set('countInStock', countInStock)
        // formData.set('image', editedImage)
        // formData.set('brand', brand)
        // formData.set('rating', rating)
        // formData.set('category', category)
        // // formData.set('subCategory', subCategory)
        // formData.set('description', description)
        // formData.set('numReviews', numReviews)

        // dispatch(updateProduct(formData, productId))
    }

    const uploadFileHandler = async (image) => {
        // const file = e.target.files[0]
        console.log('in file upload');
        const formData = new FormData()
        console.log(image.originalname);
        formData.append('image', image, image.originalname)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }

            const { data } = await axios.post('/api/upload', formData, config)

            setEditedImage(data)
            setUploading(false)
        } catch (error) {
            console.log(error);
            setUploading(false)
        }
    }
    const multiFileHandler = async (e) => {
        const files = Array.from(e.target.files)
        setImages([])
        files.forEach((file) => {
            const reader = new FileReader()

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImages((oldArray) => [...oldArray, reader.result])
                }
            }
            reader.readAsDataURL(file)
        })
    }

    return (
        <>
            <Container>
                <Link to='/admin/productlist' className='btn btn-light my-3'>
                    Go Back
                </Link>
                <Container>
                    <Row>
                        <Col md={6} className='m-auto'>
                            <h1>Edit Product</h1>
                            {loadingUpdate && <Loader />}
                            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                            {loading ? (
                                <Loader />
                            ) : error ? (
                                <Message variant='danger'>{error}</Message>
                            ) : (
                                <Form onSubmit={submitHandler}>
                                    <Form.Group controlId='name'>
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type='name'
                                            placeholder='Enter name'
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='price'>
                                        <Form.Label>price</Form.Label>
                                        <Form.Control
                                            type='number'
                                            placeholder='Enter price'
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>

                                 
                                    <Form.Group controlId='image'>
                                        <Form.Label>Image</Form.Label>
                                        <Form.Control
                                            type="file"
                                            name="imageOne"
                                            onChange={(e) => {
                                                setCropImage(e.target.files[0])
                                            }}
                                            accept=".jpg,.jpeg,.png,"
                                        />
                                        {uploading && <Loader />}
                                    </Form.Group>

                                    


                                    <Form.Group controlId='brand'>
                                        <Form.Label>Brand</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Enter brand '
                                            value={brand}
                                            onChange={(e) => setBrand(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='countInStock'>
                                        <Form.Label>Count In Stock</Form.Label>
                                        <Form.Control
                                            type='number'
                                            placeholder='Enter countInStock'
                                            value={countInStock}
                                            onChange={(e) => setCountInStock(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>

                                    {/* <Form.Group controlId='category'>
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      as='text'
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                    </Form.Control>
                  </Form.Group> */}

                                    <Form.Group controlId='description'>
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Enter description '
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>

                                    <Button type='submit' variant='primary'>
                                        Update
                                    </Button>

                                </Form>
                            )}
                            {cropImage && (
                                <CropImage
                                    src={cropImage}
                                    imageCallback={(image) => {
                                        console.log(image);
                                        uploadFileHandler(image)
                                        setCropImage(null) // for closing cropper.
                                    }}
                                    closeHander={() => {
                                        setCropImage(null)
                                    }}
                                />
                            )}
                        </Col>
                    </Row>
                </Container>

            </Container>
        </>
    )
}






export default ProductEditScreen