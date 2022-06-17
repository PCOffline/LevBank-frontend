import { useContext, useEffect, useState } from 'react';
import { userContext } from './ContextWrapper';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Profile from './components/pages/Profile';
import Home from './components/pages/Home';
import SignUp from './components/pages/SignUp';
import Login from './components/pages/Login';
import LendsAndLoans from './components/pages/LendsAndLoans';
import Admin from './components/pages/Admin';
import ChatPage from './components/pages/ChatPage';
import App from './App';
import Cookies from 'js-cookie';
import axios from 'axios';
import config from './config';

export default function Router() {
  const { user, setUser } = useContext(userContext);
  const [currency, setCurrency] = useState('LC');

  useEffect(() => {
    const resetCookie = () => {
      setUser(null);
      Cookies.remove('connect.sid');
      window.location.href = '/login';
    };

    if (Cookies.get('connect.sid')) {
      axios.get(`${config.apiUri}/user/me`)
      .then((res) => setUser(res.data))
      // Handle not found
      .catch(() => resetCookie());
    } else if (window.location.pathname !== '/login' && window.location.pathname !== '/register') resetCookie();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {!user && (
          <>
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
          </>
        )}
        {user?.type === 'client' && (
          <Route path='/' element={<App currency={currency} setCurrency={setCurrency} />}>
            <Route index element={<Home currency={currency} />} />
            <Route path='lends-and-loans' element={<LendsAndLoans currency={currency} />}/>
            <Route path='profile' element={<Profile currency={currency} />} />
            <Route path='chat' element={<ChatPage />} />
          </Route>
        )}
        {user?.type === 'admin' && <Route path='/' element={<Admin currency={currency} setCurrency={setCurrency} />} index />}
      </Routes>
    </BrowserRouter>
  );
}
