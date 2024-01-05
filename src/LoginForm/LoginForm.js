// LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';
import Cart from '../CartPage/Cart';
import APIAddress from '../Utils/APIPaths' // Import the ApiPaths
import './LoginForm.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(null);
  const [signupStatus, setsignupStatus] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await axios.get(APIAddress.login, {
        params: {
          username: username,
          password: password,
        },
      });

      // Assuming the API returns an integer (1 for success, other values for failure)
      const result = response.data;

      if (result === 1) {
        setLoginStatus('success');
      } else {
        setLoginStatus('failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setLoginStatus('failed');
    }
  };

  const handleSingnup = async () => {
    try {
      const response = await axios.get(APIAddress.signup, {
        params: {
          username: username,
          password: password,
        },
      });

      // Assuming the API returns an integer (1 for success, other values for failure)
      const result = response.data;

      if (result === 1) {
        setsignupStatus('success');
      } else {
        setsignupStatus('signup failed');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setsignupStatus('failed');
    }
  };

  // Render the Cart component if login is successful
  if (loginStatus === 'success') {
    return <Cart />;
  }

  // Render the login form if login is not successful
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <form className='login-form'>
          <input 
          placeholder='Username'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        <br /><br/>
        
          <input
          placeholder='Password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        <br />
        <br></br>
        <button className="login-form-button" type="button" onClick={handleLogin}>
          <b>Login</b>
        </button>
        <button className="login-form-button" type="button" onClick={handleSingnup}>
        <b>Signup</b>
        </button>

      </form>

      {loginStatus === 'failed' && (
        <div>
          <p className="login-form-status-msg" style={{ color: 'red' }}>Login failed. Please try again.</p>
        </div>
      )}

      {signupStatus === 'success' && (
        <div>
          <p  className="login-form-status-msg" style={{ color: 'green' }}>signup success. Proceed for Login</p>
        </div>
      )}

      {signupStatus === 'failed' && (
        <div>
          <p className="login-form-status-msg" style={{ color: 'red' }}>signup failed. Try with different credentials.</p>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
