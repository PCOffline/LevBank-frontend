import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';

const RangeButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  margin: '1rem 0',
}));

const RangeButton = styled(ToggleButton)(({ theme }) => ({
  color: theme.palette.primary.dark,
  '&.Mui-selected': {
    color: theme.palette.primary.main,
  },
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

export default function DateRange(props) {
  const { data, setData } = props;
  const [range, setRange] = useState('week');

  useEffect(() => setData(data.filter(
    (object) =>
      new Date(object.date).getTime() >= getMinDateRange(range).getTime(),
  )), [range, data]);

  const handleRangeChange = (event, newRange) => {
    if (newRange) setRange(newRange);
  };

  return (
    <RangeButtonGroup value={range} exclusive onChange={handleRangeChange}>
      <RangeButton value='week'>Week</RangeButton>
      <RangeButton value='month'>Month</RangeButton>
      <RangeButton value='year'>Year</RangeButton>
    </RangeButtonGroup>
  );
}
