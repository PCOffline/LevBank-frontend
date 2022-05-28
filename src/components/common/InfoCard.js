import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import Button from './Button';

const Container = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  flexDirection: 'column',
  padding: '24px 24px 40px',
  height: 'fit-content',
  borderRadius: '16px',
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  marginBottom: '8px',
  fontWeight: 700,
  color: theme.palette.text.primary,
}));

const Details = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  paddingBottom: '24px',
  color: theme.palette.text.primary,
  maxWidth: '480px',
  lineHeight: '1.5',
}));



export default function InfoCard(props) {
  return (
    <Container className={props.className}>
      <Box>
      <Title>{props.title}</Title>
      {Array.isArray(props.details)
        ? props.details.map((detail) => <Details key={detail}>{detail}</Details>)
        : props.details}
      <Button variant='contained' onClick={props.onChatClick}>
        Open Chat
      </Button>
      </Box>
    </Container>
  );
}