import { test, expect } from '@playwright/test';
import { CustomerManagementPage } from '../pages/customer-management.page';
import { TEST_CUSTOMER } from '../fixtures/test-data';

test.describe('Customer Management Workflows (BNK1CCM & BNK1DCM)', () => {
  let custPage: CustomerManagementPage;

  test.beforeEach(async ({ page }) => {
    custPage = new CustomerManagementPage(page);
  });

  test('should successfully register a new customer profile', async () => {
    await custPage.navigateToCreateCustomer();
    await custPage.fillCustomerForm(TEST_CUSTOMER);
    await custPage.submitForm();
    await custPage.verifySystemMessage('CUSTOMER CREATED SUCCESSFULLY');
  });

  test('should validate customer fields on creation', async () => {
    await custPage.navigateToCreateCustomer();
    await custPage.fillCustomerForm({ ...TEST_CUSTOMER, firstName: '' });
    await custPage.submitForm();
    await custPage.verifySystemMessage('FIRST NAME IS REQUIRED');
  });

  test('should retrieve customer details on delete lookup screen', async () => {
    await custPage.navigateToDeleteCustomer(TEST_CUSTOMER.custNo);
    await custPage.verifyCustomerDetails(TEST_CUSTOMER);
  });

  test('should delete customer profile after confirmation', async () => {
    await custPage.navigateToDeleteCustomer(TEST_CUSTOMER.custNo);
    await custPage.confirmDeleteCustomer();
    await custPage.verifySystemMessage('CUSTOMER DELETED SUCCESSFULLY');
  });
});