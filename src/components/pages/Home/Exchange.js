import { useState, useEffect } from 'react';
import { Card, OutlinedInput, Typography } from '@mui/material';
import styled from '@emotion/styled';

const Container = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: '17px 24px',
  height: 'fit-content',
  display: 'flex',
  flexDirection: 'column',
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '1rem',
  color: theme.palette.primary.dark,
}));

const Label = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '1.5rem',
  color: theme.palette.primary.dark,
  margin: '8px 0px 0px',
}));

const mockResponses = [
  { ils: 3.34, lc: 1 },
  { ils: 3.34, lc: 1.01 },
  { ils: 3.5, lc: 1.01 },
  { ils: 3.2, lc: 1.05 },
  { ils: 3.34, lc: 1.1 },
  { ils: 3.4, lc: 1.12 },
  { ils: 3.32, lc: 1.12 },
];

const defaultExchangeRates = { ils: 1, lc: 1 };

export default function Exchange(props) {
  const { className } = props;

  const [lc, setLc] = useState(1);
  const [ils, setIls] = useState(1);
  const [usd, setUsd] = useState(1);
  const [exchangeRates, setExchangeRates] = useState(defaultExchangeRates);

  const refresh = () => {
    // Send request to backend to retrieve exchange rates
    const response =
      mockResponses[Math.floor(Math.random() * mockResponses.length)];
    console.log(response);
    setExchangeRates(response);
  };

  useEffect(() => {
    // every 30 seconds
    refresh();
    const interval = setInterval(refresh, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // calculate new values based on current lc
    const newIls = (lc * exchangeRates.ils * exchangeRates.lc).toFixed(2);
    const newUsd = (lc * exchangeRates.lc).toFixed(2);

    setIls(newIls);
    setUsd(newUsd);
  }, [exchangeRates]);

  const handleCurrencyChange = (currency, value) => {
    // Change the currency's value in accordance to the parameters
    // Use the current exchange rates to calculate the according values to the rest of the currencies
    switch (currency) {
      case 'lc':
        setLc(value);
        setIls((value * exchangeRates.ils * exchangeRates.lc).toFixed(2));
        setUsd((value * exchangeRates.lc).toFixed(2));
        break;
      case 'ils':
        setIls(value);
        setLc((Math.value / exchangeRates.ils / exchangeRates.lc).toFixed(2));
        setUsd((value / exchangeRates.ils).toFixed(2));
        break;
      case 'usd':
        setUsd(value);
        setLc((value / exchangeRates.lc).toFixed(2));
        setIls((value * exchangeRates.ils).toFixed(2));
        break;
      default:
        break;
    }
  };

  return (
    <Container className={className}>
      <Title>Exchange Rates</Title>
      <Label>LevCoin (LC)</Label>
      <OutlinedInput
        type='number'
        value={lc}
        onChange={(event) => handleCurrencyChange('lc', event.target.value)}
        inputProps={{ min: 0 }}
      />
      <Label>US Dollar (&#36;)</Label>
      <OutlinedInput
        type='number'
        value={usd}
        onChange={(event) => handleCurrencyChange('usd', event.target.value)}
        inputProps={{ min: 0 }}
      />
      <Label>Israeli Shekel (&#8362;)</Label>
      <OutlinedInput
        type='number'
        value={ils}
        onChange={(event) => handleCurrencyChange('ils', event.target.value)}
        inputProps={{ min: 0 }}
      />
    </Container>
  );
}
