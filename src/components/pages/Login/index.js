import { useState, useRef } from 'react';
import { Button, Typography, Box, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import SignInput from '../../common/SignInput';

const PageContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '70%',
});

const LoginContainer = styled(Box)({
  width: '50%',
  maxWidth: '480px',
});

const FormContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: '1em',
  margin: 0,
  fontSize: '18px',
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
  height: '48px',
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

const SiteName = styled.span(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: theme.palette.primary.main,
}));

const SubHeading = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.disabled,
  fontSize: '1rem',
}));

const LoginText = styled(Typography)({
  marginTop: '20px',
});

const LoginLink = styled.span(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 'bold',
}));

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitFirstPressed, setSubmitFirstPressed] = useState(false);
  const fieldsValidation = useRef({});

  const handleIsValidChange = (label, value) => {
    fieldsValidation.current[label] = value;
  };

  const handleSubmit = () => {
    setSubmitFirstPressed(true);
    if (
      Object.values(fieldsValidation).length &&
      Object.values(fieldsValidation.current).every((value) => value)
    )
      // TODO: Send a request to backend and redirect
      console.log('hi');
  };

  return (
    <PageContainer>
      <LoginContainer>
        <HeadingContainer>
          <Heading>
            Sign in to <SiteName>Lev Bank</SiteName>
          </Heading>
          <SubHeading>Enter your details below</SubHeading>
        </HeadingContainer>
        <FormContainer>
          <SignInput
            label='Username'
            value={username}
            setValue={setUsername}
            showError={submitFirstPressed}
            setIsValid={handleIsValidChange}
            type='name'
            required
          />
          <SignInput
            label='Password'
            value={password}
            setValue={setPassword}
            showError={submitFirstPressed}
            setIsValid={handleIsValidChange}
            type='password'
            required
          />
          <StyledButton
            variant='contained'
            type='submit'
            onClick={handleSubmit}
            disableElevation
          >
            Login
          </StyledButton>
        </FormContainer>
        <LoginText color='textPrimary'>
          Don't have an account?
          <Link to='/signup'>
            <LoginLink> Get started</LoginLink>
          </Link>
        </LoginText>
      </LoginContainer>
    </PageContainer>
  );
}
