import { cleanup, render, screen } from '@testing-library/react';
import Drawer from './drawer';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe('Drawer component', () => {
  afterEach(() => {
    cleanup();
  });

  it('Should not be render if open property is falsy', () => {
    render(<Drawer open={false} onClose={jest.fn} />);
    const drawer = screen.queryByTestId('drawer');
    expect(drawer).toBeNull();
  });

  it('Should be render drawer if open is truthy', () => {
    render(<Drawer open onClose={jest.fn} />);
    const drawer = screen.queryByTestId('drawer');
    expect(drawer).not.toBeNull();
  });
});
