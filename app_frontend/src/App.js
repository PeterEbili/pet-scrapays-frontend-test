import React from 'react'
import "./index.css"
import Home from './routes/Home';
import Login from './routes/login/Login';
import Register from './routes/register/Register';
import ForgotPassword from './routes/forgotPassword/ForgotPassword';
import ResetPassword from './routes/forgotPassword/ResetPassword';
import {  Routes, Route } from 'react-router-dom';

import { useContext } from "react";
import { Context } from "./context/Context";

function App() {
 
  const { user } = useContext(Context);

  return (
    
     <div>   
      <>   
        <Routes>       

          <Route path="/" element={user ? <Home/> :<Login/>}/>
          <Route path="/login" element={user ? <Home/> :<Login/>}/>
          <Route path="/register" element={user ? <Home/> :<Register/>}/>
          <Route path="/forgotPassword" element={<ForgotPassword/>}/> 
          <Route path='/resetPassword/:_id'  element={<ResetPassword/>}/> 
          
        </Routes>
      </>
    </div> 
   
  );
}

export default App;
