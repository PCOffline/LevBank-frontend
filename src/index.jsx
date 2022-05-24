import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from './components/pages/Home/Profile';
import Home from './components/pages/Home';
import SignUp from './components/pages/SignUp';
import Login from './components/pages/Login';
import LendingsAndBorrowings from './components/pages/LendingsAndBorrowings';
import { createTheme, ThemeProvider } from '@mui/material';

const mockTransactions = [
  {
    id: 'a1b2',
    amount: 50,
    date: '2022-05-19',
    description: "Avi's Birthday",
    from: 'Daniel',
  },
  {
    id: 'b1b2',
    amount: 15,
    date: '2022-05-17',
    description: 'Pizza',
    to: 'Osher Pizza',
  },
  {
    id: 'c1c2',
    amount: 22,
    date: '2022-05-09',
    description: 'Phone Bill',
    to: 'Pelephone',
  },
  {
    id: 'a1d2',
    amount: 14,
    date: '2022-04-01',
    description: 'Refund',
    from: 'AliExpress',
  },
  {
    id: 'c1d2',
    amount: 14,
    date: '2022-03-15',
    description: 'Coffe Cup',
    to: 'AliExpress',
  },
  {
    id: 'c1b2',
    amount: 25,
    date: '2022-03-11',
    description: 'T-Shirt',
    to: 'Delta',
  },
  {
    id: 'd1a2',
    amount: 11,
    date: '2021-12-01',
    description: "Daniel's Birthday",
    to: 'Daniel',
  },
];

let user = { balance: 50, name: 'Avi', lends: mockTransactions, borrowings: mockTransactions, transactions: mockTransactions };

const theme = createTheme({
  palette: {
    primary: {
      light: 'rgba(0, 171, 85, 0.08)',
      main: '#00ab55',
      dark: '#007B55',
    },
    secondary: {
      light: 'rgba(145, 158, 171, 0.08)',
      main: '#919eab',
    },
    text: {
      primary: '#212b36',
      secondary: '#919eab',
      disabled: '#637381',
    },
    background: {
      paper: '#c8facd',
    }
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<App />}>
            <Route index element={<Home user={user} />} />
            <Route path='transactions' element={<p>Hi</p>}  />
            <Route path='lends-and-borrowings' element={<LendingsAndBorrowings user={user} />} />
            <Route path='profile' element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
);
