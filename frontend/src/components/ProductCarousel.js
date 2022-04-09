import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image,Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productAction'

const ProductCarousel = () => {
    const dispatch = useDispatch()

    const productTopRated = useSelector((state) => state.productTopRated)
    const { loading, error, products } = productTopRated

    useEffect(() => {
        dispatch(listTopProducts())
    }, [dispatch])

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <Container className='p-4'>
            <Carousel indicators={false} controls={false} pause='hover' className='rounded car1' >
                {products.map((product) => (
     

                    <Carousel.Item key={product._id}>
                                 
                          <Link to={`/product/${product._id}`}>
                            <Image src={product.image} alt={product.name} fluid rounded className='rounded pt-4'/>
                            
                        </Link>
                            
                        <Carousel.Caption className='carousel-caption '>
                                <h2>
                                    {product.name} ₹ {product.price}
                                </h2>
                            </Carousel.Caption>
                    </Carousel.Item>
                    
                ))}
            </Carousel>
        </Container>
    )
}

export default ProductCarousel