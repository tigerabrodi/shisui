beforeEach(() => {
  cy.visit('/')
  cy.clearCookies()
})

it('Cookie should be set and user authenticated.', () => {
  cy.findByRole('heading', { name: 'Shisui' }).should('exist')
  cy.visit('/test/auth/callback')
  cy.findByRole('heading', { name: 'Assessments' }).should('exist')
})
