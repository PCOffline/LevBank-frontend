import { useContext, useEffect, useState, useRef } from 'react';
import { Box, Card, OutlinedInput, Typography } from '@mui/material';
import Table from '../../common/Table';
import styled from '@emotion/styled';
import Exchange from '../Home/Exchange';
import UserSearch from './UserSearch';
import Chat from '../../common/Chat';
import InfoCard from '../../common/InfoCard';
import axios from 'axios';
import config from '../../../config';
import { LogoutButton } from '../../common/Button';
import { ratesContext } from '../../../ContextWrapper';

const ContentContainer = styled(Box)(({ theme }) => ({
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
  width: '27%',
  [theme.breakpoints.down('md')]: {
    width: 'fit-content',
  }
}));

const StyledChat = styled(Chat)(({ theme }) => ({
  '& div': {
    maxHeight: '17rem',
  },
}));

const StyledLogoutButton = styled(LogoutButton)(({ theme }) => ({
  position: 'absolute',
  right: '1rem',
  top: '1rem',
}));

const Notifications = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: '24px 30px 10px 30px',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  width: 'fit-content',
}));

const Notification = styled(Typography)(({ theme }) => ({
  fontSize: '1.1rem',
  color: theme.palette.primary.dark,
}));

const requestFields = [
  { key: 'firstName', name: 'First name' },
  { key: 'lastName', name: 'Last name' },
  { key: 'username', name: 'Username' },
];

export default function Admin () {
  const [users, setUsers] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [requestsError, setRequestsError] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const { setExchangeRates } = useContext(ratesContext);
  const ws = useRef(null);

  useEffect(() => {
    const refresh = async () => {
      const rates = await axios
        .get(`${config.apiUri}/finance/exchange`)
        .catch(() => localStorage.getItem('exchangeRates'), []);

      setExchangeRates(rates.data);
    };
    refresh();
    const interval = setInterval(refresh, 1000 * 30);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    ws.current = new WebSocket(`ws://${config.apiUri.replace('http://', '')}/alerter`,);

    ws.current.onopen = () => {
      ws.current.send('"Hello"')
    };
    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setNotifications(data);
    };
    ws.current.onclose = () => {};

    return () => ws.current.close();
  }, []);

  const requestButtons = [
    {
      text: 'Approve',
      onClick: (row, index) => {
        axios
          .put(`${config.apiUri}/user/approve`, { username: row.username })
          .then((user) => {
            setPendingRequests((prevUsers) => {
              const newUsers = [...prevUsers];
              newUsers.splice(index, 1);
              return newUsers;
            });
            setUsers((prevRequests) => [...prevRequests, user]);
          })
          .catch((err) => setRequestsError(err));
      },
    },
    {
      text: 'Reject',
      negative: true,
      onClick: (row, index) => {
        axios
          .delete(`${config.apiUri}/user/${row.username}`)
          .then(() =>
            setPendingRequests((prevUsers) => {
              const newUsers = [...prevUsers];
              newUsers.splice(index, 1);
              return newUsers;
            }),
          )
          .catch((err) => setRequestsError(err));
      },
    },
  ];

  useEffect(() => {
    axios.get(`${config.apiUri}/user/requests`)
      .then(res => setPendingRequests(res.data))
      .catch(err => setRequestsError(err.response.data));
  }, []);

  useEffect(() => {
    axios.get(`${config.apiUri}/user`)
      .then(res => setUsers(res.data))
      .catch(() => {});
  }, []);

  return (
    <>
      <StyledLogoutButton />
      <ContentContainer>
        <StyledExchange />
        <UserSearch users={users} setUsers={setUsers} />
        {/* <StyledChat users={users} /> */}
        <Requests error={requestsError}>
          <Title>Pending Registration Requests</Title>
          <SubTitle>Total - {pendingRequests.length}</SubTitle>
          <Table
            fields={requestFields}
            buttons={requestButtons}
            data={pendingRequests}
          />
        </Requests>
        <StyledInfoCard
          title='Admin Menu'
          details={[
            'The admin menu allows you to manage the system and view vital information about it.',
            'By typing a username in the "Manage Users", you can search for a specific user and edit their information - including their balance.',
            'You can approve and reject users who have requested to register to the system. Their initial balance will be 0 LC.',
            'The chat allows you to communicate with other users and provide support.',
          ]}
          withChat={false}
        />
        <StyledChat users={users.filter((user) => user.type !== 'admin')} />
        <Notifications>
          <Title>Notifications</Title>
          {notifications.map((notification) => (
            <Notification key={notification}>{notification}</Notification>
          ))}
        </Notifications>
      </ContentContainer>
    </>
  );
}
