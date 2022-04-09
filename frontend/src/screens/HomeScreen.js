import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Container } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Link, useParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import { listProducts } from "../actions/productAction";
import { ORDER_CANCEL_RESET } from "../constants/orderConstants";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import { Slider } from "@material-ui/core";
import { useState } from "react";
import axios from "axios";
import ProductCarousel from "../components/ProductCarousel";
const HomeScreen = () => {
  const params = useParams();
  const keyword = params.keyword;
  const [newPrice, setNewPrice] = useState(0, 500);
  const pageNumber = params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
    dispatch({ type: ORDER_CANCEL_RESET });
    dispatch({ type: ORDER_CREATE_RESET });
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
     {!keyword ? (
      <ProductCarousel />
    ) : (
      <Link to='/' className='btn btn-light'>
        Go Back
      </Link>
    )}
      <Container>
        {products.length !== 0 ? (
          <h1>Latest Products</h1>
        ) : (
          <div className="d-flex ">
            {" "}
            <h1> Search result : </h1>{" "}
            <h1 style={{ color: "blue" }}> {keyword} </h1>{" "}
          </div>
        )}

        <Col>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              {products.length !== 0 ? (
                <>
                  <Col lg={3}></Col>
                  <Row>
                    {products.map((product) => (
                      <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                      </Col>
                    ))}
                  </Row>
                  <Paginate
                    pages={pages}
                    page={page}
                    keyword={keyword ? keyword : ""}
                  />
                </>
              ) : (
                <div className="text-center m-auto">
                  {" "}
                  <h1 className="text-danger ">Product not found</h1>
                  <Link className="btn btn-dark" to="/">
                    {" "}
                    GO BACK{" "}
                  </Link>
                </div>
              )}
            </>
          )}
        </Col>
      </Container>
    </>
  );
};
export default HomeScreen;
