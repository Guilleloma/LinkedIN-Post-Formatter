// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Import Testing Library commands
import '@testing-library/cypress/add-commands'

// Ignore uncaught exceptions from emoji-picker-react
Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('ResizeObserver') || err.message.includes('IntersectionObserver')) {
    return false
  }
})

// Add custom command for emoji selection
Cypress.Commands.add('selectEmoji', (emojiName) => {
  cy.get('button[title="Emojis"]').click()
  cy.get('input[type="search"]').type(emojiName)
  cy.get('[data-unified="1f60a"]').first().click() // Smile emoji
})