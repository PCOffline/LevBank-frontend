import MuiButton from '@mui/material/Button';
import styled from '@emotion/styled';
import axios from 'axios';
import config from '../../config';

const Button = styled(MuiButton)(({ theme }) => ({
  boxShadow: '0 8px 16px 0 rgb(0 171 85 / 24%)',
  textTransform: 'capitalize',
  fontSize: '0.875rem',
  fontWeight: 'bolder',
  padding: '8px 22px',
  borderRadius: '8px',
}));

export const NegativeButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  color: 'white',
  boxShadow: '0 8px 16px 0 rgb(255 0 0 / 24%)',
  '&:hover': {
    backgroundColor: theme.palette.error.dark,
  },
}));

export const LogoutButton = (props) => {

  return (
    <Button
      className={props.className}
      variant='contained'
      onClick={() => {
        axios.post(`${config.apiUri}/auth/logout`).then(() => {
          window.location.reload();
        });
      }}
    >
      Logout
    </Button>
  );
};

export default Button;
