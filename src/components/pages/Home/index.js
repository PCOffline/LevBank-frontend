import UserInfo from './UserInfo';
import Transactions from './Transactions';
import styled from '@emotion/styled';
import { Box } from '@mui/material';
import Transfer from '../../common/Transfer';
import InfoCard from '../../common/InfoCard';
import Exchange from './Exchange';

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  marginTop: '2rem',
  width: 'fit-content',
  paddingRight: '3rem',
  height: 'fit-content',
  justifyContent: 'space-between',
  gap: '1rem',
  flexWrap: 'wrap',
  [theme.breakpoints.down('lg')]: {
    justifyContent: 'space-between',
  },
  '& div': {
    height: 'auto',
  },
}));

const StyledTransactions = styled(Transactions)(({ theme }) => ({
  maxHeight: '40vh',
  [theme.breakpoints.down('xl')]: {
    maxHeight: '50vh',
  }
}));

const StyledInfoCard = styled(InfoCard)(({ theme }) => ({
  maxWidth: '30%',
}));

export default function Home(props) {
  return (
    <Container>
      <UserInfo user={props.user} />
      <Transfer user={props.user} />
      <Exchange />
      <StyledTransactions
        user={props.user}
        transactions={props.user.transactions}
        currency='LC'
      />
      <StyledInfoCard
        title='Home Page'
        details={[
          'View a summary of your account and recent transactions.',
          'Transfer money to different users by typing their username and the amount you wish to transfer.',
          'You can also view the current exchange rates for the currencies you have selected.',
          'For more information, contact an administrator.'
        ]}
      />
    </Container>
  );
}
