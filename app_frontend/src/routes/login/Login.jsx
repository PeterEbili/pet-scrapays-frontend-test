

import "./login.css";
import Topbar from "../../components/topbar/Topbar";
import { Link } from "react-router-dom";

import Axios from "axios";
import { useContext, useRef } from "react";
import { Context } from "../../context/Context";
import { useNavigate } from 'react-router-dom';

import  { useState} from 'react'
export default function Login() {

  const emailRef = useRef();
  const passwordRef = useRef();
  const { dispatch } = useContext(Context);
  const navigate = useNavigate();

  const [loginStatus, setLoginStatus] = useState("");
  const [status, setStatus] = useState("");

  const myFunction = ()=>{
    
    var x = document.getElementById("psw");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await  Axios.post("http://localhost:5000/login", {
    
        email: emailRef.current.value,
        password: passwordRef.current.value,
        headers: {'Content-Type': 'application/json'}
      });

        setLoginStatus(res.data.message)
        setStatus(res.data.status)
     
        if(res.data.status === 'SUCCESS'){
          dispatch({ type: "LOGIN_SUCCESS", payload: res.data.data[0] });
        }else {
          navigate('/login') 
        }

    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };
  return (
    <>
      <Topbar/>
      <div className="login">
      <p style={{color:'red'}}>{loginStatus}</p>
      <p>Action: {status}</p>

        <span className="loginTitle">Login</span>

        <form className="loginForm" onSubmit={handleSubmit}>
          <label>Email</label>
          <input className="loginInput" type="text" placeholder="Enter your email..." 
            ref={emailRef}
          />
          <label>Password</label>
          <input className="loginInput" id="psw" type="password" placeholder="Enter your password..." 
            ref={passwordRef}   
          />
          <label style={{color:'black',marginTop:'5px'}}>Show Password 
          <input type="checkbox" onClick={myFunction} style={{margin:'15px' }}></input> </label>

          <button className="loginButton" type="submit">Login</button>
        </form>
        <b style={{marginTop:'15px'}}>
          <Link to="/forgotPassword"style={{color:'blue'}}>Forgot Password?</Link>
        </b>
       
          <button className="loginRegisterButton">
            <Link style={{color:'white'}} to="/register">Register</Link>
          </button>
      </div>
    </>
 
  );
}
