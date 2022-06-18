import InfoCard from '../../common/InfoCard';
import Chat from '../../common/Chat';
import styled from '@emotion/styled';
import { Box } from '@mui/system';
import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../../config';

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '2rem',
  padding: '2rem 3rem',
}));

const StyledChat = styled(Chat)(({ theme }) => ({
  minWidth: '60%'
}));

export default function ChatPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`${config.apiUri}/user`)
      .then((res) => setUsers(res.data))
      .catch(() => {});
  }, []);

  return (
    <Container>
      <StyledChat users={users} />
      <InfoCard title='Chat Page' details='In the chat page you can receive support from our well-trained staff members.' withChat={false} />
    </Container>
  );
}