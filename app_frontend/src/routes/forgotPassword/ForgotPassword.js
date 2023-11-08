

import "./forgotPassword.css"
import Topbar from "../../components/topbar/Topbar";
import Axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
 

export default function ForgotPassword() {
  
  const [loginStatus, setLoginStatus] = useState("");
  const [status, setStatus] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();


    try { 
      const res = await  Axios.post("http://localhost:5000/forgotPassword", {      
        email:email,   
        headers: {'Content-Type': 'application/json'}
      })
      setLoginStatus(res.data.message)
      setStatus(res.data.status)

      const k = res.data.data.id
     
      if(res.data.status === 'SUCCESS'){

       window.location.replace( "/resetPassword/"+ k + '/')
      }else {
        navigate('/forgotPassword') 
      }

    } catch (err) {
      console.log(err)
    } 

  }; 
    return (
      <>
        <Topbar/>
        <div className="forgot">
          <p style={{color:'red', background:'white', padding:5, marginBottom:5}}>{loginStatus}</p>
          <p>Action:{status}</p>
          <span className="forgotTitle">ForgotPassword</span>
       
          <form className="forgotForm" onSubmit={handleSubmit}>
   
            <label>Email</label>
            <input className="forgotInput" type="text" placeholder="Enter your email..." 
              onChange={(e)=>{setEmail(e.target.value)}} 
            />

            <button className="forgotButton">Apply</button>
          </form>
     
            
        </div>
      </>

    )              
}




