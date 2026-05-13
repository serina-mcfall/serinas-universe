import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { JournalProvider } from '../state/store'
import Sidebar from './Sidebar'

describe('<Sidebar>', () => {
  beforeEach(() => localStorage.clear())

  it('renders every category label', () => {
    render(
      <JournalProvider>
        <Sidebar activeCategory={null} />
      </JournalProvider>,
    )
    expect(screen.getByText('Characters')).toBeInTheDocument()
    expect(screen.getByText('Places')).toBeInTheDocument()
    expect(screen.getByText('Mood board')).toBeInTheDocument()
  })
})
