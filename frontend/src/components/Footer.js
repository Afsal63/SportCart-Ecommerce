import React from 'react'
import { Container, Row,Col  } from "react-bootstrap";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
   <footer  className='footer'>

   <MDBFooter color="blue" className="font-small footer bg-dark mt-4 ">
      
        
     
            
            <p className='mt-3 text-white text-center pt-3'>
              This is the place for the premium badmintion racket you find here . we are serving the premium badmintion racket.
            </p>
           <div className="footer-copyright  py-3">
          <div className='mx-auto text-white' style={{width : '30%'}}>
          &copy; {new Date().getFullYear()}  <a className=' text-white text-decoration-none'> Copyright: SportsCart.com </a> <br/>
        <a  className='text-white text-decoration-none' target="_blank" href='https://afsal63.github.io/personalwebsite/' > Designed by Afsal</a>
          </div>
      </div>
    </MDBFooter>
 
   </footer>
  )
}

export default Footer