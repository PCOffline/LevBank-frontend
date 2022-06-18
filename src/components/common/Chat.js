import { useContext, useEffect, useRef, useState } from 'react';
import { Card, Box, Typography, TextField, IconButton, Button, OutlinedInput } from '@mui/material';
import styled from '@emotion/styled';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import clone from 'just-clone';
import config from '../../config';
import axios from 'axios';
import { userContext } from '../../ContextWrapper';

const Container = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: '8px 24px 12px',
  color: theme.palette.primary.dark,
  display: 'flex',
  flexDirection: 'column',
  height: 'auto',
}));

const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.dark,
  fontWeight: 'bold',
  fontSize: '1rem',
}));

const SubTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '1.5rem',
  color: theme.palette.primary.dark,
  margin: '8px 0px 0px',
}));

const Text = styled(Typography)(({ theme }) => ({
  fontSize: '1.1rem',
  color: theme.palette.primary.dark,
}));

const ChatGlobalContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'start',
  marginTop: '1rem',
  gap: '3rem',
  height: '90%',
}));

const ChatUsersContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: 'fit-content',
  borderRight: `1px solid ${theme.palette.primary.dark}`,
  gap: '.2rem',
  paddingRight: '.5rem',
}));

const UserContainer = styled(Button)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  paddingLeft: 0,
  width: '100%',
  textTransform: 'capitalize',
  whiteSpace: 'nowrap',
}));

const ChatContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: '2rem',
  overflowY: 'auto',
  width: '100%',
}));

const ChatMessagesContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '.5rem',
  overflowY: 'auto',
}));

const ActiveText = styled(Text)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

const ChatText = styled(Text)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const AuthorText = styled(ChatText)(({ theme }) => ({
  fontSize: '.875rem',
  fontWeight: 'bold',
  color: theme.palette.primary.dark,
}));

const ChatMessage = styled(Box)(({ theme }) => ({
}));

export default function Chat(props) {
  const { users, className } = props;
  const [history, setHistory] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const ws = useRef(null);
  const { user } = useContext(userContext);

  useEffect(() => {
    ws.current = new WebSocket(`ws://${config.apiUri.replace('http://', '')}/chat`);
    ws.current.onopen = () => {};

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);

      // TODO: Show error
      if (message.error) console.error(message.error);

      setHistory((prevHistory) => [...prevHistory, message]);
    };

    ws.current.onclose = () => {};

    return () => ws.current.close();
  }, [setHistory]);

  useEffect(() => {
    if (!selectedUser) return;
    
    axios.get(`${config.apiUri}/chat/history/${selectedUser?.username}`)
      .then((res) => setHistory(res.data))
      .catch(() => {});
  }, [selectedUser]);

  useEffect(() => {
    setSelectedUser(prevSelectedUser => users.find((chatUser) => chatUser.username === prevSelectedUser?.username) || users[0]);
  }, [users]);

  const userDisplayName = (chatUser) => `${chatUser?.firstName} ${chatUser?.lastName}`;

  const handleMessageSend = () => {
    if (newMessage.length === 0) return;

    const message = {
      recipient: selectedUser.username,
      message: newMessage,
    };

    ws.current.send(JSON.stringify(message));
    setNewMessage('');
  };

  return (
    <Container className={className}>
      <Title>Chat</Title>
      <SubTitle>Chatting with {userDisplayName(selectedUser)}</SubTitle>
      <ChatGlobalContainer>
        <ChatUsersContainer>
          {users.map((chatUser) => {
            const TextType =
              chatUser.username === selectedUser?.username ? ActiveText : Text;

            return (
              <UserContainer
                onClick={() => setSelectedUser(chatUser)}
                key={chatUser.username}
              >
                <TextType>{userDisplayName(chatUser)}</TextType>
              </UserContainer>
            );
          })}
        </ChatUsersContainer>
        <ChatContainer>
          <ChatMessagesContainer>
            {history.map((message, index, userChats) => {
              const authorLabel =
                message.sender === user.username
                  ? 'Me:'
                  : `${selectedUser.firstName}:`;

                const showAuthorLabel = userChats[index - 1]?.sender !== message.sender;

              return (
                <ChatMessage key={message._id}>
                  {showAuthorLabel && <AuthorText>{authorLabel}</AuthorText>}
                  <ChatText>{message.message}</ChatText>
                </ChatMessage>
              );
            })}
          </ChatMessagesContainer>
          <OutlinedInput
            size='small'
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
            fullWidth
            placeholder='Enter your message'
            onKeyDown={(event) => event.key === 'Enter' && handleMessageSend()}
            endAdornment={
              <IconButton onClick={handleMessageSend}>
                <SendRoundedIcon color='primary' fontSize='small' />
              </IconButton>
            }
          />
        </ChatContainer>
      </ChatGlobalContainer>
    </Container>
  );
}