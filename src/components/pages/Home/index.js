import { useEffect, useState } from 'react';
import UserInfo from './UserInfo';
import Transactions from './Transactions';
import styled from '@emotion/styled';
import { Box } from '@mui/material';
import Transfer from '../../common/Transfer';
import InfoCard from '../../common/InfoCard';
import Exchange from './Exchange';
import axios from 'axios';
import config from '../../../config';

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
  const [exchangeRates, setExchangeRates] = useState({ ils: 1, lc: 1 });
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const refresh = async () => {
      const rates = await axios
        .get(`${config.apiUri}/finance/exchange`)
        .catch(() => {}, []);

      setExchangeRates(rates.data);
    };
    refresh();
    const interval = setInterval(refresh, 1000 * 30);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    axios.get(`${config.apiUri}/finance/me`)
    .then(res => setTransactions(res.data))
    .catch(() => {});
  }, []);

  const handleTransfer = (recipient, amount) => {
    axios.post(`${config.apiUri}/finance/transfer`, { recipient, amount })
    .catch((err) => setError(err.response.data));
  };

  return (
    <Container>
      <UserInfo exchangeRates={exchangeRates} currency={props.currency} transactions={transactions} />
      <Transfer exchangeRates={exchangeRates} currency={props.currency} onClick={handleTransfer} error={error} />
      <Exchange exchangeRates={exchangeRates} />
      <StyledTransactions exchangeRates={exchangeRates} currency={props.currency} transactions={transactions} />
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
