import { useEffect, useState, useRef } from 'react';
import { Card, Box, Typography, TextField, IconButton, Button, OutlinedInput } from '@mui/material';
import styled from '@emotion/styled';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import clone from 'just-clone';

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

const mockMessages = [
  [{ id: 'abc1', text: 'Hello', sender: 'self', date: new Date('2022-05-29T05:00:00Z') }, { id: 'abc2', text: 'Good morning', sender: 'self', date: new Date('2022-05-29T05:30:00Z') }, { id: 'abc3', text: 'This is a mock chat', sender: 'other', date: new Date('2022-05-29T06:00:00Z') }],
  [{ id: 'bbc1', text: 'This is a mock chat', sender: 'other', date: new Date('2022-05-28T05:00:00Z') }, { id: 'bbc2', text: 'Good night', sender: 'self', date: new Date('2022-05-28T05:30:00Z') }, { id: 'bbc3', text: 'Good night!', sender: 'other', date: new Date('2022-05-28T06:00:00Z') }],
  [{ id: 'cbc1', text: 'Hello admin', sender: 'self', date: new Date('2022-05-27T05:00:00Z') }, { id: 'cbc2', text: 'Good morning', sender: 'other', date: new Date('2022-06-28T05:00:00Z') }, { id: 'cbc3', text: 'This is a mock chat', sender: 'self', date: new Date('2022-07-29T05:00:00Z') }],
];

export default function Chat(props) {
  const { users, className } = props;
  
  // TODO: Get data from backend with a request
  const [newMessage, setNewMessage] = useState('');
  const [chats, setChats] = useState(
    users
      .map((user) => ({
        ...user,
        chat: mockMessages[Math.floor(Math.random() * mockMessages.length)],
      }))
      .sort((a, b) => b.chat.date - a.chat.date),
  );
  const [selectedUser, setSelectedUser] = useState(chats[0]);

  useEffect(() => {
    setSelectedUser(chats.find((chat) => chat.username === selectedUser.username));
  }, [chats]);

  const userDisplayName = (user) => `${user.firstName} ${user.lastName}`;
  
  const handleMessageSend = () => {
    console.log('hello');
    // TODO: Websocket logic here!
    setNewMessage('');
    setChats((prevChats) => {
      const index = prevChats.indexOf(selectedUser);
      const newChats = clone(prevChats);
      newChats[index].chat.push({ text: newMessage, sender: 'self', date: new Date(), id: Math.random().toString(36).substring(7) });
      return newChats;
    });
  };

  return (
    <Container className={className}>
      <Title>Chat</Title>
      <SubTitle>Chatting with {userDisplayName(selectedUser)}</SubTitle>
      <ChatGlobalContainer>
        <ChatUsersContainer>
          {chats.map((user) => {
            const TextType =
              user.username === selectedUser.username ? ActiveText : Text;

            return (
              <UserContainer
                onClick={() => setSelectedUser(user)}
                key={user.username}
              >
                <TextType>{userDisplayName(user)}</TextType>
              </UserContainer>
            );
          })}
        </ChatUsersContainer>
        <ChatContainer>
          <ChatMessagesContainer>
            {selectedUser.chat.map((message, index, userChats) => {
              const authorLabel =
                message.sender === 'self'
                  ? 'Me:'
                  : `${selectedUser.firstName}:`;

                const showAuthorLabel = userChats[index - 1]?.sender !== message.sender;

              return (
                <ChatMessage key={message.id}>
                  {showAuthorLabel && <AuthorText>{authorLabel}</AuthorText>}
                  <ChatText>{message.text}</ChatText>
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