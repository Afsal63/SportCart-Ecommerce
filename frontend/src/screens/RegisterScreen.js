import React, { useState, useEffect } from 'react'
import { Link ,useNavigate,useSearchParams} from 'react-router-dom'

import { Form, Button, Row, Col, FormGroup, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'

const RegisterScreen = () => {
    const navigate =useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
    const [searchParams,setSearchParams]=useSearchParams('')
    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister
    const redirect = searchParams.get('redirect') || ''
    useEffect(() => {
        if (userInfo) {
            navigate(`/${redirect}`)
        }
    }, [userInfo, redirect,])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !==confirmPassword){
            setMessage('Password do not match')
        }else{

            dispatch(register(name,email,password))
        }
    }
    return (
        <FormContainer>
            <h1>Sighn Up</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Enter your Name</Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='Enter Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Enter your Email</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                <FormGroup controlId='passoword'>
                    <Form.Label>Enter Password </Form.Label>
                    <FormControl
                        type='passoword'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}>

                    </FormControl>

                </FormGroup>
                <FormGroup controlId='confirmPassoword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <FormControl
                        type='passoword'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}>

                    </FormControl>

                </FormGroup>
        <Button type='submit' variant='primary'>
            Register
        </Button>
            </Form>
            <Row className='py-3 '>
                <Col>
                Have an Account {' '}
                <Link to={redirect ? `/login?redirect=${redirect}`:'/login'}>
                    Login
                </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen