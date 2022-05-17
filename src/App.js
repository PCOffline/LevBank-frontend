import { Link, Outlet, useLocation } from 'react-router-dom';
import Home from './components/pages/Home';
import './App.css';
import { AppBar } from '@mui/material';

export default function App() {
  let location = useLocation();
  let currentPage = location.pathname;

  return (
    <>
      <AppBar id='nav'>
        <div className='link-container'>
          <Link to='/' className={currentPage === '/' ? 'active' : ''}>
            Home
          </Link>
        </div>
        <div className='link-container'>
          <Link
            to='/profile'
            className={currentPage === '/profile' ? 'active' : ''}
          >
            Profile
          </Link>
        </div>
      </AppBar>
      <Outlet />
    </>
  );
}
