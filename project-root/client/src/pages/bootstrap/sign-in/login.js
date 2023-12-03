// Login.js
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login', { username, password });
      const token = response.data.token;

      // Save the token in local storage or a secure storage mechanism
      localStorage.setItem('token', token);

      // Redirect to the dashboard or another page
      // Replace the line below with your actual routing logic
      window.location.href = '/dashboard';
    } catch (error) {
      console.error(error.response.data);
      // Handle login error (e.g., display an error message)
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
