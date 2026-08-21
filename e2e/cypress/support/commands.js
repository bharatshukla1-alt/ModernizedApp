Cypress.Commands.add('login', (company = 'GLOBAL_CORP', username = 'admin', password = 'password123') => {
  cy.visit('/login');
  cy.get('[data-testid="company-input"]').clear().type(company);
  cy.get('[data-testid="username-input"]').clear().type(username);
  cy.get('[data-testid="password-input"]').clear().type(password);
  cy.get('[data-testid="login-btn"]').click();
  cy.get('[data-testid="main-menu"]').should('be.visible');
});

Cypress.Commands.add('selectMenuOption', (actionCode) => {
  cy.get('[data-testid="menu-action-input"]').clear().type(actionCode);
  cy.get('[data-testid="menu-submit-btn"]').click();
});
