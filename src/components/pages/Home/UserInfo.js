import { ArrowDownwardRounded } from '@mui/icons-material';
import { useContext, useState } from 'react';
import { Typography, Card, MenuItem, Select } from '@mui/material';
import SelectInput from '@mui/material/Select/SelectInput';
import styled from '@emotion/styled';
import { ratesContext, userContext } from '../../../ContextWrapper';

const Container = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: '17px 36px',
  height: 'fit-content',
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '1rem',
  color: theme.palette.primary.dark,
}));

const SubTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '1.5rem',
  color: theme.palette.primary.dark,
  margin: '8px 0px 0px',
}));

const Text = styled(Typography)(({ theme }) => ({
  fontSize: '1.1rem',
  color: theme.palette.primary.main,
}));

export default function UserInfo(props) {
  const { user } = useContext(userContext);
  const { exchangeRates } = useContext(ratesContext);

  const translateRates = (lcValue) => {
    if (props.currency === 'LC') return lcValue;
    return (lcValue * exchangeRates.ils * exchangeRates.lc).toFixed(2);
  };

  return (
    <Container>
      <Title>Account Summary</Title>
      <SubTitle>Balance</SubTitle>
      <Text>
        {translateRates(user.balance)} {props.currency}
      </Text>
      <SubTitle>Lends</SubTitle>
      <Text>
        {translateRates(props.transactions.filter((transaction) => 
          transaction.type === 'loan' &&
          transaction.status === 'approved' &&
          transaction.sender === user.username
        ).reduce((acc, curr) => curr.amount + acc, 0))}{' '}
        {props.currency}
      </Text>
      <SubTitle>Loans</SubTitle>
      <Text>
        {translateRates(
          props.transactions
            .filter(
              (transaction) =>
                transaction.type === 'loan' &&
                transaction.status === 'approved' &&
                transaction.recipient === user.username,
            )
            .reduce((acc, curr) => curr.amount + acc, 0),
        )}{' '}
        {props.currency}
      </Text>
    </Container>
  );
}
