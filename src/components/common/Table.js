import {
  TableCell,
  TableContainer,
  TableRow,
  Table as MuiTable,
  Paper,
  TableHead,
  TableBody,
  Button,
  Typography,
} from '@mui/material';
import styled from '@emotion/styled';

const StyledCell = styled(TableCell)(({ theme }) => ({
  borderColor: theme.palette.primary.dark,
}));

const StyledRow = styled(TableRow)(({ theme }) => ({
  '&:last-child td': { borderBottom: 0 },
}));

const Text = styled(Typography)(({ theme }) => ({
  fontSize: '1.2rem',
  fontWeight: 500,
  color: theme.palette.primary.main,
}));

const NegativeText = styled(Text)(({ theme }) => ({
  color: 'darkred',
}));

const TitleText = styled(Text)(({ theme }) => ({
  color: theme.palette.primary.dark,
}));

export default function Table(props) {
  const { fields, data, buttons } = props;

  const renderRow = (row, index) => {
    const TextType = row.negative ? NegativeText : Text;

    return (
      <StyledRow key={index}>
        {fields.map((field) => (
          <StyledCell key={field.key}>
            <TextType>{row[field.key] ?? row[field.secondaryKey]}</TextType>
          </StyledCell>
        ))}
        {buttons?.length &&
          buttons.map((button) => {
            const showButton = button.isVisible ? button.isVisible(row) : true;

            return (
              <StyledCell key={button.text}>
                {showButton && (
                  <Button
                    variant='contained'
                    onClick={() => button.onClick?.(row, index, button)}
                  >
                    {button.text}
                  </Button>
                )}
              </StyledCell>
            );
          })}
      </StyledRow>
    );
  };

  return (
    <TableContainer component={Paper} elevation={0}>
      <MuiTable>
        <TableHead>
          <TableRow>
            {fields.map((field) => (
              <StyledCell key={field.key}>
                <TitleText>{field.name}</TitleText>
              </StyledCell>
            ))}
            {buttons?.length &&
              buttons.map((button) => <StyledCell key={button.text} />)}
          </TableRow>
        </TableHead>
        <TableBody>{data.map((row, index) => renderRow(row, index))}</TableBody>
      </MuiTable>
    </TableContainer>
  );
}
