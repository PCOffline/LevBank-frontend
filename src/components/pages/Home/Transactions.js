import { useContext, useMemo, useState } from 'react';
import { Typography, Card } from '@mui/material';
import styled from '@emotion/styled';
import Table from '../../common/Table';
import DateRange from '../../common/DateRange';
import { ratesContext, userContext } from '../../../ContextWrapper';

const Container = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: '24px 30px 10px 30px',
  width: 'fit-content',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  height: 'fit-content',
}));

const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.dark,
  fontWeight: 'bold',
  fontSize: '1rem',
}));

const transactionFields = [
  { key: 'amount', name: 'Amount' },
  { key: 'description', name: 'Description' },
  { key: 'date', name: 'Date' },
  { key: 'to', secondaryKey: 'from', name: 'To/From' },
];

export default function Transactions(props) {
  const { transactions, currency, className } = props;
  const { user } = useContext(userContext);
  const { exchangeRates } = useContext(ratesContext);

  const translateRates = (lcValue) => {
    if (currency === 'LC') return lcValue;
    return (lcValue * exchangeRates.ils * exchangeRates.lc).toFixed(2);
  };

  const toTableObject = (transaction) => ({
    negative: transaction.to !== undefined,
    amount: `${transaction.to ? '-' : '+'}${transaction.amount} ${
      props.currency
    }`,
    date: transaction.date,
    description: transaction.description,
    to: transaction.to,
    from: transaction.from,
  });

  return (
    <Container className={props.className}>
      <Title>Transactions</Title>
      <DateRange data={props.transactions} setData={setFilteredTransactions} />
      <Table
        fields={transactionFields}
        data={filteredTransactions.map((transaction) => toTableObject(transaction))}
      />
    </Container>
  );
}
