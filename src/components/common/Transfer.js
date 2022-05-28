import { useState } from 'react';
import { Typography, Card, MenuItem, Select, TextField, Input, OutlinedInput } from '@mui/material';
import styled from '@emotion/styled';
import Button from './Button';

const Container = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: '24px 36px',
  height: 'fit-content',
  display: 'flex',
  flexDirection: 'column',
  gap: '1em',
  minWidth: 'fit-content',
}));

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

export default function Transfer(props) {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState(1);

  return (
    <Container>
      <Title>{props.title}</Title>
      <Label>{props.recipientText}</Label>
      <TextField
        placeholder={props.recipientPlaceholder || 'Receiving account'}
        value={recipient}
        onChange={(event) => setRecipient(event.target.value)}
      />
      <Label>Sum</Label>
      <OutlinedInput
        type='number'
        placeholder='Sum'
        value={amount}
        onChange={(event) => setAmount(+event.target.value)}
        inputProps={{ min: 1, max: props.user.balance }}
      />
      <Button
        variant='contained'
        disabled={
          !recipient.trim() ||
          amount > props.user.balance ||
          amount <= 0 ||
          !Number.isSafeInteger(amount)
        }
        onClick={() => props.onClick?.(recipient, amount)}
      >
        {props.buttonText || 'Send'}
      </Button>
    </Container>
  );
}
