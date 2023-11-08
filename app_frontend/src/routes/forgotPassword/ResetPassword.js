

import "./forgotPassword.css"
import Topbar from "../../components/topbar/Topbar";
import Axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';



export default function ResetPassword() {
  const [loginStatus, setLoginStatus] = useState("");
  const [status, setStatus] = useState("");
  const [password, setPassword] = useState("");
  const {_id} = useParams();
  const navigate = useNavigate();
 

  const myFunction = ()=>{
    
    var x = document.getElementById("psw");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  const handleSubmit = async (e) => {

    console.log(password)
    console.log(_id)
  
   
    e.preventDefault();


    try { 
      const res = await  Axios.post("http://localhost:5000/resetPassword", {      
        password:password, 
        userID:_id, 
        headers: {'Content-Type': 'application/json'}
      })
      const k = _id
      setLoginStatus(res.data.message)
      setStatus(res.data.status)

      if(res.data.status === 'SUCCESS'){
        res.data && navigate('/login') 
      }else {
        navigate('/resetPassword/'+ k +'/') 
      }

    } catch (err) {
      console.log(err)
    } 

  }; 
    return (
      <>
        <Topbar/>
        <div className="register">
          <p style={{color:'red', background:'white', marginBottom:5}}>{loginStatus}</p>
          <p>Action:<span style={{color:'white'}}> {status}</span></p>
          <span className="forgotTitle">ResetPassword</span>
       
          <form className="forgotForm" onSubmit={handleSubmit}>
   
          <label>Password</label>
            <input className="forgotInput" type="password" placeholder="Enter your password..." id="psw"
              onChange={(e)=>{setPassword(e.target.value)}}
            />
             <label style={{color:'yellow'}}>Show Password 
             <input type="checkbox" onClick={myFunction} style={{margin:'15px' }}></input> </label>


            <button className="forgotButton">Apply</button>
          </form>
     
            
        </div>
      </>

    )              
}




