import { render, screen } from "@testing-library/react"
import Table, { TableBody, TableHeader } from "./table"

describe('Table component', () => {
  beforeAll(() => {
    render(
      <Table data-testid="table">
        <TableHeader data-testid="table-header" values={['Head 1', 'Head 2']} />
        <TableBody data-testid="table-body" />
      </Table>
    )
  })

  it('Should be render Table', () => {
    const table = screen.getByTestId('table')
    expect(table).toBeInTheDocument()
  })
})