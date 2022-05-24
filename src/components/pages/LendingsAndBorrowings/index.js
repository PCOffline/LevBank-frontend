import {
  ArrowDownwardRounded,
  PersonPinCircleSharp,
} from '@mui/icons-material';
import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Card,
  MenuItem,
  Select,
  Divider,
  Table,
  TableRow,
  TableBody,
  Paper,
  TableContainer,
  TableCell,
  Button,
  TableHead,
} from '@mui/material';
import styled from '@emotion/styled';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const Container = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: '24px 46px',
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

const SubTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '1.5rem',
  color: theme.palette.primary.dark,
  margin: '8px 0px 0px',
}));

const Text = styled(Typography)(({ theme }) => ({
  fontSize: '1.2rem',
  fontWeight: 500,
  color: theme.palette.primary.main,
}));

const NegativeText = styled(Text)(({ theme }) => ({
  color: 'darkred',
}));

const Transaction = styled(TableRow)(({ theme }) => ({
  // display: 'flex',
  // justifyContent: 'space-between',
  // marginBottom: '12px',
  // padding: '8px 16px 8px 0',
  // width: '100%',
  borderBottom: `1px solid ${theme.palette.primary.dark}`,
  '&:last-child': { border: 0 },
  '&:last-child td': { borderBottom: 0 },
}));

const RangeButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  margin: '1rem 0',
}));

const RangeButton = styled(ToggleButton)(({ theme }) => ({
  color: theme.palette.primary.dark,
  '&.Mui-selected': {
    color: theme.palette.primary.main,
  },
}));

const StyledCell = styled(TableCell)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.primary.dark}`,
  // borderRight: `1px solid ${theme.palette.primary.dark}`,
  // '&:last-child': { borderRight: 0 },
}));

const getMinDateRange = (range) => {
  const date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  if (range === 'week') date.setDate(date.getDate() - 7);
  else if (range === 'month') date.setDate(date.getDate() - 30);
  else if (range === 'year') date.setDate(date.getDate() - 365);

  return date;
};

export default function UserInfo(props) {
  const [range, setRange] = useState('week');

  const handleRangeChange = (event, newRange) => {
    if (newRange) setRange(newRange);
  };

  const renderTransaction = (transaction) => {
    const TextType = transaction.to ? NegativeText : Text;

    return (
      <Transaction key={transaction.id}>
        <StyledCell>
          <TextType>
            {transaction.amount} {props.currency}
          </TextType>
        </StyledCell>
        <StyledCell>
          <TextType>{transaction.description}</TextType>
        </StyledCell>
        <StyledCell>
          <TextType>{transaction.date}</TextType>
        </StyledCell>
        <StyledCell>
          <TextType>{transaction.to || transaction.from}</TextType>
        </StyledCell>
        <StyledCell>
          <Button variant='contained'>Withdraw</Button>
        </StyledCell>
      </Transaction>
    );
  };

  return (
    <Container>
      <Title>Lends</Title>
      <RangeButtonGroup value={range} exclusive onChange={handleRangeChange}>
        <RangeButton value='week'>Week</RangeButton>
        <RangeButton value='month'>Month</RangeButton>
        <RangeButton value='year'>Year</RangeButton>
      </RangeButtonGroup>
      <TableContainer>
        <Table>
          <TableHead>
            <Transaction>
              <StyledCell>
                <Text>Amount</Text>
              </StyledCell>
              <StyledCell>
                <Text>Description</Text>
              </StyledCell>
              <StyledCell>
                <Text>Date</Text>
              </StyledCell>
              <StyledCell>
                <Text>To</Text>
              </StyledCell>
              <StyledCell />
            </Transaction>
          </TableHead>
          <TableBody>
            {props.user.lends
              .filter(
                (lend) =>
                  new Date(lend.date).getTime() >=
                  getMinDateRange(range).getTime(),
              )
              .map((transaction) => renderTransaction(transaction))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
