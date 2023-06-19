import React, { createContext, useState } from 'react';

// Create the UserContext
export const UserContext = createContext();

// Create the UserProvider component
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const login = (user) => {
    setUserData(user);
  };

  const logout = () => {
    setUserData(null);
  };

  // Provide the user data and login/logout functions to the children components
  return (
    <UserContext.Provider value={{ userData, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
