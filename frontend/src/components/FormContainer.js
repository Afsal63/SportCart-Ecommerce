import React from 'react'
import { Container,Row, Col } from 'react-bootstrap'
// import Header from './Header'

const FormContainer = ({children}) => {
  return (
    <>
  {/* <Header/> */}
    <Container>
<Row className='justify-content-md-center'>
    <Col xs={12} md={6}>
    {children}
    </Col>
   
</Row>
    </Container>
    </>
  )
}

export default FormContainer