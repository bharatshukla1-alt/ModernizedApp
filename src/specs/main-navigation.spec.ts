import { test, expect } from '@playwright/test';
import { NavigationPage } from '../pages/navigation.page';

test.describe('Main Menu Navigation Suite (BNK1MAI)', () => {
  let navPage: NavigationPage;

  test.beforeEach(async ({ page }) => {
    navPage = new NavigationPage(page);
    await navPage.navigateToMainMenu();
  });

  test('should display company header correctly', async () => {
    await navPage.verifyCompanyHeader('GLOBAL_BANK');
  });

  test('should navigate to Customer Maintenance screen', async ({ page }) => {
    await navPage.goToCustomerMaintenance();
    await expect(page).toHaveURL(/.*\/customers/);
  });

  test('should navigate to Account Maintenance screen', async ({ page }) => {
    await navPage.goToAccountMaintenance();
    await expect(page).toHaveURL(/.*\/accounts/);
  });

  test('should navigate to Cash Deposit screen', async ({ page }) => {
    await navPage.goToCashDeposit();
    await expect(page).toHaveURL(/.*\/cash-maintenance/);
  });

  test('should navigate to Direct Transfer screen', async ({ page }) => {
    await navPage.goToTransferMoney();
    await expect(page).toHaveURL(/.*\/transfers\/direct/);
  });

  test('should navigate to Bank To Bank Transfer screen', async ({ page }) => {
    await navPage.goToBankTransfer();
    await expect(page).toHaveURL(/.*\/transfers\/bank-to-bank/);
  });

  test('should execute legacy action code 01 for customer create', async ({ page }) => {
    await navPage.selectActionByCode('01');
    await expect(page).toHaveURL(/.*\/customers\/create/);
  });
});