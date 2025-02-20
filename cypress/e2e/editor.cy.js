describe('Editor de LinkedIn', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173')
  })

  it('permite escribir y formatear texto', () => {
    // Escribir texto
    cy.get('.ProseMirror').clear().type('Texto de prueba')
    
    // Aplicar negrita
    cy.get('button[title="Negrita"]').click()
    cy.get('.ProseMirror').type(' en negrita')
    
    // Aplicar cursiva
    cy.get('button[title="Cursiva"]').click()
    cy.get('.ProseMirror').type(' y en cursiva')
    
    // Crear una lista
    cy.get('button[title="Lista"]').click()
    cy.get('.ProseMirror').type('Primer elemento de la lista{enter}')
    cy.get('.ProseMirror').type('Segundo elemento de la lista')
  })

  it('permite copiar el texto formateado', () => {
    cy.get('.ProseMirror').clear().type('Texto para copiar')
    cy.get('button').contains('Copiar al portapapeles').click()
    cy.contains('¡Copiado!').should('be.visible')
  })

  it('mantiene el formato al crear una lista', () => {
    cy.get('button[title="Negrita"]').click()
    cy.get('.ProseMirror').clear().type('Lista en negrita')
    cy.get('button[title="Lista"]').click()
    cy.get('.ProseMirror').should('contain', 'Lista en negrita')
  })
}) 