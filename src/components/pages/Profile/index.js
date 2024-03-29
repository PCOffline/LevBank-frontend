import { useState, useRef, useContext } from 'react';
import {
  IconButton,
  TextField,
  Card,
  Typography,
  Box,
} from '@mui/material';
import styled from '@emotion/styled';
import SignInput from '../../common/SignInput';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import InfoCard from '../../common/InfoCard';
import Button from '../../common/Button';
import { userContext } from '../../../ContextWrapper';
import config from '../../../config';
import axios from 'axios';

const PageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: '3rem',
  width: '80%',
  marginTop: '2rem',
  flexWrap: 'wrap',
  [theme.breakpoints.down('xl')]: {
    height: '80%',
    gap: '1rem',
  },
  [theme.breakpoints.down('lg')]: {
    gap: '1rem 0',
    width: 'fit-content',
  },
}));

const MainContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  height: 'fit-content',
  gap: '2rem',
  [theme.breakpoints.down('lg')]: {
    gap: '0 1rem',
  },
}));

const ProfileContainer = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: '8px 24px 17px 24px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
}));

const PasswordContainer = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: '17px 36px',
  display: 'flex',
  flexDirection: 'column',
  gap: '.5rem',
  width: 'fit-content',
}));

const TitleContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
}));

const EditButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.dark,
  marginBottom: '8px',
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

const ErrorText = styled.p(({ theme }) => ({
  color: theme.palette.error.main,
}));

const NameContainer = styled(Box)(({ theme }) => ({}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: '1rem',
}));

const StyledInfoCard = styled(InfoCard)(({ theme }) => ({
  width: 'fit-content',
  [theme.breakpoints.down('lg')]: {
    flexGrow: '.21',
  }
}));

export default function Profile(props) {
  const { user, setUser } = useContext(userContext);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileSubmitFirstPressed, setProfileSubmitFirstPressed] = useState(false);
  const [passwordSubmitFirstPressed, setPasswordSubmitFirstPressed] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [profileError, setProfileError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const profileFieldsValidation = useRef({});
  const passwordFieldsValidation = useRef({});

  const handleProfileIsValidChange = (label, value) => {
    profileFieldsValidation.current[label] = value;
  };

  const handlePasswordIsValidChange = (label, value) => {
    passwordFieldsValidation.current[label] = value;
  };

  const handleProfileSubmit = () => {
    setProfileSubmitFirstPressed(true);
    if (
      Object.values(profileFieldsValidation.current).length &&
      Object.values(profileFieldsValidation.current).every((value) => value)
    ) {
      axios
        .put(`${config.apiUri}/user`, { firstName, lastName, username, email })
        .then((res) => {
          setUser(res.data);
          setFirstName(res.data.firstName);
          setLastName(res.data.lastName);
          setUsername(res.data.username);
          setEmail(res.data.email);
          setProfileError('');
          setProfileSubmitFirstPressed(false);
          setEditMode(false);
        })
        .catch((err) => setProfileError(err.response?.data.message ?? 'Something went wrong'));
    }
  };

  const handlePasswordSubmit = () => {
    setPasswordSubmitFirstPressed(true);
    if (
      Object.values(passwordFieldsValidation.current).length &&
      Object.values(passwordFieldsValidation.current).every((value) => value)
    )
      axios
        .put(`${config.apiUri}/user/password`, { password })
        .then(() => {
          setPasswordSubmitFirstPressed(false);
          setPassword('');
          setConfirmPassword('');
          setPasswordError('');
        })
        .catch((err) => setPasswordError(err.response?.data.message ?? 'Something went wrong'));
  };

  const renderProfileValue = (label, value, setValue, type) => (
    <Box>
      <Label>{label}</Label>
      {editMode ? (
        <SignInput
          type={type ?? 'name'}
          value={value}
          setValue={setValue}
          label={label}
          displayLabel={false}
          showError={profileSubmitFirstPressed}
          setIsValid={handleProfileIsValidChange}
          placeholder={label}
          required
        />
      ) : (
        <Text>{value}</Text>
      )}
    </Box>
  );

  const renderPasswordValue = (label, value, setValue) => (
    <Box>
      <Label>{label}</Label>
      <SignInput
        type='password'
        value={value}
        setValue={setValue}
        label={label}
        displayLabel={false}
        showError={passwordSubmitFirstPressed}
        setIsValid={handlePasswordIsValidChange}
        placeholder={label}
        required
      />
    </Box>
  );

  return (
    <PageContainer>
      <MainContainer>
        <ProfileContainer>
          <TitleContainer>
            <Title>Manage your profile</Title>
            <EditButton onClick={() => setEditMode(!editMode)}>
              {editMode ? <CloseRoundedIcon /> : <EditRoundedIcon />}
            </EditButton>
          </TitleContainer>
          <NameContainer>
            {renderProfileValue('Username', username, setUsername)}
            {renderProfileValue('First name', firstName, setFirstName)}
            {renderProfileValue('Last name', lastName, setLastName)}
            {renderProfileValue('Email', email, setEmail, 'email')}
          </NameContainer>
          {profileError && <ErrorText>{profileError}</ErrorText>}
          {editMode && (
            <StyledButton
              fullWidth
              variant='contained'
              onClick={handleProfileSubmit}
            >
              Save
            </StyledButton>
          )}
        </ProfileContainer>
        <PasswordContainer>
          <Title>Change your password</Title>
          {renderPasswordValue('New password', password, setPassword)}
          {renderPasswordValue(
            'Confirm new password',
            confirmPassword,
            setConfirmPassword,
          )}
          {passwordError && <ErrorText>{passwordError}</ErrorText>}
          <StyledButton
            fullWidth
            variant='contained'
            onClick={handlePasswordSubmit}
          >
            Save
          </StyledButton>
        </PasswordContainer>
      </MainContainer>
      <StyledInfoCard
        title='Profile Management Page'
        details={[
          'You can view your profile information, such as your full name and username.',
          'You can change your name by clicking on the pencil icon, then typing your new name in the text boxes, and then clicking Save.',
          'You can also change your password in this page.',
          'For more information, contact an admin.'
        ]}
      />
    </PageContainer>
  );
}
