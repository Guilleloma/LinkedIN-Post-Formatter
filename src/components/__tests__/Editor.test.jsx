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

    const successMessage = await screen.findByText('¡Copiado!')
    expect(successMessage).toBeDefined()
  })

  it('toggles bold formatting when bold button is clicked', async () => {
    const boldButton = screen.getByTitle('Negrita')
    
    await act(async () => {
      await fireEvent.click(boldButton)
    })
    
    expect(boldButton.closest('button')).toHaveClass('bg-gray-200')
  })

  it('toggles italic formatting when italic button is clicked', async () => {
    const italicButton = screen.getByTitle('Cursiva')
    
    await act(async () => {
      await fireEvent.click(italicButton)
    })
    
    expect(italicButton.closest('button')).toHaveClass('bg-gray-200')
  })

  it('handles list button click', async () => {
    const listButton = screen.getByTitle('Lista')
    
    await act(async () => {
      await fireEvent.click(listButton)
    })
    
    // Verificar que el botón existe y tiene la clase correcta
    expect(listButton.closest('button')).toHaveClass('bg-gray-200')
  })

  it('handles error when clipboard is not available', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: undefined,
      writable: true,
    })

    const copyButton = screen.getByText('Copiar al portapapeles')
    
    await act(async () => {
      await fireEvent.click(copyButton)
    })

    const errorMessage = await screen.findByText('Error al copiar')
    expect(errorMessage).toBeDefined()
  })
}) 
