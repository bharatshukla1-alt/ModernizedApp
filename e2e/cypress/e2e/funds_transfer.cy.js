describe('Customer Relationship Management - Funds Transfer Module (BNK1TFM / BNK1B2M)', () => {
  beforeEach(() => {
    cy.login('GLOBAL_CORP', 'transfer_clerk', 'SecurePass123!');
  });

  it('should execute direct single funds transfer (BNK1TFM)', () => {
    cy.selectMenuOption('TFM');
    cy.get('[data-testid="page-title"]').should('contain', 'Transfer Funds');

    cy.get('[data-testid="faccno"]').type('ACC200001');
    cy.get('[data-testid="fsortc"]').type('123456');
    cy.get('[data-testid="taccno"]').type('ACC200002');
    cy.get('[data-testid="tsortc"]').type('654321');
    cy.get('[data-testid="amt"]').type('150.00');

    cy.get('[data-testid="transfer-btn"]').click();

    cy.get('[data-testid="message"]').should('contain', 'Transfer completed successfully');
    cy.get('[data-testid="factbal"]').should('be.visible');
    cy.get('[data-testid="tactbal"]').should('be.visible');
  });

  it('should process batch transfer with pending status codes (BNK1B2M)', () => {
    cy.selectMenuOption('B2M');
    cy.get('[data-testid="page-title"]').should('contain', 'Batch Transfer');

    cy.get('[data-testid="faccno"]').type('ACC200001');
    cy.get('[data-testid="fscde1"]').type('01');
    cy.get('[data-testid="fscde2"]').type('02');
    cy.get('[data-testid="fscde3"]').type('03');

    cy.get('[data-testid="taccno"]').type('ACC200002');
    cy.get('[data-testid="tscde1"]').type('10');
    cy.get('[data-testid="tscde2"]').type('20');
    cy.get('[data-testid="tscde3"]').type('30');

    cy.get('[data-testid="amt"]').type('500.00');
    cy.get('[data-testid="actsign"]').select('+');
    cy.get('[data-testid="avasign"]').select('+');

    cy.get('[data-testid="submit-batch-btn"]').click();

    cy.get('[data-testid="message"]').should('contain', 'Batch transfer submitted');
    cy.get('[data-testid="actpnd"]').should('be.visible');
    cy.get('[data-testid="avapnd"]').should('be.visible');
  });
});
