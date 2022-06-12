import { useState, useRef, useContext } from 'react';
import { Typography, Box, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import SignInput from '../../common/SignInput';
import Logo from '../../common/Logo';
import Button from '../../common/Button';
import axios from 'axios';
import { userContext } from '../../../ContextWrapper';
import config from '../../../config';

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
  fontSize: '0.9375rem',
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

const StyledLogo = styled(Logo)({
  padding: '20px',
});

const ErrorText = styled.p(({ theme }) => ({
  color: theme.palette.error.main,
}));

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitFirstPressed, setSubmitFirstPressed] = useState(false);
  const fieldsValidation = useRef({});
  const navigate = useNavigate();
  const { setUser } = useContext(userContext);

  const handleIsValidChange = (label, value) => {
    fieldsValidation.current[label] = value;
  };

  const handleSubmit = () => {
    setSubmitFirstPressed(true);
    if (
      Object.values(fieldsValidation.current).length &&
      Object.values(fieldsValidation.current).every((value) => value)
    )
      axios
        .post(`${config.apiUri}/auth/login`, { username, password })
        .then((res) => {
          setUser(res.data);
          return navigate('/');
        })
        .catch((err) => setError(err.response.data));
  };

  return (
    <>
      <StyledLogo withText />
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
              setValue={(value) => setUsername(value.toLowerCase())}
              customValidation={(value) => {
                if (value !== value.toLowerCase()) {
                  return { valid: false, errorText: 'Username must be lowercase' };
                }

                if (value.length > 20) {
                  return { valid: false, errorText: 'Username cannot be longer than 20 characters' };
                }

                return { valid: true };
              }}
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
          {error && <ErrorText>{error}</ErrorText>}
          <LoginText color='textPrimary'>
            Don't have an account?
            <Link to='/signup'>
              <LoginLink> Get started</LoginLink>
            </Link>
          </LoginText>
        </LoginContainer>
      </PageContainer>
    </>
  );
}
