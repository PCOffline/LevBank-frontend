import { useEffect, useRef, useState } from 'react';
import { Card, Box, Typography, OutlinedInput, TextField, IconButton } from '@mui/material';
import styled from '@emotion/styled';
import Profile from '../Profile';
import SignInput from '../../common/SignInput';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import config from '../../../config';
import axios from 'axios';

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

export default function UserSearch (props) {
  const [query, setQuery] = useState('');
  const [user, setUser] = useState(null);
  const [newUsername, setNewUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [balance, setBalance] = useState(0);
  const [saveFirstPressed, setSaveFirstPressed] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [showSearchError, setShowSearchError] = useState(false);
  const fieldsValidation = useRef({});

  const clearUser = () => {
    setUser(null);
    setShowUser(false);
    setFirstName('');
    setLastName('');
    setNewUsername('');
    setEmail('');
    setBalance(0);
  };

  const handleSearch = () => {
    const response = props.users.find((queryUser) => queryUser.username === query);

    if (!response) {
      setShowSearchError(true);
      clearUser();
      return;
    };

    setShowSearchError(false);
    setUser(response);
    setNewUsername(response.username);
    setFirstName(response.firstName);
    setLastName(response.lastName);
    setEmail(response.email);
    setBalance(response.balance);
    setShowUser(true);
  };

  const handleIsValidChange = (label, value) => {
    fieldsValidation.current[label] = value;
  };

  const handleUserSave = () => {
    setSaveFirstPressed(true);
    if (
      Object.values(fieldsValidation.current).length &&
      Object.values(fieldsValidation.current).every((value) => value)
    ) {
        axios
          .put(`${config.apiUri}/user/${user.username}`, { firstName, lastName, balance: +balance, newUsername, email })
          .then((res) => {
            const index = props.users.indexOf(user);
            props.setUsers((prevUsers) => {
              const newUsers = [...prevUsers];
              newUsers[index] = { ...newUsers[index], ...res.data };
              return newUsers;
            });
          });
    }
  };

  const handleUserDelete = () => {
    axios.delete(`${config.apiUri}/user/${user}`)
    .then(() => {
      props.setUsers((prevUsers) => {
        const newUsers = [...prevUsers];
        newUsers.splice(props.users.indexOf(user), 1);
        return newUsers;
      });
      clearUser();
    });
  };

  const renderUserValue = (label, value, setValue, type) => (
    <Box>
      <Label>{label}</Label>
      <SignInput
        type={type ?? 'name'}
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
            {renderUserValue('Username', newUsername, setNewUsername)}
            {renderUserValue('Email', email, setEmail, 'email')}
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
          </ButtonContainer>
        </UserContainer>
      )}
    </Container>
  );
};
