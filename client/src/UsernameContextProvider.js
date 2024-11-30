import React, { createContext, useContext, useState } from 'react';

const UsernameContext = createContext();

export const UsernameProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [userRole, setUserRole] = useState("user");

  return (
    <UsernameContext.Provider value={{ username, setUsername, userRole, setUserRole}}>
      {children}
    </UsernameContext.Provider>
  );
};

export const useUsername = () => useContext(UsernameContext);
