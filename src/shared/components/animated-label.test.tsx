import { render, screen } from "@testing-library/react"
import AnimatedLabel from "./animated-label"

describe('Animated label component', () => {
  it('should be render component', () => {
    render(
      <AnimatedLabel>
        Label
      </AnimatedLabel>
    )
    const label = screen.getByText('Label')
    expect(label).not.toBeUndefined()
  })
})