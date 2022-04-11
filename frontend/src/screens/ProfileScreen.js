import React, {  } from 'react'
import { useEffect,useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import {Button, Form, Container, Row, Col, Table  } from 'react-bootstrap'
import{LinkContainer} from 'react-router-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails,updateUserProfile } from '../actions/userActions'
import { useDispatch ,useSelector} from 'react-redux'
import { listMyOrders } from '../actions/orderActions'
import { Card } from 'react-bootstrap'

const ProfileScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } =userLogin

    const userUpdateProfile =useSelector(state=>state.userUpdateProfile)
    const {success}=userUpdateProfile


    const orderListMy = useSelector((state) => 

    state.orderMyList)
   
  const { loading: loadingOrders, error: errorOrders,orders:orders} = orderListMy

   

  useEffect(() => {
   
    if (!userInfo) {
      navigate('/login')
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'))
       dispatch(listMyOrders())
      } else {
        setName(user.name)
        setEmail(user.email)
     
      }
    }
  }, [dispatch, navigate, userInfo,user])


    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {

            setMessage("Passwords do not match")
        } else {
           dispatch(updateUserProfile({id: user._id,name,email,password}))
        }
    }

    return (
        <Container>

       
        <Row>
            <Col md={3 } >
                <h2>User Profile</h2>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {success && <Message variant='success'>Profile Updated</Message>}
                {loading && <Loader />}
    <Card className='p-5'> 
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
                    <Form.Group controlId='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Enter email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type='confirmPassword'
                            placeholder='confirmPassword'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='primary'>
                        Update
                    </Button>
                </Form>
                </Card>
            </Col>

     
                
              
                  <Col className=''>
                    <h2 className='text-center pt-3'>My Orders</h2>
                    {loadingOrders ? (
                      <Loader />
                    ) : errorOrders ? (
                      <Message variant='danger'>{errorOrders}</Message>
                    ) : (
                      <Card className='p-5'> 
                      <Table striped bordered hover responsive className='table-sm tableColor'>

                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            {/* <th>CANCELLED</th> */}
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                      

                        {orders.map((order) => (
                              <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt}</td>
                                <td>{order.totalPrice}</td>
                                <td>
                                  {order.isPaid ? (
                                    order.paidAt
                                  ) : (
                                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                                  )}
                              </td>
                              <td>
                                {order.isDelvered ? (
                                  order.deliveredAt
                                ) : (
                                  <i className='fas fa-times' style={{ color: 'red' }}></i>
                                )}
                              </td>
                              {/* <td>
                                {order.isCancelled ? (
                                  <>
                                  <i class="fa fa-check" aria-hidden="true" style={{ color: 'green' }}></i>
                                  {order.deliveredAt}
                                  </>
                                ) : (
                                  <i className='fas fa-times' style={{ color: 'red' }}></i>
                                )}
                              </td> */}
                              <td>
                                <LinkContainer to={`/order/${order._id}`}>
                                  <Button className='btn-sm' variant='light'>
                                    Details
                                  </Button>
                                </LinkContainer>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                      </Card>
                    )}
                  </Col>
               
           
        </Row>
        <main></main>
        </Container>
    )
}

export default ProfileScreen