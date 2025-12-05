import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import RootLayout from './layout';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

jest.mock('next/font/google', () => ({
  Montserrat: () => ({
    variable: '--font-montserrat',
  }),
}));

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
  usePathname() {
    return '';
  },
}));

describe('Layout component', () => {
  it('should render layout component correctly', () => {
    const testChildren = <div>Test Child</div>;
    render(<RootLayout>{testChildren}</RootLayout>);

    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });
});
