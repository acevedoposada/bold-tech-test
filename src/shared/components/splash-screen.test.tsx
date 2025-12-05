import { render, screen } from '@testing-library/react';
import SplashScreen from './splash-screen';
import { useLayoutStore } from '../store/layout.store';

jest.mock('@/shared/store/layout.store', () => ({
  useLayoutStore: jest.fn(),
}));

describe('SplashScreen component', () => {
  it('Should be render splash screen', () => {
    (useLayoutStore as unknown as jest.Mock).mockReturnValue({
      isFirstLoad: true,
    });
    render(<SplashScreen />);
    const splashScreen = screen.getByTestId('splash-screen');
    expect(splashScreen).toBeInTheDocument();
  });

  it('Should be disappear if isFirstLoad false', () => {
    (useLayoutStore as unknown as jest.Mock).mockReturnValue({
      isFirstLoad: false,
    });
    render(<SplashScreen />);
    expect(screen.queryByTestId('splash-screen')).toBeNull();
  });
});
