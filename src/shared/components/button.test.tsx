import { render, screen } from '@testing-library/react';
import Button from './button';

describe('Button component', () => {
  it('Should be render button correctly', () => {
    render(<Button data-testid="button">Button</Button>);
    const button = screen.getByTestId('button');
    expect(button).toBeInTheDocument();
    expect(button.innerHTML).toContain('Button');
  });

  it('should be render button disabled if is true', () => {
    render(
      <Button disabled data-testid="button">
        Button
      </Button>,
    );

    const button = screen.getByTestId('button');
    expect(button).toBeDisabled();
  });

  it('should be add w-full class if button has fullWidth property', () => {
    render(
      <Button fullWidth data-testid="button">
        Button
      </Button>,
    );

    const button = screen.getByTestId('button');
    expect(button).toHaveClass('w-full');
  });
});
