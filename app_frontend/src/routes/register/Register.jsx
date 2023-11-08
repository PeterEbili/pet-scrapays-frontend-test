


import "./register.css"
import Topbar from "../../components/topbar/Topbar";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";                 
import { Context } from "../../context/Context";    

export default function Register() {
  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useContext(Context); 

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
    setError(false);

     try { 
      const res = await  Axios.post("http://localhost:5000/admin", {

        username:username,
        email:email,
        password:password,
        headers: {'Content-Type': 'application/json'}
      })
  
      setLoginStatus(res.data.message)
      setStatus(res.data.status)

      if(res.data.status === 'SUCCESS'){
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.results });      
        res.data && navigate('/')
      }else {
        navigate('/register') 
      }

    } catch (err) {
      setError(true);
    } 

  }; 
    return (
      <>
        <Topbar/>
        <div className="register">
          <p style={{color:'red',background:'black', fontSize:18}}>{loginStatus}</p>
          <p>Action: {status}</p>
          <span className="registerTitle">Register</span>
          {error && <span style={{color:"red", background:'black', padding:10}}>Something went wrong!</span>}

          <form className="registerForm" onSubmit={handleSubmit}>
            <label>Username</label>
            <input className="registerInput" type="text" 
              placeholder="Enter your username..." 
              onChange={(e)=>{setUsername(e.target.value)}}
            />
            <label>Email</label>
            <input className="registerInput" type="text" placeholder="Enter your email..." 
              onChange={(e)=>{setEmail(e.target.value)}} 
            />
            <label>Password</label>
            <input className="registerInput" type="password" placeholder="Enter your password..." id="psw"
              onChange={(e)=>{setPassword(e.target.value)}}
            />
             <label style={{}}>Show Password 
             <input type="checkbox" onClick={myFunction} style={{margin:'15px' }}></input> </label>

            <button className="registerButton">Register</button>
          </form>
            <button className="registerLoginButton">
              <Link style={{color:'white'}} to="/login">Login</Link>
            </button>
            
        </div>
      </>

    )              
}


