import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  Container } from "react-bootstrap";
import { Card, Button, Row } from "react-bootstrap";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import { removeFromWishlist } from "../actions/cartAction";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const WishlistScreen = () => {

  const dispach=useDispatch()
  const navigate=useNavigate()
  const [qty ,setQty]=useState(1)

  const removeWishlistHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(result.isConfirmed);

        dispach(removeFromWishlist(id))
      }
    });
  };

  
   
  
  

    const addToCartHandler=(id)=>{
      console.log(id);
      navigate(`/cart/${id}?qty=${qty}`);
    }
 
  const wishlist = useSelector((state) => state.wishlist);
  const { wishlistItem } = wishlist;
  console.log(wishlistItem);

  

  return (
    <div>
      <Container>
        {wishlistItem.length === 0 ? (
          <Message>
            You cart is Empty <Link to="/">Go back</Link>
          </Message>
        ) : (
          <div>
            <Row>
              {wishlistItem.map((item,index) => (
                <Card className="me-3 mt-4" key={index} style={{ width: "18rem" }}>
                  <i  onClick={()=>removeWishlistHandler(item.product)} style={{color:'red'}} className="fa fa-trash mt-2" aria-hidden="true"></i>
                  <Link to={`/product/${item.product}`}>
                  <Card.Img variant="top" src={item.image} />
                  </Link>
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                      ₹{" "}
                      {item.discountPrice > 0
                        ? item.price -
                          item.discountPrice * 0.01 * item.price +
                          `(${item.discountPrice}% off)`
                        : item.price}
                    </Card.Text>
                    <Button onClick={(e)=>addToCartHandler(item.product)} variant="primary">Add to cart</Button>
                  </Card.Body>
                </Card>
              ))}
            </Row>
          </div>
        )}
      </Container>
     
<main></main>
    </div>
  );
};

export default WishlistScreen;
