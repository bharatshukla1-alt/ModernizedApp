import { test, expect } from '@playwright/test';
import { AccountManagementPage } from '../pages/account-management.page';
import { TEST_ACCOUNT } from '../fixtures/test-data';

test.describe('Account Management Workflows (BNK1CAM, BNK1DAM, BNK1UAM, BNK1ACC)', () => {
  let accPage: AccountManagementPage;

  test.beforeEach(async ({ page }) => {
    accPage = new AccountManagementPage(page);
  });

  test('should create new customer account successfully', async () => {
    await accPage.navigateToCreateAccount();
    await accPage.fillAccountForm(TEST_ACCOUNT);
    await accPage.submitForm();
    await accPage.verifySystemMessage('ACCOUNT CREATED SUCCESSFULLY');
  });

  test('should lookup account using BNK1ACC screen parameters', async () => {
    await accPage.navigateToAccountLookup();
    await accPage.searchAccount(TEST_ACCOUNT.custNo, TEST_ACCOUNT.accNo);
    await accPage.verifyAccountDetails(TEST_ACCOUNT);
  });

  test('should update interest rate and overdraft limit', async () => {
    await accPage.navigateToUpdateAccount(TEST_ACCOUNT.accNo);
    await accPage.interestRateInput.fill('3.75');
    await accPage.overdraftLimitInput.fill('1000.00');
    await accPage.submitForm();
    await accPage.verifySystemMessage('ACCOUNT UPDATED SUCCESSFULLY');
  });

  test('should remove account via delete maintenance view', async () => {
    await accPage.navigateToDeleteAccount(TEST_ACCOUNT.accNo);
    await accPage.submitForm();
    await accPage.verifySystemMessage('ACCOUNT CLOSED SUCCESSFULLY');
  });
});