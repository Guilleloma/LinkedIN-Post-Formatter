import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock IntersectionObserver
class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback
  }

  observe() {
    // Simular que el elemento está visible
    this.callback([{
      isIntersecting: true,
      intersectionRatio: 1,
      boundingClientRect: {
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        top: 0,
        right: 100,
        bottom: 100,
        left: 0,
      },
      intersectionRect: {
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        top: 0,
        right: 100,
        bottom: 100,
        left: 0,
      },
      target: document.createElement('div')
    }])
    return this
  }

  unobserve() {
    return this
  }

  disconnect() {
    return this
  }
}

global.IntersectionObserver = MockIntersectionObserver

// Mock ResizeObserver
class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = MockResizeObserver

// Mock clipboard
const mockClipboard = {
  writeText: vi.fn(() => Promise.resolve()),
  readText: vi.fn(() => Promise.resolve(''))
}

Object.defineProperty(navigator, 'clipboard', {
  value: mockClipboard,
  writable: true,
  configurable: true
})

// Mock getClientRects y getBoundingClientRect
const mockRect = {
  width: 100,
  height: 100,
  top: 0,
  left: 0,
  bottom: 100,
  right: 100,
  x: 0,
  y: 0
}

Element.prototype.getClientRects = function() {
  return [mockRect]
}

Element.prototype.getBoundingClientRect = function() {
  return mockRect
}

// Mock scrollIntoView
Element.prototype.scrollIntoView = function() {}

// Mock window.getSelection
window.getSelection = () => ({
  getRangeAt: () => ({
    getBoundingClientRect: () => mockRect,
    getClientRects: () => [mockRect]
  }),
  addRange: () => {},
  removeAllRanges: () => {},
  toString: () => '',
  rangeCount: 1
})

// Mock createRange
document.createRange = () => ({
  setStart: () => {},
  setEnd: () => {},
  getBoundingClientRect: () => mockRect,
  getClientRects: () => [mockRect],
  commonAncestorContainer: document
})

// Mock window.scrollTo
window.scrollTo = () => {} 