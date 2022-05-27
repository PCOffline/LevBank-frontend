import { useState } from 'react';
import { Typography, Card } from '@mui/material';
import styled from '@emotion/styled';
import Table from '../../common/Table';
import DateRange from '../../common/DateRange';

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
  const [filteredTransactions, setFilteredTransactions] = useState([]);

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
    <Container>
      <Title>Transactions</Title>
      <DateRange data={props.transactions} setData={setFilteredTransactions} />
      <Table
        fields={transactionFields}
        data={filteredTransactions.map((transaction) => toTableObject(transaction))}
      />
    </Container>
  );
}
