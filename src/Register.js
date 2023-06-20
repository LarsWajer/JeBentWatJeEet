import React, { useContext, useState } from 'react';
import { UserContext } from './UserContext';

const Register = () => {
  const { login } = useContext(UserContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    // Perform registration logic here
    // Assuming the registration is successful
    const user = {
      name: name,
      email: email,
      password: password,
    };
    // Store user data in local storage
    localStorage.setItem('user', JSON.stringify(user));

    login(user);
    setSuccessMessage('Registration successful!');
  };

  return (
    <div className='container'>
      <div className='formcard'>
        <form onSubmit={handleRegister}>
          <h2>Register</h2>
          {/* Registration form inputs */}
          <div>
            <label htmlFor='name'>Name</label>
            <input
              className='forminput'
              type='text'
              id='name'
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
          <button className='formbutton' type='submit'>Register</button>
          {successMessage && <p>{successMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;
