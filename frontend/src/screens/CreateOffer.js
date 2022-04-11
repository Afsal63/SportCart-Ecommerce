import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAlert } from "react-alert";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  Button,
  Form,
  Container,
  Row,
  Col,
  Table,
  Tab,
  Nav,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { addCoopen, addOffer, deleteOffer, listOffers } from "../actions/offerAction";
import { Card } from "react-bootstrap";
import { OFFER_ADD_RESET } from "../constants/offerConstants";

const CreateOffer = () => {
  //  const alert=useAlert()
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [coopenName, setCoopenName] = useState("");
  const [discount, setDiscount] = useState(0);
  const [coopenDiscount, setCoopenDiscount] = useState(0);
  const [category, setCategory] = useState("Badmintion ");

  // const categoryList = useSelector((state) => state.categoryList)
  // const { categorieslist } = categoryList

  const alert = async (e) => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Offer added success fully",
      showConfirmButton: false,
      timer: 1500,
    });

    dispatch({ type: OFFER_ADD_RESET });
  };
  const offerList = useSelector((state) => state.offerList);
  const { offerslist } = offerList;

  const addNewOffer = useSelector((state) => state.addNewOffer);
  const { success } = addNewOffer;

  const offerDelete = useSelector((state) => state.offerDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = offerDelete;

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(addOffer({ name, discount, category }));
    navigate("/admin/offers");
    setName("");
    setDiscount(0);
    setCategory("");
  };

  const coopenSubmitHandler = async (e) => {
    e.preventDefault();
    dispatch(addCoopen({ coopenName, coopenDiscount, category }));
    // navigate("/admin/offers");
    setCoopenName("");
    setCoopenDiscount(0);
    setCategory("");
  };

  const deleteHandler = async (offerId) => {
    dispatch(deleteOffer(offerId));
    navigate("/admin/offers");
  };

  useEffect(() => {
    dispatch(listOffers());
  }, [navigate, dispatch, success, successDelete, offerDelete]);

  return (
    <>
      <Container>
        <Link to="/" className="btn btn-dark my-3">
          Go Back
        </Link>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={3}>
              <Nav
                variant="pills"
                className="flex-column"
                style={{ cursor: "pointer" }}
              >
                <Card className="p-5">
                  <Nav.Item>
                    <Nav.Link eventKey="first" className="font-weight-bold">
                      Offers
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second" className="font-weight-bold">
                      Add new offer
                    </Nav.Link>
                  </Nav.Item>
                </Card>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <Row>
                    <Col md={9} className="m-auto">
                      <h1>Offers</h1>

                      {/* {loading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>) : ( */}
                      <Card>
                        <Table
                          striped
                          bordered
                          hover
                          responsive
                          className="table-sm tableColor p-5"
                        >
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Offers</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {offerslist.map((x) => (
                              <tr>
                                <td>{x.name}</td>
                                <td>{x.discount}</td>
                                <td>
                                  <Button
                                    size="sm"
                                    className="sm"
                                    onClick={() => deleteHandler(x._id)}
                                  >
                                    <i
                                      className="fas fa-times"
                                      style={{ color: "red" }}
                                    ></i>
                                    Delete
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </Card>
                    </Col>
                  </Row>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <Row>
                    <Col md={9} className="m-auto">
                      <h1>Add new Offer</h1>
                      {/* {success && <Message variant='success'>Offer Updated</Message>} */}
                      {/* {success && alert.show('Offer added')} */}
                      <Card className="p-5">
                        <Form onSubmit={submitHandler}>
                          <Form.Group controlId="name">
                            <Form.Label>Name of the offer</Form.Label>
                            <Form.Control
                              type="name"
                              placeholder="Enter name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                          </Form.Group>
                          <Form.Group controlId="discountPercentage">
                            <Form.Label>Discount</Form.Label>
                            <Form.Control
                              type="name"
                              placeholder="Enter name"
                              value={discount}
                              onChange={(e) => setDiscount(e.target.value)}
                            ></Form.Control>
                          </Form.Group>

                          <Row className="pt-2 ml-auto text-center">
                            <Button
                              type="submit"
                              variant="primary"
                              className="btn-block test"
                              onClick={(e) => alert()}
                            >
                              Update
                            </Button>
                          </Row>
                        </Form>
                      </Card>

                      <h1>Add new Coopen</h1>
                      {/* {success && <Message variant='success'>Offer Updated</Message>} */}
                      {/* {success && alert.show('Offer added')} */}
                      <Card className="p-5">
                        <Form onSubmit={coopenSubmitHandler}>
                          <Form.Group controlId="name">
                            <Form.Label>Name of the coopen</Form.Label>
                            <Form.Control
                              type="name"
                              placeholder="Enter name"
                              value={coopenName}
                              onChange={(e) => setCoopenName(e.target.value)}
                            ></Form.Control>
                          </Form.Group>
                          <Form.Group controlId="discountPercentage">
                            <Form.Label>Discount</Form.Label>
                            <Form.Control
                              type="name"
                              placeholder="Enter name"
                              value={coopenDiscount}
                              onChange={(e) =>
                                setCoopenDiscount(e.target.value)
                              }
                            ></Form.Control>
                          </Form.Group>

                         

                          <Row className="pt-2 ml-auto text-center">
                            <Button
                              type="submit"
                              variant="primary"
                              className="btn-block test"
                              onClick={(e) => alert()}
                            >
                              Update
                            </Button>
                          </Row>
                        </Form>
                      </Card>
                    </Col>
                  </Row>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>

        {/* <Row className='m-auto'>
        <Col md={4} className='m-auto'>
          </Col>
          <Col md={4} className='m-auto'>
            
          </Col>
        </Row> */}
      </Container>
      <main></main>
    </>
  );
};

export default CreateOffer;
