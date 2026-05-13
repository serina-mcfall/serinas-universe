import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { JournalProvider } from '../state/store'
import FieldEditor from './FieldEditor'

function harness({ field, value, onChange }) {
  return render(
    <JournalProvider>
      <FieldEditor field={field} value={value} onChange={onChange} />
    </JournalProvider>,
  )
}

describe('<FieldEditor>', () => {
  beforeEach(() => localStorage.clear())

  it('renders a text input for type="text"', () => {
    const onChange = vi.fn()
    harness({
      field: { key: 'age', type: 'text', label: 'Age' },
      value: '24',
      onChange,
    })
    const input = screen.getByLabelText('Age')
    expect(input).toHaveValue('24')
    fireEvent.change(input, { target: { value: '25' } })
    expect(onChange).toHaveBeenCalledWith('25')
  })

  it('renders a number input for type="number"', () => {
    const onChange = vi.fn()
    harness({
      field: { key: 'pop', type: 'number', label: 'Population' },
      value: '1000',
      onChange,
    })
    expect(screen.getByLabelText('Population')).toHaveAttribute('type', 'number')
  })

  it('renders tags as comma-separated text and parses them back', () => {
    const onChange = vi.fn()
    harness({
      field: { key: 'tags', type: 'tags', label: 'Tags' },
      value: ['royalty', 'fugitive'],
      onChange,
    })
    const input = screen.getByLabelText('Tags')
    expect(input).toHaveValue('royalty, fugitive')
    fireEvent.change(input, { target: { value: 'royalty, fugitive, dyer' } })
    expect(onChange).toHaveBeenCalledWith(['royalty', 'fugitive', 'dyer'])
  })

  it('renders a select for type="link"', () => {
    const onChange = vi.fn()
    harness({
      field: { key: 'home', type: 'link', target: 'places', label: 'Home' },
      value: '',
      onChange,
    })
    expect(screen.getByLabelText('Home').tagName).toBe('SELECT')
  })
})
