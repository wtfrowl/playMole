import { createContext, useState, useEffect } from 'react';

// Create the context
export const UserContext = createContext();
// Create the UserProvider component
export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState(() => {
    // Get the username from localStorage or set it to an empty string if not found
    return localStorage.getItem('username') || '';
  });

  // Function to set the username and save it to localStorage
  const handleSetUsername = (newUsername) => {
    setUsername(newUsername);
    localStorage.setItem('username', newUsername);
  };

  return (
    <UserContext.Provider value={{ username, setUsername: handleSetUsername }}>
      {children}
    </UserContext.Provider>
  );
};
