import { fireEvent, render, screen } from '@testing-library/react';
import Tabs from './tabs';

const MOCKED_TABS = ['Tab 1', 'Tab 2'];

describe('Tabs component', () => {
  it('Should be render tabs correctly', () => {
    render(<Tabs value={0} tabs={MOCKED_TABS} />);
    const tabs = screen.getByTestId('tabs');
    expect(tabs).toBeInTheDocument();
  });

  it('Should return tab index when user click', () => {
    const onChangeMockFn = jest.fn();
    render(<Tabs value={0} tabs={MOCKED_TABS} onChange={onChangeMockFn} />);
    const tabs = screen.getByTestId('tabs');
    fireEvent.click(tabs.children[1]);
    expect(onChangeMockFn).toHaveBeenCalledWith(1);
  });

  it('Should not return any value if onChange fn was not sent', () => {
    render(<Tabs value={0} tabs={MOCKED_TABS} />);
    const tabs = screen.getByTestId('tabs');
    expect(() => fireEvent.click(tabs.children[1])).not.toThrow();
  });
});
