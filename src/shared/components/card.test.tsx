import { render, screen } from '@testing-library/react';
import Card, { CardBody, CardHeader } from './card';

describe('Card component', () => {
  it('Should be render Card', () => {
    render(<Card data-testid="card">Content</Card>);
    const card = screen.getByTestId('card');
    expect(card).toBeInTheDocument();
  });

  it('Should be render card with body', () => {
    render(
      <Card>
        <CardBody data-testid="card-body">Body</CardBody>
      </Card>,
    );
    const cardBody = screen.getByTestId('card-body');
    expect(cardBody.innerHTML).toContain('Body');
    expect(cardBody).toBeInTheDocument();
  });

  it('Should be render card with header', () => {
    render(
      <Card>
        <CardHeader data-testid="card-header">Header</CardHeader>
      </Card>,
    );
    const cardHeader = screen.getByTestId('card-header');
    expect(cardHeader.innerHTML).toContain('Header');
    expect(cardHeader).toBeInTheDocument();
  });
});
