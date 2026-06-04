import { forwardRef } from 'react';
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';

export type ButtonProps = Omit<MuiButtonProps, 'variant' | 'color' | 'size'> & {
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary';
  size?: 'large' | 'medium' | 'small';
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'contained', color = 'primary', size = 'medium', ...rest },
  ref,
) {
  return <MuiButton ref={ref} variant={variant} color={color} size={size} {...rest} />;
});

export default Button;
