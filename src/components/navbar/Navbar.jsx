import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import "./navbar.scss"
import axios from "axios"
function Navbar() {
  const {user,dispatch} = useContext(AuthContext)
  const navigate = useNavigate()
  const handleLogout = async()=>{
    dispatch({type:"LOGOUT"})
      await axios.get("/auth/logout",{},{ withCredentials: true })
     
      navigate("/login")
  }
  return (
    <div className='navbar'>
        <div className="navContainer">
          
              <Link to="/" style={{color:"inherit",textDecoration:"none"}}>
              <span className="logo">Booking.com</span>
              </Link>

           {user ? (<div className="navItems">
                <button className="navButton">{user.username}</button>
                <button onClick={handleLogout} className="navButton">Logout</button>
            </div>) : (<div className="navItems">
              <Link to='/register'>
                <button className="navButton">Register</button>
                </Link>
                <Link to='/login'>
                <button className="navButton">Login</button>
                </Link>
            </div>)}
        </div>
    </div>
  )
}

export default Navbar