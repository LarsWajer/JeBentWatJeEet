import React, { useContext, useState } from 'react';
import { UserContext } from './UserContext';

const Login = () => {
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Perform login logic here
    // Assuming the login is successful and user data is retrieved
    const user = {
      name: 'John Doe',
      email: email,
      password: '**********',
    };
    login(user);
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
        </form>
      </div>
    </div>
  );
};

export default Login;
