import UserInfo from './UserInfo';
import Transactions from './Transactions';
import styled from '@emotion/styled';
import { Box } from '@mui/material';

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  marginTop: '5em',
  width: '80%',
  justifyContent: 'space-around',
}));

const mockTransactions = [
  {
    id: 'a1b2',
    amount: 50,
    date: '2022-05-19',
    description: "Avi's Birthday",
    from: 'Daniel',
  },
  {
    id: 'b1b2',
    amount: 15,
    date: '2022-05-17',
    description: 'Pizza',
    to: 'Osher Pizza',
  },
  {
    id: 'c1c2',
    amount: 22,
    date: '2022-05-09',
    description: 'Phone Bill',
    to: 'Pelephone',
  },
  {
    id: 'a1d2',
    amount: 14,
    date: '2022-04-01',
    description: 'Refund',
    from: 'AliExpress',
  },
  {
    id: 'c1d2',
    amount: 14,
    date: '2022-03-15',
    description: 'Coffe Cup',
    to: 'AliExpress',
  },
  {
    id: 'c1b2',
    amount: 25,
    date: '2022-03-11',
    description: 'T-Shirt',
    to: 'Delta',
  },
  {
    id: 'd1a2',
    amount: 11,
    date: '2021-12-01',
    description: "Daniel's Birthday",
    to: 'Daniel',
  },
];

export default function Home(props) {
  return (
    <Container>
      <UserInfo user={props.user} />
      <Transactions user={props.user} transactions={mockTransactions} currency='LC' />
    </Container>
  );
}
