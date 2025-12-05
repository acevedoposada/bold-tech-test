import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import MenuButton from './menu-button';

const MOCK_VALUES = [
  { label: 'Value 1', value: 0 },
  { label: 'Value 2', value: 1 },
  { label: 'Value 3', value: 2 },
];

describe('Menu button component', () => {
  beforeEach(() => {
    render(
      <MenuButton
        data-testid="menu-btn"
        title="Filtrar"
        values={MOCK_VALUES}
      />,
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('Should be render component', () => {
    const btn = screen.getByTestId('menu-btn');
    expect(btn).toBeInTheDocument();
  });

  it('Should be render popover if button is clicked', async () => {
    const btn = screen.getByTestId('menu-btn');
    await fireEvent.click(btn);
    const popover = screen.getByTestId('popover');
    expect(popover).toBeInTheDocument();
  });

  it.each([
    { hasOnClose: true, closeFn: jest.fn() },
    { hasOnClose: false, closeFn: undefined },
  ])(
    'Should remove the popover when close btn is clicked (onClose: $hasOnClose)',
    async ({ hasOnClose, closeFn }) => {
      cleanup();
      const props = {
        'data-testid': 'menu-btn',
        title: 'Filtrar',
        values: MOCK_VALUES,
        ...(hasOnClose && { onClose: closeFn }),
      };
      render(<MenuButton {...props} />);
      const btn = screen.getByTestId('menu-btn');
      fireEvent.click(btn);

      const popover = screen.getByTestId('popover');
      expect(popover).toBeInTheDocument();

      const closeBtn = screen.getByTestId('close-btn');
      fireEvent.click(closeBtn);

      if (hasOnClose) expect(closeFn).toHaveBeenCalled();

      await waitFor(() => {
        expect(screen.queryByTestId('popover')).not.toBeInTheDocument();
      });
    },
  );

  it.each([
    { hasOnConfirm: true, confirmFn: jest.fn() },
    { hasOnConfirm: false, confirmFn: undefined },
  ])(
    'Should be return value if confirm button is clicked and close de popover (onConfirm: $hasOnConfirm)',
    async ({ confirmFn, hasOnConfirm }) => {
      cleanup();
      const props = {
        'data-testid': 'menu-btn',
        title: 'Filtrar',
        values: MOCK_VALUES,
        ...(hasOnConfirm && { onConfirm: confirmFn }),
      };
      render(<MenuButton {...props} />);

      const btn = screen.getByTestId('menu-btn');
      fireEvent.click(btn);

      const popover = screen.getByTestId('popover');
      expect(popover).toBeInTheDocument();

      const confirmBtn = screen.getByTestId('confirm-btn');
      fireEvent.click(confirmBtn);

      if (hasOnConfirm) {
        expect(confirmFn).toHaveBeenCalledTimes(1);
        expect(confirmFn).toHaveBeenCalledWith([]);
      }
      await waitFor(() => {
        expect(screen.queryByTestId('popover')).not.toBeInTheDocument();
      });
    },
  );
});
