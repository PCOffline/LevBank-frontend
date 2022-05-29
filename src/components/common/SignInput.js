import { useEffect } from 'react';
import { TextField, Typography } from '@mui/material';
import styled from '@emotion/styled';

const StyledInput = styled(TextField)({
  fontSize: '18px',
});

const ErrorMessage = styled(Typography)({
  color: 'red',
  fontSize: '.75rem',
  width: '24em',
});

export default function SignInput(props) {
  const {
    value,
    setValue,
    label,
    type,
    placeholder,
    required,
    showError,
    customValidation,
    setIsValid,
    displayLabel,
  } = props;

  const validateName = (name) => /^[a-zA-Z0-9_\.]{2,}$/.test(name);
  const invalidNameText =
    'must be at least 2 characters long, and can only contain letters, numbers, and underscores';

  const validatePassword = (pass) =>
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(pass);
  const invalidPasswordText =
    'must be at least 8 characters long, and must contain at least one letter and one number';

  const validate = () => {
    const requiredCheck = value || !required;
    const fieldName = label || placeholder || 'Field';

    if (!requiredCheck)
      return { valid: false, errorText: `${fieldName} required` };

    if (customValidation && !customValidation(value).valid)
      return customValidation(value);

    switch (type) {
      case 'name':
        return {
          valid: validateName(value),
          errorText: `${fieldName} ${invalidNameText}`,
        };

      case 'password':
        return {
          valid: validatePassword(value),
          errorText: `${fieldName} ${invalidPasswordText}`,
        };

      default:
        return { valid: true, errorText: '' };
    }
  };

  useEffect(() => setIsValid?.(label, validate().valid), [validate, value, label]);

  return (
    <div>
      <StyledInput
        label={(displayLabel ?? true) ? label : undefined}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        error={showError && !validate().valid}
        type={type}
        placeholder={placeholder}
        required={required}
        fullWidth
      />
      {showError && !validate().valid && (
        <ErrorMessage>{validate().errorText}</ErrorMessage>
      )}
    </div>
  );
}
