import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Checkout";
import { PayPalButton } from "react-paypal-button-v2";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
  OrderCancel,
  shippingOrder,
} from "../actions/orderActions";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
  ORDER_SHIPPING_RESET,
} from "../constants/orderConstants";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ORDER_CANCEL_RESET, ORDER_PAY_SUCCESS} from "../constants/orderConstants";
import Swal from "sweetalert2";

function loadScript(src) {
  return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = src
      script.onload = () => {
          resolve(true)
      }
      script.onerror = () => {
          resolve(false)
      }
      document.body.appendChild(script)
  })
}


const OrderScreen = () => {
  const [sdkReady, setSdkReady] = useState(false);
  const params = useParams();
  const orderId = params.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const orderShipped = useSelector((state) => state.orderShipped);
  const { loading: loadingShipped, success: successShipped } = orderShipped;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderCancel = useSelector((state) => state.orderCancel);
  const { loading: cancelLoading, success: successCancel } = orderCancel;
  if (!loading) {
    //Calculate Prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }
  




 


async function showRazorpay() {
  const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
  

  if (!res) {
      alert('Razorpay SDK failed to load. Are you online?')
      return
  }

  const { data } = await axios.post(`/razorpay/${orderId}`)
  

  const options = {
      key: 'rzp_test_XPEMuTOqO9MCEm',
      currency: data.currency,
      amount: data.amount.toString(),
      order_id: data.id,
      name: 'SportsCart',
      description: 'Make the payment to complete the process',
      image: '',

      handler: async (response) => {
        
          await axios.post(`/razorpay/success/${orderId}`)
          dispatch({ type: ORDER_PAY_SUCCESS })
          // alert(response.razorpay_payment_id);
          // alert(response.razorpay_order_id);
          // alert(response.razorpay_signature);

          Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Your payment successfully completed',
            showConfirmButton: false,
            timer: 1500
          })
      },
      prefill: {
          name: 'afsal',
          email: 'afsal@gmail.com',
          phone_number: '8136833754',
      },
  }
  const paymentObject = new window.Razorpay(options)
  console.log(paymentObject);
  paymentObject.open()
  // dispatch({
  //   type: 'ORDER_DELIVER_SUCCESS',
  // })
}

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (
      !order ||
      successPay ||
      successDeliver ||
      successShipped ||
      successCancel ||
      order._id !== orderId
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch({ type: ORDER_CANCEL_RESET });
      dispatch({ type: ORDER_SHIPPING_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [
    dispatch,
    orderId,
    successPay,
    order,
    successDeliver,
    navigate,
    successCancel,
    successShipped,
  ]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
    console.log(paymentResult);
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };
  const shippingHandler = () => {
    dispatch(shippingOrder(order));
  };

  const cancelHandler = () => {
    Swal.fire({
      title: "Are you sure?",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(OrderCancel(order));
        // navigate("/");
      }
    });
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1> Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                {" "}
                <strong>Name:</strong> {order.user.name}
              </p>
              <p>
                {" "}
                <strong>Email:</strong>{" "}
                <a
                  className="text-decoration-none"
                  href={`mailto:${order.user.email}`}
                >
                  {order.user.email}
                </a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.aaddress},{order.shippingAddress.city}{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDelvered ? (
                <Message variant="success">
                  Delivered {order.deliveredAt.substring(0, 10)}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}

              {order.isShipped ? (
                <Message variant="success">Shipped {order.deliveredAt}</Message>
              ) : (
                <Message variant="danger">Not Shipped</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on{order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
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
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        {/* <Col md={4}>
                          {item.qty} x ${order.totalrice}
                           = ${item.qty * item.price}
                         
                        </Col> */}
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Payable amount</h2>
              </ListGroup.Item>

              {/* NOT WORKING */}

              {/* <ListGroup.Item> 
                 <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row> 
               </ListGroup.Item> 
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>

                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item> 
               <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>  */}

              <ListGroup.Item>
                <Row>
                  <Col> Grand Total</Col>
                  <Col>₹{order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && !order.isCancelled && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
              {!order.isPaid &&
                !order.isCancelled &&
                order.paymentMethod === "RazorPay" && (
                  <ListGroup.Item>
                    <Button
                      onClick={showRazorpay}
                      className="btn btn-block round"
                    >
                      Pay with RazorPay
                    </Button>
                  </ListGroup.Item>
                )}

              {!order.isCancelled ? (
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn btn-danger btn-block"
                    onClick={cancelHandler}
                  >
                    Cancel the Order
                  </Button>
                </ListGroup.Item>
              ) : (
                <ListGroup.Item>
                  <Button type="button" className="btn btn-warning btn-block">
                    Order Cancelled
                  </Button>
                </ListGroup.Item>
              )}

              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelvered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliverHandler}
                    >
                      Mark as Delivered
                    </Button>
                  </ListGroup.Item>
                )}

              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelvered &&
                !order.isShipped && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={shippingHandler}
                    >
                      Mark as Shipped
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
