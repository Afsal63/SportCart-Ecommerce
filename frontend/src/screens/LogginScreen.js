import React,{useState,useEffect} from 'react'
import {Link, useNavigate,useSearchParams} from 'react-router-dom'
import {Form,Button,Row,Col, FormControl, Card} from 'react-bootstrap'
import {useDipatch,useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Message'
import FormContainer from '../components/FormContainer'
import {login} from '../actions/userActions'


const LogginScreen = () => {
const [email,setEmail]=useState('')
const[password,setPassword]=useState('')
const dispatch = useDispatch()
const navigate =useNavigate()
const userLogin =useSelector(state=> state.userLogin)
const {loading,error,userInfo} =userLogin
 const [searchParams,setSearchParams]=useSearchParams('')
const submitHandler= (e)=>{
 e.preventDefault()
dispatch(login(email,password))
}

const redirect=searchParams.get('redirect') ||''

useEffect(()=>{
  if(userInfo){
    navigate(`/${redirect}`)
  }
},[userInfo,redirect,])
  return (
    <FormContainer>
     
      <h1>Sign In</h1>
      {error &&<Message variant='danger'>{error}</Message>}
      {loading &&<Loader/>}
      <Card className='p-5'> 
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='emial'>
          <Form.Label>Email Address</Form.Label>
          <FormControl tpe='email' placeholer='Enter email' value={email} onChange={(e)=> setEmail(e.target.value)}></FormControl>
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Enter password</Form.Label>
          <FormControl tpe='email' placeholer='Enter password' value={password} onChange={(e)=> setPassword(e.target.value)}></FormControl>
        </Form.Group>
        <Button className='mt-3' type='submit' variant='dark'>
          Sign In
        </Button>
      </Form>
      </Card>
      <Row className='py-3'>
        <Col className='d-flex'>
     <h4> Create New account?   <span className='h4'>  <Link className='text-decoration-none' style={{color:'blue'}} to={ redirect? `/register?redirect=${redirect}`: '/register'}>  Register</Link> </span> </h4>  
     
        </Col>
      </Row>
    </FormContainer>
  )
  
     
  
}

export default LogginScreen
