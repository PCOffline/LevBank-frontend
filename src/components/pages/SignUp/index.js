import { useState } from 'react';
import { Button, Input, Card, Typography, Box, TextField } from '@mui/material';
import styled from '@emotion/styled';
import SignInput from '../../common/SignInput';

const SignUpContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '70%',
});

const FormContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: 'fit-content',
  gap: '1em',
  margin: 0,
  fontSize: '18 px',
});

const NameContainer = styled.div({
  display: 'flex',
  gap: '1em',
});

const StyledButton = styled(Button)({
  color: '#fff',
  fontWeight: 'bolder',
  fontFamily: 'Public Sans',
  textTransform: 'none',
  padding: '8px 22px',
  fontSize: '0.9375rem',
  borderRadius: '8px',
  boxShadow: '0 8px 16px 0 rgb(0 171 85 / 24%)',
});

const HeadingContainer = styled.div({
  marginBottom: '40px',
  width: 'fit-content',
});

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: theme.palette.text.primary,
}));

const SubHeading = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.disabled,
  fontSize: '1rem',
}));

export default function SignUp(props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitFirstPressed, setSubmitFirstPressed] = useState(false);

  const handleSubmit = () => {
    setSubmitFirstPressed(true);
    console.log({ firstName, lastName, username, password, confirmPassword });
  };

  return (
    <SignUpContainer>
      <Box>
        <HeadingContainer>
          <Heading>Welcome to Lev Bank</Heading>
          <SubHeading>Enter your details below</SubHeading>
        </HeadingContainer>
        <FormContainer>
          <NameContainer>
            <SignInput
              label='First Name'
              value={firstName}
              setValue={setFirstName}
              showError={submitFirstPressed}
              type='name'
              required
            />
            <SignInput
              value={lastName}
              label='Last Name'
              setValue={setLastName}
              showError={submitFirstPressed}
              type='name'
              required
            />
          </NameContainer>
          <SignInput
            label='Username'
            value={username}
            setValue={setUsername}
            showError={submitFirstPressed}
            type='name'
            required
          />
          <SignInput
            label='Password'
            value={password}
            setValue={setPassword}
            showError={submitFirstPressed}
            type='password'
            required
          />
          <SignInput
            label='Confirm Password'
            value={confirmPassword}
            setValue={setConfirmPassword}
            showError={submitFirstPressed}
            customValidation={(value) => ({ valid: value === password, errorText: 'Passwords do not match' })}
            type='password'
            required
          />
          <StyledButton
            variant='contained'
            type='submit'
            onClick={handleSubmit}
            disableElevation
          >
            Sign Up
          </StyledButton>
        </FormContainer>
      </Box>
    </SignUpContainer>
  );
}
