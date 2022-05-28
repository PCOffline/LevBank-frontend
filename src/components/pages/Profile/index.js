import { useState, useRef } from 'react';
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

const NameContainer = styled(Box)(({ theme }) => ({}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: '1rem',
}))

const StyledInfoCard = styled(InfoCard)(({ theme }) => ({
  width: 'fit-content',
  [theme.breakpoints.down('lg')]: {
    flexGrow: '.21',
  }
}))

export default function Profile(props) {
  const { user } = props;
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileSubmitFirstPressed, setProfileSubmitFirstPressed] = useState(false);
  const [passwordSubmitFirstPressed, setPasswordSubmitFirstPressed] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const profileFieldsValidation = useRef({});
  const passwordFieldsValidation = useRef({});

  const handleProfileIsValidChange = (label, value) => {
    profileFieldsValidation.current[label] = value;
  };

  const handlePasswordIsValidChange = (label, value) => {
    passwordFieldsValidation.current[label] = value;
  }

  const handleProfileSubmit = () => {
    setProfileSubmitFirstPressed(true);
    if (
      Object.values(profileFieldsValidation.current).length &&
      Object.values(profileFieldsValidation.current).every((value) => value)
    )
      // TODO: Send a request to the backend
      console.log('hi');
  };

  const handlePasswordSubmit = () => {
    setPasswordSubmitFirstPressed(true);
    if (
      Object.values(passwordFieldsValidation.current).length &&
      Object.values(passwordFieldsValidation.current).every((value) => value)
    )
      // TODO: Send a request to the backend
      console.log('hi')  ;
  }

  const renderProfileValue = (label, value, setValue) => (
    <Box>
      <Label>{label}</Label>
      {editMode ? (
        <SignInput
          type='name'
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
          </NameContainer>
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
