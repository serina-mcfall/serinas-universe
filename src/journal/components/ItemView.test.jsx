import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { JournalProvider } from '../state/store'
import ItemView from './ItemView'
import CategoryView from './CategoryView'

function setup() {
  return render(
    <JournalProvider>
      <CategoryView category="characters" />
      <ItemView category="characters" id="princess-mei" />
    </JournalProvider>,
  )
}

describe('<ItemView>', () => {
  beforeEach(() => localStorage.clear())

  it('shows nothing helpful for an unknown item', () => {
    render(
      <JournalProvider>
        <ItemView category="characters" id="ghost" />
      </JournalProvider>,
    )
    expect(screen.getByText(/can't find that item/i)).toBeInTheDocument()
  })

  it('renders fields and notes for an existing item', () => {
    setup()
    fireEvent.click(screen.getByRole('button', { name: /add new/i }))
    fireEvent.change(screen.getByLabelText(/new character name/i), {
      target: { value: 'Princess Mei' },
    })
    fireEvent.click(screen.getByRole('button', { name: /^create$/i }))

    expect(screen.getByDisplayValue('Princess Mei')).toBeInTheDocument()
    expect(screen.getByText('Age')).toBeInTheDocument()
    expect(screen.getByLabelText(/notes/i)).toBeInTheDocument()
  })

  it('updates a field via dispatch', () => {
    setup()
    fireEvent.click(screen.getByRole('button', { name: /add new/i }))
    fireEvent.change(screen.getByLabelText(/new character name/i), {
      target: { value: 'Princess Mei' },
    })
    fireEvent.click(screen.getByRole('button', { name: /^create$/i }))

    fireEvent.change(screen.getByLabelText('Age'), { target: { value: '24' } })
    expect(screen.getByLabelText('Age')).toHaveValue('24')
  })
})
