import React, { useState, createContext } from 'react';

export const userContext = createContext({ user: null, setUser: () => {} });

export default function ContextWrapper(props) {
  const [user, setUser] = useState(null);

  return (
    <userContext.Provider value={{ user, setUser }}>
      {props.children}
    </userContext.Provider>
  );
}