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
  const [filteredTransactions, setFilteredTransactions] = useState([...transactions]);
  const { user } = useContext(userContext);
  const { exchangeRates } = useContext(ratesContext);

  const translateRates = (lcValue) => {
    if (currency === 'LC') return lcValue;
    return (lcValue * exchangeRates.ils * exchangeRates.lc).toFixed(2);
  };

  const toTableObject = (transaction) => ({
    negative: transaction.sender === user.username,
    amount: `${transaction.sender === user.username ? '-' : '+'}${translateRates(transaction.amount)} ${props.currency}`,
    timestamp: transaction.timestamp,
    date: new Date(transaction.timestamp).toLocaleDateString(),
    description: transaction.description,
    to: transaction.sender === user.username ? transaction.recipient : null,
    from: transaction.sender || 'Admin',
  });

  const tableData = useMemo(() => transactions.map(toTableObject), [transactions, currency, exchangeRates]);

  return (
    <Container className={className}>
      <Title>Transactions</Title>
      <DateRange data={tableData} setData={setFilteredTransactions} />
      <Table
        fields={transactionFields}
        data={filteredTransactions}
      />
    </Container>
  );
}
