import { act, render, screen, fireEvent } from '@testing-library/react';
import Header from './header';

const OLD_RESIZE_OBSERVER = global.ResizeObserver;

describe('Header component', () => {
  beforeEach(() => {
    global.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  });

  afterAll(() => {
    global.ResizeObserver = OLD_RESIZE_OBSERVER;
  });

  it('Should be render header element', () => {
    render(<Header />);
    const header = screen.getByTestId('header');
    expect(header).toBeInTheDocument();
  });

  it('Should render desplegable menu if screen is minor than 1024px', async () => {
    global.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn().mockResolvedValue([{ contentRect: { width: 1000 } }]),
      disconnect: jest.fn(),
    }));
    render(<Header />);
    const burgerMenuBtn = screen.getByTestId('burger-menu');
    expect(burgerMenuBtn).toBeInTheDocument();
    fireEvent.click(burgerMenuBtn);
    expect(burgerMenuBtn.children[0]).toHaveStyle('transform: scale(0)');
  });
});
