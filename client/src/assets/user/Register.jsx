import React, {useState , useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import './login.css'

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verifypassword, setVerifyPassword] = useState('');
    const [isPasswordMatch, setIsPasswordMatch] = useState(false);
    const [message, setMessage] = useState('');

    const handleRegister = async (e)=>{
        e.preventDefault()
        try{
            const response = await axios.post('/user/register' , {username, email, password})
            setMessage(response.data.message)
            window.location.href = '/auth/login'
        } 
        catch(e){console.log(e);}
    }
useEffect(()=>{
  if(verifypassword === ''  || password === ''){
    setIsPasswordMatch(false);
  }
  if(verifypassword === password){
    setIsPasswordMatch(true);
  }
  else{
    setIsPasswordMatch(false);
  }
   
  }, [verifypassword])
       

  return (
    <>
      <form onSubmit={handleRegister} className='login-form'>
      <button className="left-arrow-button" onClick={() => (window.location.href = "/")}>
        ←
      </button>

        <h2 className="login-title">Register</h2>
        <input
          type="text"
          placeholder="Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="login-input"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="login-input"
        />
        <input
          type="text"
          placeholder="Confirm Password"
          value={verifypassword}
          onChange={(e)=>setVerifyPassword(e.target.value)}
          required
          className="login-input"
        />
        {verifypassword && (
          <>
          {isPasswordMatch ? (
                <p>Passwords match!</p>
            ) : (
                <p>Passwords do not match.</p>
            )}
          </>
        )}
         
        <button type="submit" className="login-button" >Register</button>
        <p >Already Have an Account ?<Link  className='login-register-switch' to='/auth/login'>login here </Link></p>
        {message && <p style={{ color: 'red', marginTop: '10px' }}>{message}</p>}
      </form>
</>
  )
}

export default Register