import { render, screen, fireEvent, waitFor, within } from '@testing-library/react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'

import App from '../App'
import Header from '../components/Header'
import { AppProvider } from '../context/AppContext'

beforeEach(() => {
  localStorage.clear()
  vi.stubGlobal(
    'fetch',
    vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ results: [], page: 1, total_pages: 1, total_results: 0 }),
      })
    )
  )
})

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('Random movie picker', () => {
  it('opens the modal of a random movie from the list', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    render(<App />)
    const button = screen.getByRole('button', { name: /random movie/i })
    await waitFor(() => expect(button).toBeEnabled())

    const firstTitle = screen.getAllByRole('heading', { level: 2 })[0].textContent ?? ''
    fireEvent.click(button)

    const dialog = await screen.findByRole('dialog')
    expect(within(dialog).getByText(firstTitle)).toBeInTheDocument()
  })

  it('is disabled when there are no movies to pick from', () => {
    render(
      <MemoryRouter>
        <AppProvider>
          <Header
            search=""
            onSearch={() => {}}
            onlyFavorites={false}
            onToggleFavorites={() => {}}
            onOpenApiConfig={() => {}}
            onPickRandom={() => {}}
            canPickRandom={false}
          />
        </AppProvider>
      </MemoryRouter>
    )
    expect(screen.getByRole('button', { name: /random movie/i })).toBeDisabled()
  })
})
