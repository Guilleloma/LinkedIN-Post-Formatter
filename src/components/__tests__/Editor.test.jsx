import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import Editor from '../Editor'

// Mock clipboard API
const mockClipboard = {
  writeText: vi.fn(() => Promise.resolve()),
  readText: vi.fn(() => Promise.resolve(''))
}

beforeEach(() => {
  vi.clearAllMocks()
  Object.defineProperty(navigator, 'clipboard', {
    value: mockClipboard,
    writable: true
  })
})

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

  describe('Text Formatting', () => {
    it('maintains line breaks between paragraphs', async () => {
      // Simular contenido con múltiples párrafos
      await act(async () => {
        const editorDiv = document.querySelector('.ProseMirror')
        editorDiv.innerHTML = '<p>Primer párrafo</p><p>Segundo párrafo</p><p>Tercer párrafo</p>'
        fireEvent.input(editorDiv, {
          target: editorDiv
        })
      })

      const copyButton = screen.getByText('Copiar al portapapeles')
      await act(async () => {
        await fireEvent.click(copyButton)
      })

      // Verificar que el texto copiado mantiene los saltos de línea
      expect(mockClipboard.writeText).toHaveBeenCalledWith(
        expect.stringMatching(/Primer párrafo\n\nSegundo párrafo\n\nTercer párrafo/)
      )
    })

    it('maintains line breaks in bullet lists', async () => {
      // Simular contenido con lista de bullets
      await act(async () => {
        const editorDiv = document.querySelector('.ProseMirror')
        editorDiv.innerHTML = '<ul><li>Primer item</li><li>Segundo item</li></ul><p>Párrafo normal</p>'
        fireEvent.input(editorDiv, {
          target: editorDiv
        })
      })

      const copyButton = screen.getByText('Copiar al portapapeles')
      await act(async () => {
        await fireEvent.click(copyButton)
      })

      // Verificar que el texto copiado mantiene el formato correcto
      expect(mockClipboard.writeText).toHaveBeenCalledWith(
        expect.stringMatching(/• Primer item\n• Segundo item\n\nPárrafo normal/)
      )
    })

    it('handles mixed content with proper spacing', async () => {
      // Simular contenido mixto (párrafos, lista y formato)
      await act(async () => {
        const editorDiv = document.querySelector('.ProseMirror')
        editorDiv.innerHTML = '<p>Título principal</p><ul><li>Item 1</li><li>Item 2</li></ul><p>Conclusión</p>'
        fireEvent.input(editorDiv, {
          target: editorDiv
        })
      })

      const copyButton = screen.getByText('Copiar al portapapeles')
      await act(async () => {
        await fireEvent.click(copyButton)
      })

      // Verificar el formato completo
      expect(mockClipboard.writeText).toHaveBeenCalledWith(
        expect.stringMatching(/Título principal\n\n• Item 1\n• Item 2\n\nConclusión/)
      )
    })
  })
}) 
