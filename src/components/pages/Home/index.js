import UserInfo from './UserInfo';
import Transactions from './Transactions';
import styled from '@emotion/styled';
import { Box } from '@mui/material';
import Transfer from '../../common/Transfer';

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  marginTop: '2rem',
  width: '80%',
  height: 'fit-content',
  justifyContent: 'space-around',
  gap: '1rem',
  [theme.breakpoints.down('lg')]: {
    flexWrap: 'wrap',
    justifyContent: 'center',
  }
}));

export default function Home(props) {
  return (
    <Container>
      <UserInfo user={props.user} />
      <Transfer user={props.user} />
      <Transactions user={props.user} transactions={props.user.transactions} currency='LC' />
    </Container>
  );
}
