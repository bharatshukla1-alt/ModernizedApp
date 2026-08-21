describe('Customer Relationship Management - Customer Module (BNK1CCM / BNK1DCM)', () => {
  beforeEach(() => {
    cy.login('GLOBAL_CORP', 'crm_operator', 'SecurePass123!');
  });

  it('should register a new customer successfully (BNK1CCM)', () => {
    cy.selectMenuOption('CCM');
    cy.get('[data-testid="page-title"]').should('contain', 'Create Customer');

    cy.get('[data-testid="company"]').should('have.value', 'GLOBAL_CORP');
    cy.get('[data-testid="custtit"]').select('Mr');
    cy.get('[data-testid="christn"]').type('John');
    cy.get('[data-testid="custins"]').type('A');
    cy.get('[data-testid="custsn"]').type('Doe');
    cy.get('[data-testid="custad1"]').type('100 Financial Way');
    cy.get('[data-testid="custad2"]').type('Suite 400');
    cy.get('[data-testid="city"]').type('New York');
    cy.get('[data-testid="postcode"]').type('10001');
    cy.get('[data-testid="country"]').type('USA');
    
    cy.get('[data-testid="dobdd"]').type('15');
    cy.get('[data-testid="dobmm"]').type('08');
    cy.get('[data-testid="dobyy"]').type('1985');
    
    cy.get('[data-testid="sortc"]').type('123456');
    cy.get('[data-testid="credsc"]').type('750');
    cy.get('[data-testid="scrdtdd"]').type('01');
    cy.get('[data-testid="scrdtmm"]').type('01');
    cy.get('[data-testid="scrdtyy"]').type('2024');

    cy.get('[data-testid="submit-btn"]').click();

    cy.get('[data-testid="message"]').should('contain', 'Customer created successfully');
    cy.get('[data-testid="custno2"]').invoke('val').should('not.be.empty');
  });

  it('should query and delete an existing customer (BNK1DCM)', () => {
    cy.selectMenuOption('DCM');
    cy.get('[data-testid="page-title"]').should('contain', 'Delete Customer');

    cy.get('[data-testid="custno"]').type('CUST100001');
    cy.get('[data-testid="search-btn"]').click();

    cy.get('[data-testid="custfnam"]').should('have.value', 'John');
    cy.get('[data-testid="custlnam"]').should('have.value', 'Doe');
    cy.get('[data-testid="credsc"]').should('have.value', '750');

    cy.get('[data-testid="delete-btn"]').click();
    cy.get('[data-testid="confirm-modal-btn"]').click();

    cy.get('[data-testid="message"]').should('contain', 'Customer record deleted');
  });
});
