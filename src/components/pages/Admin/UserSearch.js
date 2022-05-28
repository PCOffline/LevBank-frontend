import { useEffect, useRef, useState } from 'react';
import { Card, Box, Typography, OutlinedInput, TextField, IconButton } from '@mui/material';
import styled from '@emotion/styled';
import Profile from '../Profile';
import SignInput from '../../common/SignInput';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';

const MIN_USER_LENGTH = 4;

const Container = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: '17px 24px 17px 24px',
}));

const UserContainer = styled(Box)(({ theme }) => ({
  borderTop: `2px solid ${theme.palette.primary.dark}`,
  marginTop: '1rem',
  display: 'flex',
  flexDirection: 'column',
}));

const InputsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: '1rem',
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '1rem',
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '1rem',
  color: theme.palette.primary.dark,
}));

const Label = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '1.5rem',
  color: theme.palette.primary.dark,
  margin: '8px 0px 0px',
}));

const Text = styled(Typography)(({ theme }) => ({
  fontSize: '1.1rem',
  color: theme.palette.primary.main,
}));

const NegativeText = styled(Typography)(({ theme }) => ({
  padding: '.3rem 0',
  fontSize: '.875rem',
  color: theme.palette.error.main,
}));

const mockUsers = [
  { username: 'aviron3', firstName: 'Avi', lastName: 'Ron', balance: 50 },
  { username: 'danilev', firstName: 'Daniel', lastName: 'Lev', balance: 10 },
  { username: 'gal555', firstName: 'Gal', lastName: 'Cohen', balance: 0 }
];

export default function UserSearch () {
  const [query, setQuery] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [balance, setBalance] = useState(0);
  const [saveFirstPressed, setSaveFirstPressed] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [showSearchError, setShowSearchError] = useState(false);
  const fieldsValidation = useRef({});

  const clearUser = () => {
    setShowUser(false);
    setFirstName('');
    setLastName('');
    setUsername('');
    setBalance(0);
  };

  const handleSearch = () => {
    const response = mockUsers.find((user) => user.username === query);

    if (!response) {
      setShowSearchError(true);
      clearUser();
      return;
    }

    setShowSearchError(false);
    setUsername(response.username);
    setFirstName(response.firstName);
    setLastName(response.lastName);
    setBalance(response.balance);
    setShowUser(true);
  };

  const handleIsValidChange = (label, value) => {
    fieldsValidation.current[label] = value;
  };

  const handleUserSave = () => {
    console.log(fieldsValidation.current);

    setSaveFirstPressed(true);
    if (
      Object.values(fieldsValidation.current).length &&
      Object.values(fieldsValidation.current).every((value) => value)
    ) {
      // TODO: Send a request to the backend
      console.log('hi');
      const index = mockUsers.findIndex((user) => user.username === query);
      console.log(typeof balance);
      mockUsers[index] = { username, firstName, lastName, balance };
    }
  };

  const handleUserDelete = () => {
    // TODO: Send a request to the backend
    console.log('boom');
    mockUsers.splice(mockUsers.findIndex((user) => user.username === query), 1);
    clearUser();
  };

  const renderUserValue = (label, value, setValue) => (
    <Box>
      <Label>{label}</Label>
      <SignInput
        type='name'
        value={value}
        setValue={setValue}
        label={label}
        displayLabel={false}
        showError={saveFirstPressed}
        setIsValid={handleIsValidChange}
        placeholder={label}
        required
      />
    </Box>
  );

  return (
    <Container>
      <Title>Manage Users</Title>
      <Label>Find user</Label>
      <OutlinedInput
        type='text'
        value={query}
        onChange={(event) =>
          setQuery(
            event.target.value.toLowerCase().replaceAll(/[^a-z0-9_]/g, ''),
          )
        }
        onKeyDown={(event) => event.key === 'Enter' && handleSearch()}
        endAdornment={
          <IconButton onClick={handleSearch} disabled={query.length < MIN_USER_LENGTH}>
            <SearchRoundedIcon color={query.length < MIN_USER_LENGTH ? 'disabled' : 'primary'} size='small' />
          </IconButton>
        }
        fullWidth
      />
      {showSearchError && <NegativeText>This user does not exist</NegativeText>}
      {showUser && (
        <UserContainer>
          <InputsContainer>
            {renderUserValue('First name', firstName, setFirstName)}
            {renderUserValue('Last name', lastName, setLastName)}
          </InputsContainer>
          <InputsContainer>
            {renderUserValue('Username', username, setUsername)}
            <Box>
              <Label>Balance</Label>
              <OutlinedInput
                type='number'
                value={balance}
                onChange={(event) =>
                  setBalance(Number(event.target.value).toFixed(2))
                }
                inputProps={{ min: 0 }}
              />
            </Box>
          </InputsContainer>
          <ButtonContainer>
            <IconButton onClick={handleUserSave}>
              <SaveRoundedIcon color='primary' fontSize='large' />
            </IconButton>
            <IconButton onClick={handleUserDelete}>
              <DeleteRoundedIcon color='error' fontSize='large' />
            </IconButton>
            <IconButton>
              <ChatBubbleRoundedIcon color='primary' fontSize='large' />
            </IconButton>
          </ButtonContainer>
        </UserContainer>
      )}
    </Container>
  );

};