import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { JournalProvider } from '../state/store'
import SavedIndicator from './SavedIndicator'

describe('<SavedIndicator>', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.useFakeTimers()
  })
  afterEach(() => vi.useRealTimers())

  it('shows "Saved" briefly after a save', async () => {
    render(
      <JournalProvider>
        <SavedIndicator />
      </JournalProvider>,
    )
    // Initial render triggers a debounce timer in the provider.
    await act(async () => { vi.advanceTimersByTime(600) })
    expect(screen.getByText(/saved/i)).toBeInTheDocument()

    // It fades after a couple of seconds.
    await act(async () => { vi.advanceTimersByTime(2500) })
    expect(screen.queryByText(/saved/i)).not.toBeInTheDocument()
  })
})
