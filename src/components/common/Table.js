import {
  TableCell,
  TableContainer,
  TableRow,
  Table as MuiTable,
  Paper,
  TableHead,
  TableBody,
  Typography,
} from '@mui/material';
import styled from '@emotion/styled';
import Button, { NegativeButton } from '../common/Button';

const StyledCell = styled(TableCell)(({ theme }) => ({
  borderColor: theme.palette.primary.dark,
  backgroundColor: theme.palette.background.paper,
}));

const StyledRow = styled(TableRow)(({ theme }) => ({
  '&:last-child td': { borderBottom: 0 },
}));

const Text = styled(Typography)(({ theme }) => ({
  fontSize: '1.2rem',
  fontWeight: 500,
  color: theme.palette.primary.main,
}));

const StrikethroughText = styled(Text)(({ theme }) => ({
  textDecoration: 'line-through',
}));

const NegativeText = styled(Text)(({ theme }) => ({
  color: 'darkred',
}));

const NegativeStrikethroughText = styled(NegativeText)(({ theme }) => ({
  textDecoration: 'line-through',
}));

const GreyText = styled(Text)(({ theme }) => ({
  color: theme.palette.text.disabled,
}))

const TitleText = styled(Text)(({ theme }) => ({
  color: theme.palette.primary.dark,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  width: '100%',
}));

const StyledNegativeButton = styled(NegativeButton)(({ theme }) => ({
  width: '100%',
}));

export default function Table(props) {
  const { fields, data, buttons, className } = props;

  const getTextType = (row) => {
    if (row.grey) return GreyText;
    if (row.strikethrough) {
      if (row.negative) return NegativeStrikethroughText;
      return StrikethroughText;
    }

    if (row.negative) return NegativeText;
    return Text;
  };

  const renderRow = (row, index) => {
    const TextType = getTextType(row);

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
            const buttonText =
              typeof button.text === 'function'
                ? button.text(row, index, button)
                : button.text;
            const negative =
              typeof button.negative === 'function'
                ? button.negative(row, index, button)
                : button.negative;
              const ButtonType = negative ? StyledNegativeButton : StyledButton;

            return (
              <StyledCell key={buttonText}>
                {showButton && (
                  <ButtonType
                    variant='contained'
                    onClick={() => button.onClick?.(row, index, button)}
                  >
                    {buttonText}
                  </ButtonType>
                )}
              </StyledCell>
            );
          })}
      </StyledRow>
    );
  };

  return (
    <TableContainer component={Paper} elevation={0} className={className}>
      <MuiTable stickyHeader>
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
