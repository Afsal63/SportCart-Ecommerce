import React from "react";
import "../index.css";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToWishlist } from "../actions/cartAction";

const Product = ({ product }) => {
const dispatch =useDispatch()
  const navigate = useNavigate();


  const wishlistHandler=(id)=>{
  dispatch(addToWishlist(id))
 
  }

  return (
    <div>
       <Card className="rounded my-3 p-3 productCard mb-3">
         <i onClick={(e)=>wishlistHandler(product._id)} style={{color:'blue'}} className="fa fa-heart text-end"></i>
            <Card.Text as='h4' className='productText' style={{color:'green'}}>
                {product.discountPrice > 0 ? <>{product.discountPrice}% OFF</>:null}
                </Card.Text>

                
                
          <Link to={`/product/${product._id}`}>  <Card.Img src={product.image} variant='top' /> </Link>  
                
            <Card.Body>
              <Card.Title as='div'><strong>{product.name}</strong></Card.Title>
              <Card.Text as='div'>
                   <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
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
