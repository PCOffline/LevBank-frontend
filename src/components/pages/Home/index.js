import { useContext, useEffect, useState } from 'react';
import UserInfo from './UserInfo';
import Transactions from './Transactions';
import styled from '@emotion/styled';
import { Box } from '@mui/material';
import Transfer from '../../common/Transfer';
import InfoCard from '../../common/InfoCard';
import Exchange from './Exchange';
import axios from 'axios';
import config from '../../../config';
import { userContext } from '../../../ContextWrapper';

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
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);
  const { setUser } = useContext(userContext);

  useEffect(() => {
    axios.get(`${config.apiUri}/finance/me`)
    .then(res => setTransactions(res.data))
    .catch(() => {});
  }, []);

  const handleTransfer = (recipient, amount, description) => {
    axios.post(`${config.apiUri}/finance/transfer`, { recipient, amount, description })
    .then(() => {
      setTransactions((prevTransactions) => [...prevTransactions, {
        recipient,
        amount,
        date: new Date().toLocaleString(),
      }]);
      setUser((prevUser) => ({ ...prevUser, balance: prevUser.balance - amount }));
    })
    .catch((err) => setError(err.response.data));
  };

  return (
    <Container>
      <UserInfo currency={props.currency} transactions={transactions} />
      <Transfer currency={props.currency} onClick={handleTransfer} error={error} />
      <Exchange />
      <StyledTransactions currency={props.currency} transactions={transactions} />
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
