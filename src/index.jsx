import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from './components/pages/Profile';
import Home from './components/pages/Home';
import SignUp from './components/pages/SignUp';
import Login from './components/pages/Login';
import LendsAndLoans from './components/pages/LendsAndLoans';
import Admin from './components/pages/Admin';
import ChatPage from './components/pages/ChatPage';
import { createTheme, ThemeProvider } from '@mui/material';

const mockTransactions = [
  {
    id: 'a1b2',
    amount: 50,
    date: '2022-05-27',
    description: "Avi's Birthday",
    from: 'Daniel',
  },
  {
    id: 'b1b2',
    amount: 15,
    date: '2022-05-22',
    description: 'Pizza',
    to: 'Osher Pizza',
  },
  {
    id: 'c1c2',
    amount: 22,
    date: '2022-05-18',
    description: 'Phone Bill',
    to: 'Pelephone',
  },
  {
    id: 'a1d2',
    amount: 14,
    date: '2022-04-29',
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
].sort((a, b) => new Date(b.date) - new Date(a.date));

const mockLends = [{
  id: 'aaaa',
  amount: 10,
  date: '2022-05-26',
  description: "Bar's Restaurant Bill",
  to: 'Bar',
},
{
  id: 'aaa1',
  amount: 15,
  date: '2022-05-13',
  description: 'Lend to Osher',
  to: 'Osher',
},
{
  id: 'aaa2',
  amount: 22,
  date: '2022-05-11',
  description: 'Lend to Daniel',
  to: 'Daniel',
},
{
  id: 'aaa3',
  amount: 14,
  date: '2022-04-01',
  description: 'Lend to David',
  to: 'David',
},
{
  id: 'aaa4',
  amount: 14,
  date: '2022-03-15',
  description: 'Lend to Tom',
  to: 'Tom',
}];

const mockLoans = [{
  id: 'bbbb',
  amount: 18,
  date: '2022-05-26',
  description: "Loan from Moshe",
  from: 'Moshe',
},
{
  id: 'bbb1',
  amount: 15,
  date: '2022-05-25',
  description: 'Loan from Guy',
  from: 'Guy',
},
{
  id: 'bbb2',
  amount: 11,
  date: '2022-05-21',
  description: 'Loan from Idan',
  from: 'Idan',
},
{
  id: 'bbb3',
  amount: 12,
  date: '2022-04-03',
  description: 'Loan from Omer',
  from: 'Omer',
},
{
  id: 'bbb4',
  amount: 6,
  date: '2022-03-16',
  description: 'Loan from Itay',
  from: 'Itay',
}];

const mockRequests = [{
  username: 'cccc',
  firstName: 'John',
  lastName: 'Doe',
}];

let regularUser = { type: 'user', username: 'aviron3', balance: 50, firstName: 'Avi', lastName: 'Ron', lends: mockLends, loans: mockLoans, transactions: mockTransactions };
let adminUser = { type: 'admin', pendingRequests: mockRequests, username: 'admin1', firstName: 'Admin', lastName: '' };
const user = regularUser;

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
    },
    error: {
      main: '#b72136',
      light: 'rgba(255, 72, 66, 0.16)',
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1375,
      xl: 1536,
    }
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          {user.type === 'user' && (
            <Route path='/' element={<App user={user} />}>
              <Route index element={<Home user={user} />} />
              <Route path='transactions' element={<p>Hi</p>} />
              <Route
                path='lends-and-loans'
                element={<LendsAndLoans user={user} currency='LC' />}
              />
              <Route path='profile' element={<Profile user={user} />} />
              <Route path='chat' element={<ChatPage users={[adminUser]} />} />
            </Route>
          )}
          {/* // TODO: Actual user logic */}
          {user.type === 'admin' && (
            <Route path='/' element={<Admin user={user} />} index />
          )}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
);
