import React, { useState, createContext } from 'react';

export const userContext = createContext({ user: null, setUser: () => {} });
export const ratesContext = createContext({ rates: { ils: 1, lc: 1 }, setRates: () => {} });

export default function ContextWrapper(props) {
  const [user, setUser] = useState(null);
  const [exchangeRates, setExchangeRates] = useState({ ils: 1, lc: 1 });

  return (
    <userContext.Provider value={{ user, setUser }}>
      <ratesContext.Provider value={{ exchangeRates, setExchangeRates }}>
      {props.children}
      </ratesContext.Provider>
    </userContext.Provider>
  );
}