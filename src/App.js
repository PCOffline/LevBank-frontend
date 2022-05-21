import { useState } from 'react';
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
} from '@mui/material';
import styled from '@emotion/styled';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import CurrencyExchangeRoundedIcon from '@mui/icons-material/CurrencyExchangeRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import Logo from './components/common/Logo';
import FaceIcon from '@mui/icons-material/Face';

const NavBar = styled(List)(({ theme }) => ({
  flexDirection: 'column',
  backgroundColor: '#fff',
  color: theme.palette.text.disabled,
  width: '240px',
  padding: '0 16px',
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
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  padding: '10px 16px',
  borderRadius: '8px',
}));

const ChatContainer = styled(Box)(({ theme }) => ({}));

export default function App() {
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
    <>
      <NavBar id='nav'>
        <TopNav>
          <Logo withText />
          <ProfileContainer>
            <ProfileName>Avi Levi</ProfileName>
            <ProfileBalance>129 LC</ProfileBalance>
          </ProfileContainer>
        </TopNav>
        {renderNav('/', 'Home', <HomeRoundedIcon />)}
        {renderNav('transactions', 'Transactions', <BarChartRoundedIcon />)}
        {renderNav(
          '/lends-and-borrowings',
          'Lends & Borrowings',
          <CurrencyExchangeRoundedIcon />,
        )}
        {renderNav('/profile', 'Profile', <PersonRoundedIcon />)}
        <ChatContainer></ChatContainer>
      </NavBar>
      <Outlet />
    </>
  );
}
