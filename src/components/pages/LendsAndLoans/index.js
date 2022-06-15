import { useContext, useEffect, useState } from 'react';
import { Typography, Card, Box, TextField } from '@mui/material';
import styled from '@emotion/styled';
import Table from '../../common/Table';
import DateRange from '../../common/DateRange';
import InfoCard from '../../common/InfoCard';
import Transfer from '../../common/Transfer';
import { ratesContext, userContext } from '../../../ContextWrapper';
import config from '../../../config';
import axios from 'axios';

const PageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  marginTop: '2rem',
  gap: '0 3rem',
  flexWrap: 'wrap',
  width: '80%',
  paddingRight: '3rem',
  [theme.breakpoints.down('xl')]: {
    gap: '0 3rem',
    alignItems: 'start',
    flexDirection: 'row',
  },
  [theme.breakpoints.down('lg')]: {

  }
}));

const MainContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  gap: '0 3rem',
  // justifyContent: 'space-between',
  [theme.breakpoints.down('lg')]: {
    gap: '0 3rem',
  },
}));

const TableContainer = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: '24px 30px 10px 30px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  height: 'fit-content',
  width: '100%',
  maxHeight: '51%',
}));

const StyledInfoCard = styled(InfoCard)(({ theme }) => ({
  height: 'inherit',
  maxHeight: '80%',
  [theme.breakpoints.down('xl')]: {
    width: '-webkit-fill-available',
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.dark,
  fontWeight: 'bold',
  fontSize: '1rem',
}));

const lendsAndLoansFields = [
  { key: 'amount', name: 'Amount' },
  { key: 'description', name: 'Description' },
  { key: 'date', name: 'Date' },
  { key: 'to', secondaryKey: 'from', name: 'To/From' },
];

const lendButtons = [
  {
    text: (row) => row.type === 'lend' ? 'Withdraw' : 'Repay',
    onClick: (row, index, button) => console.log({row, index, button}), // TODO: Send request to backend
    isVisible: (row, index, button) => true, // TODO: Conditional visiblity based on bank terms
    negative: (row) => row.type === 'loan',
  },
];

export default function LendsAndLoans(props) {
  const { currency } = props;
  const [data, setData] = useState([]);
  const [filteredLendsOrLoans, setFilteredLendsOrLoans] = useState([]);
  const { user, setUser } = useContext(userContext);
  const { exchangeRates } = useContext(ratesContext);

  const translateRates = (lcValue) => {
    if (currency === 'LC') return lcValue;
    return (lcValue * exchangeRates.ils * exchangeRates.lc).toFixed(2);
  };
  
  useEffect(() => {
      axios.get(`${config.apiUri}/finance/me`)
      .then((res) => setData(res
        .filter((transaction) => transaction.type === 'loan' || transaction.type === 'repay')
        .map((transaction) => ({ ...transaction, amount: translateRates(transaction.amount) }))
        .sort((a, b) => new Date(b.date) - new Date(a.date)))
    );
  }, [user, currency, exchangeRates]);

  const toTableObject = (lendOrLoan) => ({
    negative: lendOrLoan.type === 'lend',
    amount: `${lendOrLoan.type === 'lend' ? '-' : '+'}${
      lendOrLoan.amount
    } ${currency}`,
    date: lendOrLoan.date,
    description: lendOrLoan.description,
    to: lendOrLoan.to,
    from: lendOrLoan.from,
    type: lendOrLoan.type,
  });

  return (
    <PageContainer>
      {/* <MainContainer> */}
      <TableContainer>
        <Title>Lends &amp; Loans</Title>
        <DateRange data={data} setData={setFilteredLendsOrLoans} />
        <Table
          fields={lendsAndLoansFields}
          data={filteredLendsOrLoans.map((lendOrLoan) =>
            toTableObject(lendOrLoan),
          )}
          buttons={lendButtons}
        />
      </TableContainer>
      <MainContainer>
        <Transfer
          title={`New Lend`}
          recipientText='Username'
          exchangeRates={exchangeRates}
          buttonText='Lend'
          user={user}
          onClick={() => console.log('hello')}
        />
        <Transfer
          title={`New Loan`}
          recipientText='Username'
          buttonText='Request'
          user={user}
          exchangeRates={exchangeRates}
        />
        {/* </MainContainer> */}
        <StyledInfoCard
          title='Lends &amp; Loans Page'
          details={[
            `You can ask for a loan or lend money to other users by typing in their account ID
           and the amount you are wishing to receive or give.`,
            `Lends are marked in red and loans in green.
           Lends that can be withdrawn have a green 'Withdraw' button next to them 
           and loans that can be repaid have a red 'Repay' button next to them.`,
            `You can contact an admin for more information.`,
          ]}
        />
      </MainContainer>
    </PageContainer>
  );
}
