import axios from 'axios'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import './register.scss'

function Register() {
    const [credentials,setCredentials] = useState({
        username:undefined,
        password:undefined
    })
    const {loading} = useContext(AuthContext)

    const handleChange = (e) => {
        setCredentials((prev)=> ({...prev,[e.target.id]:e.target.value}))
    }
    const navigate =useNavigate()
    const handleLogin =async(e)=>{
        e.preventDefault()
      
        try {
            const res = await axios.post('/auth/register',credentials)
            navigate('/')
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className='login'>
        <div className="lContainer">
            <input type="text" placeholder='username' id='username' onChange={handleChange} className="lInput" />
            <input type="email" placeholder='Email' id='email' onChange={handleChange} className="lInput" />
            <input type="text" placeholder='Phone' id='phone' onChange={handleChange} className="lInput" />
            <input type="text" placeholder='City' id='city' onChange={handleChange} className="lInput" />
            <input type="text" placeholder='Country' id='country' onChange={handleChange} className="lInput" />
            <input type="password" placeholder='password' id='password' onChange={handleChange} className="lInput" />
            <button disabled={loading} onClick={handleLogin} className="lButton">Register</button>
           
        </div>
    </div>
  )
}

export default Register