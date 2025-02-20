// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Comando personalizado para escribir texto formateado
Cypress.Commands.add('writeFormattedText', (text, options = {}) => {
  const { bold = false, italic = false, list = false } = options

  if (bold) {
    cy.get('button[title="Negrita"]').click()
  }
  if (italic) {
    cy.get('button[title="Cursiva"]').click()
  }
  if (list) {
    cy.get('button[title="Lista"]').click()
  }

  cy.get('.ProseMirror').type(text)
})

// Comando para verificar el texto formateado
Cypress.Commands.add('checkFormattedText', (text) => {
  cy.get('.ProseMirror').should('contain', text)
})