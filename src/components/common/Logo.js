import { forwardRef } from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import InterestsRoundedIcon from '@mui/icons-material/InterestsRounded';
import styled from '@emotion/styled';

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  color: theme.palette.primary.main,
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  gap: '.5em',
}));

const LogoIcon = styled(InterestsRoundedIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: '3rem',
}));

const LogoText = styled.h2(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: '1.5rem',
  fontWeight: 'bold',
  margin: 0,
  padding: 0
}));

function Logo(props) {
  const { withText, className } = props;

  return (
    <Link to='/'>
      <LogoContainer className={className}>
        <LogoIcon />
        {withText && <LogoText>Lev Bank</LogoText>}
      </LogoContainer>
    </Link>
  );
}

export default Logo;
