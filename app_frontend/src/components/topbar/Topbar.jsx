


import {useState} from 'react'

import { Link } from "react-router-dom"
import {FaBars, FaTimes} from "react-icons/fa"
import "./topbar.css";
import Pix from '../../assets/b4.jpg';

import { useContext } from "react";
import { Context } from "../../context/Context";

 
  const Topbar = () => {
    const {user, dispatch} = (useContext(Context));

    const handleLogout = () => {dispatch({ type: "LOGOUT" })};
    const [clicked, setClick] = useState(false);
    const handleClick = ()=> setClick(!clicked)


      return(
        <div className="top">

          <div className="menu-icons" onClick={handleClick}>               
                  {clicked? (<FaTimes size={20} style={{color:"#fff"}}/>): (<FaBars size={20} style={{color:"#fff"}}/>)}

                  <i className={clicked ? "fas fa-times"  : "fas fa-bars" }></i>
          </div>
          
          <div className="topLeft">
            <i className="topIcon fab fa-facebook-square">F</i>
            <i className="topIcon fab fa-instagram-square">I</i>
            <i className="topIcon fab fa-pinterest-square">P</i>
            <i className="topIcon fab fa-twitter-square">T</i>
          </div>
        
          <div className="topCenter"> 
            <ul className={clicked ? "Nav-menu active" : "Nav-menu" }>
              <li className="topListItem"><Link className="link" to="/">HOME</Link></li>
            
              <li className="topListItem" onClick={handleLogout}>{user && "LOGOUT"}</li>
            </ul>
          </div>          

          <div className="topRight">
            {user ? (
                <img className="topImg" src={Pix} alt=""/>  
            ) : (
              <ul className="topList">
                <li className="topListItem">
                  <Link className="link" to="/login">
                    LOGIN
                  </Link>
                </li>
                <li className="topListItem">
                  <Link className="link" to="/register">
                    REGISTER
                  </Link>
                </li>
              </ul>
            )}
            <i className="topSearchIcon fas fa-search"></i>
          </div>
          
        </div> 
      )
  
}

export default Topbar;