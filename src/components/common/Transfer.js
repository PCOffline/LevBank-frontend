import { useContext, useState } from 'react';
import { Typography, Card, Box, MenuItem, Select, TextField, Input, OutlinedInput } from '@mui/material';
import styled from '@emotion/styled';
import Button from './Button';
import { ratesContext, userContext } from '../../ContextWrapper';

const Container = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: '24px 36px',
  height: 'fit-content',
  display: 'flex',
  flexDirection: 'column',
  gap: '1em',
  minWidth: 'fit-content',
}));

const InputContainer = styled(Box)(({ theme }) => ({
  width: '100%',
}))

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '1rem',
  color: theme.palette.primary.dark,
}));

const Label = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: theme.palette.primary.dark,
}))

const ErrorText = styled.p(({ theme }) => ({
  color: theme.palette.error.main,
}));

const defaultExpiryDate = new Date();
defaultExpiryDate.setDate(defaultExpiryDate.getDate() + 30);

const maxExpiryDate = new Date();
maxExpiryDate.setDate(maxExpiryDate.getDate() + 60);

export default function Transfer(props) {
  const toFormattedDate = (date) => date.toISOString().split('T')[0];

  const [recipient, setRecipient] = useState('');
  const [description, setDescription] = useState('');
  const [expiryDate, setExpiryDate] = useState(toFormattedDate(defaultExpiryDate));
  const [amount, setAmount] = useState(1);
  const { user } = useContext(userContext);
  const { exchangeRates } = useContext(ratesContext);

  const translateRates = (value) =>
    props.currency === 'LC'
      ? value
      : (value * exchangeRates.ils * exchangeRates.lc).toFixed(2);

  const toLC = (value) => props.currency === 'LC' ? value : (value / exchangeRates.ils / exchangeRates.lc).toFixed(2);

  return (
    <Container>
      <Title>{props.title || 'Transfer'}</Title>
      <InputContainer>
        <Label>{props.recipientText || 'Receiver'}</Label>
        <TextField
          placeholder={props.recipientPlaceholder || 'Username'}
          value={recipient}
          onChange={(event) => setRecipient(event.target.value)}
          fullWidth
        />
      </InputContainer>
      <InputContainer>
        <Label>Description (Optional)</Label>
        <TextField
          placeholder={props.descriptionPlaceholder || 'Description'}
          value={props.description}
          onChange={(event) => setDescription(event.target.value)}
          fullWidth
        />
      </InputContainer>
      {props.withExpiryDate && (
        <InputContainer>
          <Label>Expiry Date</Label>
          <OutlinedInput
            type='date'
            value={expiryDate}
            onChange={(event) => setExpiryDate(event.target.value)}
            inputProps={{
              min: toFormattedDate(new Date()),
              max: toFormattedDate(maxExpiryDate),
            }}
            fullWidth
          />
        </InputContainer>
      )}
      <InputContainer>
        <Label>Sum ({props.currency})</Label>
        <OutlinedInput
          type='number'
          placeholder='Sum'
          value={amount}
          onChange={(event) => setAmount(+event.target.value)}
          inputProps={{
            min: 1,
            max: translateRates(user.balance),
          }}
          fullWidth
        />
      </InputContainer>
      <Button
        variant='contained'
        disabled={
          !recipient.trim() ||
          translateRates(amount) > translateRates(user.balance) ||
          translateRates(amount) <= 0 ||
          !Number.isSafeInteger(translateRates(amount))
        }
        onClick={() => {
          if (props.withExpiryDate) props.onClick?.(recipient, new Date(expiryDate), toLC(amount), description);
          else props.onClick?.(recipient, toLC(amount), description);
        }}
      >
        {props.buttonText || 'Send'}
      </Button>
      {props.error && <ErrorText>{props.error}</ErrorText>}
    </Container>
  );
}
