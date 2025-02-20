import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import Editor from '../Editor'

describe('Editor Component', () => {
  beforeEach(() => {
    render(<Editor />)
  })

  it('renders the editor with initial content', () => {
    expect(screen.getByText('¡Escribe tu post de LinkedIn aquí!')).toBeDefined()
  })

  it('renders formatting buttons', () => {
    expect(screen.getByTitle('Negrita')).toBeDefined()
    expect(screen.getByTitle('Cursiva')).toBeDefined()
    expect(screen.getByTitle('Lista')).toBeDefined()
  })

  it('renders copy button', () => {
    expect(screen.getByText('Copiar al portapapeles')).toBeDefined()
  })

  it('shows success message after copying', async () => {
    const mockClipboard = {
      writeText: vi.fn().mockImplementation(() => Promise.resolve()),
    }
    Object.defineProperty(navigator, 'clipboard', {
      value: mockClipboard,
      writable: true,
    })

    const copyButton = screen.getByText('Copiar al portapapeles')
    
    await act(async () => {
      await fireEvent.click(copyButton)
    })

    // Esperamos a que aparezca el mensaje
    const successMessage = await screen.findByText('¡Copiado!')
    expect(successMessage).toBeDefined()
  })
}) 
