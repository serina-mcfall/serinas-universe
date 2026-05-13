import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { JournalProvider } from '../state/store'
import CategoryView from './CategoryView'

function renderWith(category) {
  return render(
    <JournalProvider>
      <CategoryView category={category} />
    </JournalProvider>,
  )
}

describe('<CategoryView>', () => {
  beforeEach(() => localStorage.clear())

  it('shows the category label as a heading', () => {
    renderWith('characters')
    expect(
      screen.getByRole('heading', { name: /characters/i }),
    ).toBeInTheDocument()
  })

  it('shows an empty state when there are no items', () => {
    renderWith('characters')
    expect(screen.getByText(/nothing here yet/i)).toBeInTheDocument()
  })

  it('creates a new item when "Add new" is clicked and a name is entered', () => {
    renderWith('characters')
    fireEvent.click(screen.getByRole('button', { name: /add new/i }))
    const input = screen.getByLabelText(/new character name/i)
    fireEvent.change(input, { target: { value: 'Princess Mei' } })
    fireEvent.click(screen.getByRole('button', { name: /^create$/i }))
    expect(screen.getByText('Princess Mei')).toBeInTheDocument()
  })
})
