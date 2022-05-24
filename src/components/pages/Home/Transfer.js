import { useState } from 'react';
import { Typography, Card, MenuItem, Select, TextField, Input, Button } from '@mui/material';
import styled from '@emotion/styled';

const Container = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: '24px 36px',
  height: 'fit-content',
  display: 'flex',
  flexDirection: 'column',
  gap: '1em',
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '1rem',
  color: theme.palette.primary.dark,
}));


export default function Transfer(props) {
  return (
    <Container>
      <Title>Transfer Money</Title>
      <TextField placeholder='Receiving account'></TextField>
      <Input type='number' placeholder='Sum' inputProps={{ min: 1, max: props.user.balance }} />
      <Button variant='contained'>Send</Button>
    </Container>
  );
}
