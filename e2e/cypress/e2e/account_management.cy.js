describe('Customer Relationship Management - Account Module (BNK1CAM / BNK1UAM / BNK1CDM / BNK1DAM)', () => {
  beforeEach(() => {
    cy.login('GLOBAL_CORP', 'account_mgr', 'SecurePass123!');
  });

  it('should open a new account for customer (BNK1CAM)', () => {
    cy.selectMenuOption('CAM');
    cy.get('[data-testid="page-title"]').should('contain', 'Create Account');

    cy.get('[data-testid="custno"]').type('CUST100002');
    cy.get('[data-testid="acctyp"]').select('Savings');
    cy.get('[data-testid="intrt"]').type('03.50');
    cy.get('[data-testid="overdr"]').type('001000.00');
    cy.get('[data-testid="srtcd"]').type('123456');
    cy.get('[data-testid="opendd"]').type('10');
    cy.get('[data-testid="openmm"]').type('02');
    cy.get('[data-testid="openyy"]').type('2024');
    cy.get('[data-testid="avail"]').type('5000.00');
    cy.get('[data-testid="actbal"]').type('5000.00');

    cy.get('[data-testid="submit-btn"]').click();
    cy.get('[data-testid="message"]').should('contain', 'Account opened successfully');
    cy.get('[data-testid="accno"]').invoke('val').should('not.be.empty');
  });

  it('should deposit cash into account (BNK1CDM)', () => {
    cy.selectMenuOption('CDM');
    cy.get('[data-testid="page-title"]').should('contain', 'Cash Deposit/Withdrawal');

    cy.get('[data-testid="accno"]').type('ACC200001');
    cy.get('[data-testid="sortc"]').type('123456');
    cy.get('[data-testid="sign"]').select('+');
    cy.get('[data-testid="amt"]').type('250.00');

    cy.get('[data-testid="submit-btn"]').click();

    cy.get('[data-testid="message"]').should('contain', 'Transaction processed successfully');
    cy.get('[data-testid="actbal"]').should('not.be.empty');
  });

  it('should update account parameters (BNK1UAM)', () => {
    cy.selectMenuOption('UAM');
    cy.get('[data-testid="accno"]').type('ACC200001');
    cy.get('[data-testid="search-btn"]').click();

    cy.get('[data-testid="intrt"]').clear().type('04.25');
    cy.get('[data-testid="overdr"]').clear().type('002000.00');
    cy.get('[data-testid="save-btn"]').click();

    cy.get('[data-testid="message"]').should('contain', 'Account updated successfully');
  });

  it('should delete account when balance is zero (BNK1DAM)', () => {
    cy.selectMenuOption('DAM');
    cy.get('[data-testid="accno"]').type('ACC200009');
    cy.get('[data-testid="search-btn"]').click();
    cy.get('[data-testid="actbal"]').should('have.value', '0.00');

    cy.get('[data-testid="delete-btn"]').click();
    cy.get('[data-testid="message"]').should('contain', 'Account closed and deleted');
  });
});
