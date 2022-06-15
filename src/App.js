import { useContext, useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  AppBar,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Card,
  Avatar,
  Switch,
} from '@mui/material';
import styled from '@emotion/styled';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import CurrencyExchangeRoundedIcon from '@mui/icons-material/CurrencyExchangeRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import Logo from './components/common/Logo';
import FaceIcon from '@mui/icons-material/Face';
import { ratesContext, userContext } from './ContextWrapper';
import Button, { LogoutButton } from './components/common/Button';
import axios from 'axios';
import config from './config';

const NavBar = styled(List)(({ theme }) => ({
  flexDirection: 'column',
  backgroundColor: '#fff',
  color: theme.palette.text.disabled,
  width: '240px',
  padding: '0 16px',
  height: '100%',
  position: 'relative',
}));

const NavItem = styled(NavLink)(({ theme }) => ({
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

const NavItemContainer = styled(ListItemButton)(({ theme }) => ({
  borderRadius: '12px',
  padding: '8px 12px 8px 16px',
}));

const TopNav = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '24px 0 16px 0',
  gap: '2em',
  marginBottom: '2em',
}));

const ProfileName = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 600,
}));

const ProfileBalance = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
}));

const ProfileContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
  padding: '10px 16px',
  borderRadius: '8px',
  textAlign: 'center',
  gap: '.5em',
}));

const ProfileSeparator = styled.span(({theme }) => ({
  fontSize: '2.5rem',
  alignSelf: 'center',
  color: theme.palette.secondary.main,
}));

const InfoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
}));

const CurrencyContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '1em',
  borderRadius: '8px',
  backgroundColor: theme.palette.secondary.light,
  padding: '10px 16px',
  justifyContent: 'space-between',
}));

const AppContainer = styled.div({
  display: 'flex',
  height: '100%',
  gap: '3em',
});

const StyledLogoutButton = styled(LogoutButton)(({ theme }) => ({
  marginLeft: '1em',
  marginTop: '2em',
  width: '100%',
}));

export default function App(props) {
  const { user } = useContext(userContext);
  const { exchangeRates, setExchangeRates } = useContext(ratesContext);
  const { currency, setCurrency } = props;

  useEffect(() => {
    const refresh = async () => {
      const rates = await axios
        .get(`${config.apiUri}/finance/exchange`)
        .catch(() => {}, []);

      setExchangeRates(rates.data);
    };
    refresh();
    const interval = setInterval(refresh, 1000 * 30);

    return () => clearInterval(interval);
  }, []);

  const translateRates = (lcValue) => {
    if (currency === 'LC') return lcValue;
    return (lcValue * exchangeRates.ils * exchangeRates.lc).toFixed(2);
  };

  const renderNav = (route, text, icon) => {
    return (
      <NavItem to={route}>
        <NavItemContainer>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={text} />
        </NavItemContainer>
      </NavItem>
    );
  };

  return (
    <AppContainer>
      <NavBar id='nav'>
        <TopNav>
          <Logo withText />
          <ProfileContainer>
            <InfoContainer>
              <ProfileName>{`${user.firstName} ${user.lastName}`}</ProfileName>
              <ProfileBalance>{`${translateRates(user.balance)} ${currency}`}</ProfileBalance>
            </InfoContainer>
            <ProfileSeparator>•</ProfileSeparator>
            <InfoContainer>
              <ProfileName>Username</ProfileName>
              <ProfileBalance>{user.username}</ProfileBalance>
            </InfoContainer>
          </ProfileContainer>
          <CurrencyContainer>
            <ProfileName>Currency - {currency}</ProfileName>
            <Switch
              checked={currency === 'LC'}
              onChange={(event) =>
                setCurrency(event.target.checked ? 'LC' : 'ILS')
              }
            />
          </CurrencyContainer>
        </TopNav>
        {renderNav('/', 'Home', <HomeRoundedIcon />)}
        {renderNav(
          '/lends-and-loans',
          'Lends & Loans',
          <CurrencyExchangeRoundedIcon />,
        )}
        {renderNav('/profile', 'Profile', <PersonRoundedIcon />)}
        {renderNav('/chat', 'Chat', <ChatRoundedIcon />)}
        <StyledLogoutButton />
      </NavBar>
      <Outlet />
    </AppContainer>
  );
}
