import React, { useContext, useState } from 'react';
import { UserContext } from './UserContext';

const Login = () => {
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Perform login logic here
    // Assuming the login is successful and user data is retrieved
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && email === storedUser.email && password === storedUser.password) {
      login(storedUser);
      setSuccessMessage('Login successful!');
    } else {
      setErrorMessage('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className='container'>
      <div className='formcard'>
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          {/* Login form inputs */}
          <div>
            <label htmlFor='email'>Email</label>
            <input
              className='forminput'
              type='email'
              id='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input
              className='forminput'
              type='password'
              id='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className='formbutton' type='submit'>Login</button>
          {successMessage && <p>{successMessage}</p>}
          {errorMessage && <p>{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
