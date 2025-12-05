import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IconType } from 'react-icons';
import { cn } from '../lib/utils';

interface FormFieldProps extends DetailedHTMLProps<
  HTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> {
  icon?: IconType;
  placeholder?: string;
}

function FormField({ icon: Icon, className, ...props }: FormFieldProps) {
  return (
    <fieldset className="relative">
      {Icon && (
        <span className="absolute top-0 left-0 grid pointer-events-none select-none w-14 h-14 place-content-center">
          <Icon data-testid="icon" size={28} className="text-brand-gray-dark" />
        </span>
      )}
      <input
        {...props}
        className={cn('w-full p-4 focus:outline-none', className, {
          'pl-14': !!Icon,
        })}
      />
    </fieldset>
  );
}

export default FormField;
