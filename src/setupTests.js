import '@testing-library/jest-dom'

// Mock ResizeObserver que TipTap necesita
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Mock getClientRects y getBoundingClientRect
Element.prototype.getClientRects = function() {
  return {
    item: () => null,
    length: 0,
    [Symbol.iterator]: function* () {}
  }
}

Element.prototype.getBoundingClientRect = function() {
  return {
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
}

// Mock window.scrollTo
window.scrollTo = () => {} 