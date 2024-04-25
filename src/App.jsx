import './App.css';
import { Routes, BrowserRouter, Route } from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootswatch/dist/lux/bootstrap.min.css";
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOder/PlaceOrder';
import { useState } from 'react';
import Login from './components/Login/Login';


function App() {

  const [showLogin,setShowLogin]=useState(false) 

  return (
    <>
    {showLogin?<Login setShowLogin={setShowLogin}/>:<></>}
    <div className="App">
      <NavBar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<PlaceOrder/>}/>
      </Routes>
    </div>
    </>
  );
}

export default App;