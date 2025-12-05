import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { CommonProps } from '../types/common';
import { cn } from '../lib/utils';

type ButtonProps = CommonProps &
  DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    disabled?: boolean;
    fullWidth?: boolean;
  };

function Button({ children, className, fullWidth, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'px-8 py-3 text-lg transition-colors font-medium text-white rounded-full cursor-pointer bg-secondary hover:not-disabled:bg-secondary-600 disabled:opacity-70 disabled:cursor-default',
        {
          ['w-full']: fullWidth,
        },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
