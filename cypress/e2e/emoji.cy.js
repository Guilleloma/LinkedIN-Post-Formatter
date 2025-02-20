describe('Emoji Feature', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should open emoji picker and insert emoji', () => {
    cy.get('[data-testid="emoji-button"]').click()
    cy.get('.EmojiPickerReact').should('be.visible')
    
    // Search for a specific emoji
    cy.get('.EmojiPickerReact-search').type('smile')
    cy.get('[data-unified="1f60a"]').first().click()
    
    // Verify emoji was inserted
    cy.get('[contenteditable="true"]').should('contain', '😊')
  })

  it('should maintain emoji when copying to clipboard', () => {
    cy.get('[data-testid="emoji-button"]').click()
    cy.get('[data-unified="1f60a"]').first().click()
    
    cy.get('[data-testid="copy-button"]').click()
    cy.get('[data-testid="success-message"]').should('be.visible')
    
    // Verify clipboard content (requires enabling clipboard in cypress config)
    cy.window().then((win) => {
      win.navigator.clipboard.readText().then((text) => {
        expect(text).to.include('😊')
      })
    })
  })

  it('should show recently used emojis', () => {
    // Usar un emoji
    cy.get('button[title="Emojis"]').click()
    cy.get('[data-unified="1f60a"]').first().click()
    
    // Abrir el picker de nuevo
    cy.get('button[title="Emojis"]').click()
    
    // Verificar sección de recientes
    cy.get('.EmojiPickerReact').within(() => {
      cy.contains('Recently Used').should('be.visible')
      cy.get('[data-unified="1f60a"]').should('be.visible')
    })
  })

  it('should filter emojis by category', () => {
    cy.get('[data-testid="emoji-button"]').click()
    
    // Click on smileys category
    cy.get('.EmojiPickerReact-category-nav button').first().click()
    cy.get('[data-unified="1f60a"]').should('be.visible')
  })

  it('should handle search with no results', () => {
    cy.get('[data-testid="emoji-button"]').click()
    cy.get('.EmojiPickerReact-search').type('nonexistentemoji')
    cy.get('.EmojiPickerReact-no-results').should('be.visible')
  })

  it('should close emoji picker when clicking outside', () => {
    cy.get('[data-testid="emoji-button"]').click()
    cy.get('.EmojiPickerReact').should('be.visible')
    
    cy.get('body').click(0, 0) // Click outside
    cy.get('.EmojiPickerReact').should('not.exist')
  })
}) 