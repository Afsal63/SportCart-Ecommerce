import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LogginScreen from "./screens/LogginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import Header from "./components/Header";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import PriductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import CreateOffer from "./screens/CreateOffer";
import HomeScreen from "./screens/HomeScreen";
import SalesReportScreen from "./screens/SalesReportScreen";
import Footer from "./components/Footer";
import DashBoard from "./screens/DashBoard";
import WishlistScreen from "./screens/WishlistScreen";
const App = () => {
  return (

    <>
      <Router>
   


  <Header/>
        <Routes>
         <Route path='*' element={<HomeScreen coursal={true} />}></Route>
          <Route path='/order/:id' element={<OrderScreen />}></Route>
          <Route path='/login' element={<LogginScreen />}></Route>
          <Route path='/placeorder' element={<PlaceOrderScreen />}></Route>
          <Route path='/payment' element={<PaymentScreen />}></Route>
          <Route path='/register' element={<RegisterScreen/>}></Route>
          <Route path='/product/:id' element={<ProductScreen />}></Route>
          <Route path="/shipping" element={<ShippingScreen/>}></Route>
          <Route path="/profile" element={<ProfileScreen/>}></Route>
          <Route path='/cart' element={<CartScreen />}></Route>
          <Route path='/cart/:id' element={<CartScreen />}></Route>
          <Route path='/admin/userlist' element={<UserListScreen />}></Route>
          <Route path='/admin/productlist' element={<PriductListScreen />}></Route>
          <Route path='/admin/productlist/:pageNumber' element={<PriductListScreen />}></Route>
          <Route path='/admin/offers' element={< CreateOffer/>}></Route>
          <Route path='/admin/dashboard' element={<DashBoard/>}></Route>
          <Route path='/admin/wishlist' element={<WishlistScreen/>}></Route>
   
          
          <Route path='/admin/orderlist' element={<OrderListScreen />}></Route>
          <Route path='/admin/user/:id/edit' element={<UserEditScreen />}></Route>
          <Route path='/admin/product/:id/edit' element={<ProductEditScreen />}></Route>
          <Route path='/admin/salesreport' element={<SalesReportScreen/>}></Route>
          <Route path='/page/:pageNumber' element={<HomeScreen />}></Route>
          <Route path='/search/:keyword/page/:pageNumber' element={<HomeScreen />}></Route>
         
          <Route path='/' element={<HomeScreen />}></Route>
          <Route path='/search/:keyword' element={<HomeScreen />}></Route>
        </Routes>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
