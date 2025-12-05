import { cleanup, render, screen } from '@testing-library/react';
import { IoSearchSharp } from 'react-icons/io5';
import FormField from './form-field';

describe('FormField component', () => {
  beforeEach(() => {
    render(<FormField data-testid="form-field" icon={IoSearchSharp} />);
  });

  afterEach(() => {
    cleanup();
  });

  it('Should be render component', () => {
    const formfield = screen.getByTestId('form-field');
    expect(formfield).toBeInTheDocument();
  });

  it('Should be render an Icon if it is sent', () => {
    const icon = screen.getByTestId('icon');
    expect(icon).toBeInTheDocument();
  });
});
