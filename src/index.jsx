import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Profile from './components/Profile';
import Home from './components/Home';

let user = { sum: 50, name: 'Avi' };

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Home user={user} />} />
          <Route  path='profile' element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
