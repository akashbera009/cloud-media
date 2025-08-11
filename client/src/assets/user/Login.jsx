// Login.jsx
import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './login.css'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const[errorMessage , setErrorMessage ] = useState(false)



  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/user/login', { username, password });
      const isSuccess = response.data.ifSuccess;
      setErrorMessage(false);  // If `ifSuccess` is false, set an error
      if (isSuccess) {
        localStorage.setItem('token', response.data.token); 
        localStorage.setItem('user', response.data.username);
        
        // console.log(localStorage.getItem('user'),localStorage.getItem('token') )
        window.location.href = '/display'
      }
      
      setMessage(response.data.message);
    
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(true)
        setMessage(error.response.data.message);
      } else {
        setMessage('An error occurred while logging in.');
        setErrorMessage(true)
      }
    }
  };



  return (
<>
   
    <form onSubmit={handleLogin} className="login-form">
   
     
        <h2 className="login-title">Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
        <button type="submit" className="login-button">Login</button>

        <p >Don't have an account ?<Link to='/auth/register' className='login-register-switch'>Register here </Link></p>

        <p className={`login-message ${errorMessage ? 'error' : 'success'}`}>
          {message}
        </p>
    </form>
</>
  );
};

export default Login;
