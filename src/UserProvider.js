import React, { createContext, useState, useEffect } from 'react';

// Create the UserContext
export const UserContext = createContext();

// Create the UserProvider component
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const login = (user) => {
    setUserData(user);
    localStorage.setItem('userData', JSON.stringify(user));
  };

  const logout = () => {
    setUserData(null);
    localStorage.removeItem('userData');
  };

  // Retrieve user data from local storage on component mount
  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  // Provide the user data and login/logout functions to the children components
  return (
    <UserContext.Provider value={{ userData, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
