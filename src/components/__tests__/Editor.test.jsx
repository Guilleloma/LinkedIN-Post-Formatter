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
    expect(screen.getByText('Write here your text and apply the desired format')).toBeDefined()
  })

  it('renders formatting buttons', () => {
    expect(screen.getByTitle('Bold')).toBeDefined()
    expect(screen.getByTitle('Italic')).toBeDefined()
    expect(screen.getByTitle('List')).toBeDefined()
  })

  it('renders copy button', () => {
    expect(screen.getByText('Copy to clipboard')).toBeDefined()
  })

  it('shows success message after copying', async () => {
    const copyButton = screen.getByText('Copy to clipboard')
    
    await act(async () => {
      await fireEvent.click(copyButton)
    })

    const successMessage = await screen.findByText('Copied!')
    expect(successMessage).toBeDefined()
  })

  it('toggles bold formatting when bold button is clicked', async () => {
    const boldButton = screen.getByTitle('Bold')
    
    await act(async () => {
      await fireEvent.click(boldButton)
    })
    
    expect(boldButton.closest('button')).toHaveClass('bg-gray-200')
  })

  it('toggles italic formatting when italic button is clicked', async () => {
    const italicButton = screen.getByTitle('Italic')
    
    await act(async () => {
      await fireEvent.click(italicButton)
    })
    
    expect(italicButton.closest('button')).toHaveClass('bg-gray-200')
  })

  it('handles list button click', async () => {
    const listButton = screen.getByTitle('List')
    
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

    const copyButton = screen.getByText('Copy to clipboard')
    
    await act(async () => {
      await fireEvent.click(copyButton)
    })

    const errorMessage = await screen.findByText('Error copying')
    expect(errorMessage).toBeDefined()
  })

  describe('Text Formatting', () => {
    it('maintains line breaks between paragraphs', async () => {
      // Simulate content with multiple paragraphs
      await act(async () => {
        const editorDiv = document.querySelector('.ProseMirror')
        editorDiv.innerHTML = '<p>First paragraph</p><p>Second paragraph</p><p>Third paragraph</p>'
        fireEvent.input(editorDiv, {
          target: editorDiv
        })
      })

      const copyButton = screen.getByText('Copy to clipboard')
      await act(async () => {
        await fireEvent.click(copyButton)
      })

      // Verify that copied text maintains line breaks
      expect(mockClipboard.writeText).toHaveBeenCalledWith(
        expect.stringMatching(/First paragraph\n\nSecond paragraph\n\nThird paragraph/)
      )
    })

    it('maintains line breaks in bullet lists', async () => {
      // Simulate content with bullet list
      await act(async () => {
        const editorDiv = document.querySelector('.ProseMirror')
        editorDiv.innerHTML = '<ul><li>First item</li><li>Second item</li></ul><p>Normal paragraph</p>'
        fireEvent.input(editorDiv, {
          target: editorDiv
        })
      })

      const copyButton = screen.getByText('Copy to clipboard')
      await act(async () => {
        await fireEvent.click(copyButton)
      })

      // Verify that copied text maintains correct format
      expect(mockClipboard.writeText).toHaveBeenCalledWith(
        expect.stringMatching(/• First item\n• Second item\n\nNormal paragraph/)
      )
    })

    it('handles mixed content with proper spacing', async () => {
      // Simulate mixed content (paragraphs, list and format)
      await act(async () => {
        const editorDiv = document.querySelector('.ProseMirror')
        editorDiv.innerHTML = '<p>Main title</p><ul><li>Item 1</li><li>Item 2</li></ul><p>Conclusion</p>'
        fireEvent.input(editorDiv, {
          target: editorDiv
        })
      })

      const copyButton = screen.getByText('Copy to clipboard')
      await act(async () => {
        await fireEvent.click(copyButton)
      })

      // Verify complete format
      expect(mockClipboard.writeText).toHaveBeenCalledWith(
        expect.stringMatching(/Main title\n\n• Item 1\n• Item 2\n\nConclusion/)
      )
    })

    it('maintains formatting without unnecessary line breaks between styled words', async () => {
      // Simular contenido con palabras en negrita y cursiva mezcladas
      await act(async () => {
        const editorDiv = document.querySelector('.ProseMirror')
        editorDiv.innerHTML = '<p><strong>Bold</strong> normal <em>italic</em> text <strong>more bold</strong> and <em>more italic</em></p>'
        fireEvent.input(editorDiv, {
          target: editorDiv
        })
      })

      const copyButton = screen.getByText('Copy to clipboard')
      await act(async () => {
        await fireEvent.click(copyButton)
      })

      // Verificar que el texto copiado mantiene el formato sin saltos de línea innecesarios
      expect(mockClipboard.writeText).toHaveBeenCalledWith(
        expect.stringMatching(/^𝗕𝗼𝗹𝗱 normal 𝘪𝘵𝘢𝘭𝘪𝘤 text 𝗺𝗼𝗿𝗲 𝗯𝗼𝗹𝗱 and 𝘮𝘰𝘳𝘦 𝘪𝘵𝘢𝘭𝘪𝘤$/)
      )
    })

    it('maintains formatting in mixed content with lists', async () => {
      // Simular contenido con formato mixto incluyendo listas
      await act(async () => {
        const editorDiv = document.querySelector('.ProseMirror')
        editorDiv.innerHTML = '<p><strong>Title</strong></p><ul><li><em>First</em> item</li><li>Second <strong>item</strong></li></ul><p>Normal <em>conclusion</em></p>'
        fireEvent.input(editorDiv, {
          target: editorDiv
        })
      })

      const copyButton = screen.getByText('Copy to clipboard')
      await act(async () => {
        await fireEvent.click(copyButton)
      })

      // Verificar que el texto copiado mantiene el formato y los saltos de línea correctos
      expect(mockClipboard.writeText).toHaveBeenCalledWith(
        expect.stringMatching(/^𝗧𝗶𝘁𝗹𝗲\n\n• 𝘍𝘪𝘳𝘴𝘵 item\n• Second 𝗶𝘁𝗲𝗺\n\nNormal 𝘤𝘰𝘯𝘤𝘭𝘶𝘴𝘪𝘰𝘯$/)
      )
    })
  })
}) 
