import React,{useState,useEffect} from 'react'
import {Link, useNavigate,useSearchParams} from 'react-router-dom'
import {Form,Button,Row,Col, FormControl, Card} from 'react-bootstrap'
import {useDipatch,useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Message'
import FormContainer from '../components/FormContainer'
import {login} from '../actions/userActions'
import GoogleLogin from 'react-google-login';
import axios from 'axios'
import { googleLogin } from '../actions/userActions'

const LogginScreen = () => {
 
const [email,setEmail]=useState('')
const[password,setPassword]=useState('')
const dispatch = useDispatch()
const navigate =useNavigate()

const userLogin =useSelector(state=> state.userLogin)
const {loading,error,userInfo} =userLogin


const userGoogleLogin=useSelector(state=>state.userGoogleLogin)
const {loading: googleLoading,error : googleError,userInfo: googleUserInfo}=userGoogleLogin
// console.log(googleUserInfo);

 const [searchParams,setSearchParams]=useSearchParams('')
const submitHandler= (e)=>{
 e.preventDefault()
dispatch(login(email,password))
}

const redirect=searchParams.get('redirect') ||''

useEffect(()=>{
 
  if(userInfo || googleUserInfo){
    console.log(googleUserInfo);
    navigate(`/${redirect}`)
  }
},[userInfo,redirect,googleUserInfo])


const responseSuccessGoogle=(response)=>{

  

 const tokenId=response.tokenId
  

  dispatch(googleLogin(tokenId))
  

  
     
    
  //   axios({
  //     method:'POST',
  //     url :'/api/googlelogin',
  //     data:{tokenId:response.tokenId}
  //   }).then(response=>{
  // console.log("google login succuss",response);
  // navigate(`/${redirect}`)
  //   }
  //   )

  }
    

const responseErrorGoogle=(e)=>(response)=>{
 console.log(response);
}
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
        <GoogleLogin className='ms-3 mt-3'
    clientId="298138034880-2399j4kl1vjkdh7aebp4u6388ca9gccs.apps.googleusercontent.com"
    buttonText="Login with Google"
    onSuccess={responseSuccessGoogle}
    onFailure={responseErrorGoogle}
    cookiePolicy={'single_host_origin'}
  />
      </Card>
      <Row className='py-3'>
        <Col className='d-flex'>
     <h4> Create New account?   <span className='h4'>  <Link className='text-decoration-none' style={{color:'blue'}} to={ redirect? `/register?redirect=${redirect}`: '/register'}>  Register</Link> </span> </h4>  
     
        </Col>
      </Row>
      <main></main>
    </FormContainer>
  )
  
     
  
}

export default LogginScreen
