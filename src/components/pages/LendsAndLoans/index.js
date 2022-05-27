import { useEffect, useState } from 'react';
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
  marginTop: '2rem',
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
    text: 'Withdraw',
    onClick: (row, index, button) => console.log({row, index, button}),
    isVisible: (row) => row.type === 'lend',
  },
];

export default function LendsAndLoans(props) {
  const { user, currency } = props;
  const [data, setData] = useState([]);
  const [filteredLendsOrLoans, setFilteredLendsOrLoans] = useState([]);

  useEffect(() => {
    setData(
      user.loans
        .map((loan) => ({ ...loan, type: 'loan' }))
        .concat(user.lends.map((lend) => ({ ...lend, type: 'lend' })))
        .sort((a, b) => new Date(b.date) - new Date(a.date)),
    );
  }, [user.loans, user.lends, currency]);

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
    <Container>
      <Title>Lends &amp; Loans</Title>
      <DateRange data={data} setData={setFilteredLendsOrLoans} />
      <Table
        fields={lendsAndLoansFields}
        data={filteredLendsOrLoans.map((lendOrLoan) =>
          toTableObject(lendOrLoan),
        )}
        buttons={lendButtons}
      />
    </Container>
  );
}
