import { act, cleanup, fireEvent, render, screen } from "@testing-library/react"
import Checkbox from "./checkbox"

describe('Checkbox component', () => {
  beforeEach(() => {
    render(
      <Checkbox
        data-testid="checkbox"
      />
    )
  })

  it('Should be render correctly', () => {
    const check = screen.getByTestId('checkbox')
    expect(check).toBeInTheDocument()
  })

  it('Should be change checked state if is clicked', async () => {
    const check = screen.getByTestId('checkbox')
    expect(check).toBeInTheDocument()

    await act(() => {
      expect(() => fireEvent.click(check)).not.toThrow()
    })
    expect(check).toBeChecked()
  })

  it('Should be change checked state if is clicked', async () => {
    cleanup()

    const onChange = jest.fn()

    render(
      <Checkbox
        data-testid="checkbox"
        onChange={onChange}
      />
    )

    const check = screen.getByTestId('checkbox')
    expect(check).toBeInTheDocument()

    await act(() => {
      fireEvent.click(check)
    })
    expect(onChange).toHaveBeenCalledTimes(1)
  })

})