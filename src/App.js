import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  AppBar,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import styled from '@emotion/styled';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import CurrencyExchangeRoundedIcon from '@mui/icons-material/CurrencyExchangeRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

const NavBar = styled(List)(({ theme }) => ({
  flexDirection: 'column',
  backgroundColor: '#fff',
  color: theme.palette.text.disabled,
  width: '20%',
}));

const ActiveNav = styled(NavLink)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.text.disabled,

  '&.active': {
    color: theme.palette.primary.main,
  },
  '&.active > div': {
    backgroundColor: theme.palette.primary.light,
  },
  '&.active > div > div': {
    color: theme.palette.primary.main,
  },
  '&:hover > div': {
    backgroundColor: theme.palette.secondary.light,
  },
}));

export default function App() {
  const renderNav = (route, text, icon) => {
    return (
      <ActiveNav to={route}>
        <ListItemButton>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItemButton>
      </ActiveNav>
    );
  };

  return (
    <>
      <NavBar id='nav'>
        {renderNav('/', 'Home', <HomeRoundedIcon />)}
        {renderNav('transactions', 'Transactions', <BarChartRoundedIcon />)}
        {renderNav(
          '/lends-and-borrowings',
          'Lends & Borrowings',
          <CurrencyExchangeRoundedIcon />,
        )}
        {renderNav('/profile', 'Profile', <PersonRoundedIcon />)}
      </NavBar>
      <Outlet />
    </>
  );
}
