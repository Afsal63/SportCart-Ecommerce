import React from "react";
import "../index.css";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToWishlist } from "../actions/cartAction";
import Swal from 'sweetalert2'
const Product = ({ product }) => {
const dispatch =useDispatch()
  const navigate = useNavigate();


  const wishlistHandler=(id)=>{
    Swal.fire({
      position: 'top-center',
      icon: 'success',
      title: 'Product added to the wishlist successfully',
      showConfirmButton: false,
      timer: 1500
    })
      dispatch(addToWishlist(id))
 
  }

  return (
    <div>
       <Card className="rounded my-3 p-3 productCard mb-3">
         <i onClick={(e)=>wishlistHandler(product._id)} style={{color:'black'}} className="fa fa-heart text-end"></i>
            <Card.Text as='h4' className='productText' style={{color:'green'}}>
                {product.discountPrice > 0 ? <>{product.discountPrice}% OFF</>:null}
                </Card.Text>

                
                
          <Link to={`/product/${product._id}`}>  <Card.Img src={product.image} variant='top' /> </Link>  
                
            <Card.Body>
              <Card.Title  as='div'><h4 className="text-bold">{product.name}</h4></Card.Title>
              <Card.Text as='div'>
                   <Rating value={product.rating} text={`${product.numReview} reviews`}/>
                </Card.Text>
              <Card.Text as='h5'>
                {product.discountPrice > 0 ? <strike>(${product.price})</strike>:null}
                </Card.Text>
              <Card.Text as='h4'>
                {product.discountPrice > 0 
                ? <>₹ {Math.floor(product.price - (product.price * (product.discountPrice/100)))}</>
                : <>₹ {product.price}</>}
                
              </Card.Text>
            </Card.Body>
          </Card>
    </div>
  );
};

export default Product;
