import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import NotesEditor from './NotesEditor'

describe('<NotesEditor>', () => {
  it('renders the textarea with the current value', () => {
    const onChange = vi.fn()
    render(<NotesEditor value="hello" onChange={onChange} />)
    expect(screen.getByLabelText(/notes/i)).toHaveValue('hello')
  })

  it('calls onChange when the user types', () => {
    const onChange = vi.fn()
    render(<NotesEditor value="" onChange={onChange} />)
    fireEvent.change(screen.getByLabelText(/notes/i), {
      target: { value: 'a new line' },
    })
    expect(onChange).toHaveBeenCalledWith('a new line')
  })

  it('renders markdown in the preview', () => {
    render(<NotesEditor value="# Title" onChange={() => {}} />)
    expect(
      screen.getByRole('heading', { level: 1, name: 'Title' }),
    ).toBeInTheDocument()
  })
})
