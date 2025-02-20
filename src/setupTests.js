import '@testing-library/jest-dom'

// Mock ResizeObserver que TipTap necesita
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
} 