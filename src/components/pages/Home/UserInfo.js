import { ArrowDownwardRounded } from '@mui/icons-material';
import { useState } from 'react';
import { Card, MenuItem, Select } from '@mui/material';
import SelectInput from '@mui/material/Select/SelectInput';
import './UserInfo.css';

export default function UserInfo(props) {
  const [currency, setCurrency] = useState('LevCoin');
  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <Card id='card'>
      <p>
        Welcome, <span className='bold'>{props.user.name}</span>
      </p>
      <p>
        Remaining sum: <span className='bold'>{props.user.sum}</span>
      </p>
      <span className='left'>Currency:</span>
      <Select
        id='select'
        value={currency}
        onChange={(event) => handleChange(event)}
      >
        <MenuItem value='LevCoin'>LevCoin</MenuItem>
        <MenuItem value='ILS'>ILS</MenuItem>
      </Select>
    </Card>
  );
}
