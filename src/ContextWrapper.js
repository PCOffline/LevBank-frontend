import React, { useState, createContext, useEffect } from 'react';

export const userContext = createContext({ user: null, setUser: () => {} });
export const ratesContext = createContext({ rates: { ils: 1, lc: 1 }, setRates: () => {} });

export default function ContextWrapper(props) {
  const [user, setUser] = useState(null);
  const [exchangeRates, setExchangeRates] = useState({ ils: 1, lc: 1 });

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('exchangeRates', JSON.stringify(exchangeRates));
  }, [user, exchangeRates]);

  return (
    <userContext.Provider value={{ user, setUser }}>
      <ratesContext.Provider value={{ exchangeRates, setExchangeRates }}>
      {props.children}
      </ratesContext.Provider>
    </userContext.Provider>
  );
}