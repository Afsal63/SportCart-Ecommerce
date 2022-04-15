import React, { useEffect, useState } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Checkout from "../components/Checkout";
import { Link } from "react-router-dom";
// import Header from '../components/Header'
import { createOrder } from "../actions/orderActions";
import { useNavigate } from "react-router-dom";
import { ORDER_CANCEL_RESET } from "../constants/orderConstants";
import { listCoopens, coopenApplay } from "../actions/offerAction";

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();

  const coopenList = useSelector((state) => state.coopenList);
  const { coopensList } = coopenList;

  const applyCoopen = useSelector((state) => state.applyCoopen);
  const { coopenAppleys } = applyCoopen;
  console.log(coopenAppleys.coopenDiscount);

  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const coopenHandler = (id) => {
    dispatch(coopenApplay(id));
  };

  useEffect(() => {
    //  if (!coopenAppleys.isApplyed) {
    //    dispatch(coopenApplay())
    //  }
  }, [dispatch]);

  //Calculate Prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce(
      (acc, item) =>
        acc +
        (item.discountPrice
          ? item.price - item.discountPrice * 0.01 * item.price
          : item.price) *
          item.qty,
      0
    )
  );

  cart.shippingPrice = addDecimals(cart.itemPrice > 100 ? 0 : 50);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));

  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice) -
   (Number ( coopenAppleys.coopenDiscount==undefined?coopenAppleys.coopenDiscount=0:coopenAppleys.coopenDiscount )  )
   
  ).toFixed(2);
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    dispatch(listCoopens());
    if (success) {
      navigate(`/order/${order._id}`);
    }
  }, [navigate, success]);
  const PlaceOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };
  return (
    <>
      <Checkout step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <Card className="p-5">
              <ListGroup.Item>
                <h2>Shipping</h2>
                <p>
                  <strong>Address:</strong>
                  {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
                  {cart.shippingAddress.postalCode},{" "}
                  {cart.shippingAddress.country}
                </p>
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Payment Method</h2>
                <strong>Method</strong>
                {cart.paymentMethod}
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Order Items</h2>
                {cart.cartItems.length === 0 ? (
                  <Message>Your cart is Empty</Message>
                ) : (
                  <ListGroup variant="flush">
                    {cart.cartItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>
                            <Link
                              className="text-decoration-none"
                              to={`/product/${item.product}`}
                            >
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} x
                            {item.discountPrice
                              ? item.price -
                                item.discountPrice * 0.01 * item.price
                              : item.price}
                            = ₹{" "}
                            {item.qty *
                              (item.discountPrice
                                ? item.price -
                                  item.discountPrice * 0.01 * item.price
                                : item.price)}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroup.Item>
            </Card>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summery</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>₹ {cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>₹ {cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Taxes</Col>
                  <Col>₹ {cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              {coopenAppleys.isApplyed && (
                <>
                  <ListGroup.Item>
                    <Row>
                      <Col>Coupon discount</Col>
                      <Col>₹ {coopenAppleys.coopenDiscount}</Col>
                    </Row>
                  </ListGroup.Item>
                </>
              )}

              <ListGroup.Item>
                <Row>
                  <Col>Totel </Col>
                  <Col>₹{cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
              <Row></Row>
              {!coopenAppleys.isApplyed ? (
                <>
                  <h4 className="ms-3">Available coopens</h4>
                  {coopensList.map((coopen) => (
                    <Row>
                      <Col className="m-auto">{coopen.coopenName}</Col>

                      <Col className="m-auto">{coopen.coopenDiscount}</Col>
                      <Col
                        onClick={(e) => coopenHandler(coopen._id)}
                        style={{ color: "green" }}
                        className="btn "
                      >
                        {" "}
                        Apply
                      </Col>
                    </Row>
                  ))}
                </>
              ) : (
                <Message> Coopen applied success fully</Message>
              )}

              <ListGroup.Item>
                <ListGroup.Item></ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItem === 0}
                  onClick={PlaceOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <main></main>
    </>
  );
};

export default PlaceOrderScreen;
