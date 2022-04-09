import React from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Checkout from '../components/Checkout'
import { savePaymentMethod } from '../actions/cartAction'
import { useState } from 'react'

import { useNavigate } from 'react-router-dom'



const PaymentScreen = () => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    const dispatch =useDispatch()
    const navigete=useNavigate()
    if (!shippingAddress) {
        navigete('/shipping')
    }
    const [paymentMethod, setPaymentMethod] = useState('RazorPay')
    
    const submitHandler = ((e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigete('/placeorder')
    })
   
    return (
        <FormContainer>
           <Checkout step1 step2 step3/>
        
           
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                <Form.Label as='legend' Select Method></Form.Label>
                <Col> 
                    <Form.Check type='radio' label='Paypal or Credit Card' id='PayPal' name='paymentMethod' value='PayPal' onChange={(e)=>setPaymentMethod(e.target.value)}></Form.Check>
                    <Form.Check type='radio' label='RazorPay' id='RazorPay' name='paymentMethod' value='RazorPay' checked onChange={(e)=>setPaymentMethod(e.target.value)}></Form.Check>
                    <Form.Check type='radio' label='Cash On Delivery' id='cod' name='paymentMethod' value='COD' onChange={(e)=>setPaymentMethod(e.target.value)}></Form.Check> 
                    </Col>    
                </Form.Group>
                <Button className='mt-3' type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen