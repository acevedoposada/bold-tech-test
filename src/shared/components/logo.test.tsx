import { render, screen } from '@testing-library/react';
import Logo from './logo';

describe('Logo component', () => {
  it('Should be render with default fill', () => {
    render(<Logo data-testid="logo" />);

    const logo = screen.getByTestId('logo');
    expect(logo.children[1]).toHaveAttribute(
      'fill',
      'url(#bold_logo_gradient)',
    );
  });
});
