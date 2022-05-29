import { useState } from 'react';
import { Box, Card, OutlinedInput, Typography } from '@mui/material';
import Table from '../../common/Table';
import styled from '@emotion/styled';
import Exchange from '../Home/Exchange';
import UserSearch from './UserSearch';
import Chat from '../../common/Chat';
import InfoCard from '../../common/InfoCard';

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

const StyledInfoCard = styled(InfoCard)(({ theme }) => ({
  width: '30%',
  [theme.breakpoints.down('md')]: {
    width: 'fit-content',
  }
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

const mockUsers = [
  { username: 'aviron3', firstName: 'Avi', lastName: 'Ron', balance: 50 },
  { username: 'danilev', firstName: 'Daniel', lastName: 'Lev', balance: 10 },
  { username: 'gal555', firstName: 'Gal', lastName: 'Cohen', balance: 0 }
];

export default function Admin (props) {
  const { user } = props;

  return (
    <Container>
      <StyledExchange />
      <UserSearch users={mockUsers} />
      <Chat users={mockUsers} />
      <Requests>
        <Title>Pending Registration Requests</Title>
        <SubTitle>Total - {user.pendingRequests.length}</SubTitle>
        <Table
          fields={requestFields}
          buttons={requestButtons}
          data={user.pendingRequests}
        />
      </Requests>
      <StyledInfoCard
        title='Admin Menu'
        details={[
          'The admin menu allows you to manage the system and view vital information about it.',
          'By typing a username in the "Manage Users", you can search for a specific user and edit their information - including their balance.',
          'You can approve and reject users who have requested to register to the system. Their initial balance will be 10 LC.',
          'The chat allows you to communicate with other users and provide support.',
        ]}
        withChat={false}
      />
    </Container>
  );
}
