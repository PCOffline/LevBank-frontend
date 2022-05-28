import { useState } from 'react';
import { Box, Card, OutlinedInput, Typography } from '@mui/material';
import Table from '../../common/Table';
import styled from '@emotion/styled';
import Exchange from '../Home/Exchange';
import UserSearch from './UserSearch';

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  padding: '2rem 3rem',
  gap: '2rem',
}));

const StyledExchange = styled(Exchange)(({ theme }) => ({
  height: 'auto',
}));

const Requests = styled(Card)(({ theme }) => ({
  width: 'fit-content',
  maxHeight: '50%',
  backgroundColor: theme.palette.background.paper,
  padding: '24px 30px 10px 30px',
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '1rem',
  color: theme.palette.primary.dark,
}));

const SubTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '1.5rem',
  color: theme.palette.primary.dark,
  margin: '8px 0px 0px',
}));

const Text = styled(Typography)(({ theme }) => ({
  fontSize: '1.1rem',
  color: theme.palette.primary.main,
}));

const requestFields = [
  { key: 'firstName', name: 'First name' },
  { key: 'lastName', name: 'Last name' },
  { key: 'username', name: 'Username' },
];
const requestButtons = [
  { text: 'Approve', onClick: (row, index, button) => console.log('Approved', row) },
  { text: 'Reject', negative: true, onClick: () => console.log('Rejected') },
];

export default function Admin (props) {
  const { user } = props;

  return (
    <Container>
      <StyledExchange />
      <UserSearch />
      <Requests>
        <Title>Pending Registration Requests</Title>
        <SubTitle>Total - {user.pendingRequests.length}</SubTitle>
        <Table
          fields={requestFields}
          buttons={requestButtons}
          data={user.pendingRequests}
        />
      </Requests>
    </Container>
  );
}
