import { test, expect } from '@playwright/test';

test.describe('CRM Playwright - Account Management (BNK1CAM / BNK1UAM / BNK1CDM / BNK1DAM)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.locator('[data-testid="company-input"]').fill('GLOBAL_CORP');
    await page.locator('[data-testid="username-input"]').fill('account_mgr');
    await page.locator('[data-testid="password-input"]').fill('SecurePass123!');
    await page.locator('[data-testid="login-btn"]').click();
  });

  test('Open new Account flow', async ({ page }) => {
    await page.locator('[data-testid="menu-action-input"]').fill('CAM');
    await page.locator('[data-testid="menu-submit-btn"]').click();

    await page.locator('[data-testid="custno"]').fill('CUST100002');
    await page.locator('[data-testid="acctyp"]').selectOption('Checking');
    await page.locator('[data-testid="intrt"]').fill('01.25');
    await page.locator('[data-testid="overdr"]').fill('000500.00');
    await page.locator('[data-testid="srtcd"]').fill('123456');
    await page.locator('[data-testid="opendd"]').fill('01');
    await page.locator('[data-testid="openmm"]').fill('01');
    await page.locator('[data-testid="openyy"]').fill('2024');
    await page.locator('[data-testid="avail"]').fill('1000.00');
    await page.locator('[data-testid="actbal"]').fill('1000.00');

    await page.locator('[data-testid="submit-btn"]').click();
    await expect(page.locator('[data-testid="message"]')).toContainText('Account opened successfully');
  });

  test('Cash Deposit Maintenance', async ({ page }) => {
    await page.locator('[data-testid="menu-action-input"]').fill('CDM');
    await page.locator('[data-testid="menu-submit-btn"]').click();

    await page.locator('[data-testid="accno"]').fill('ACC200001');
    await page.locator('[data-testid="sortc"]').fill('123456');
    await page.locator('[data-testid="sign"]').selectOption('+');
    await page.locator('[data-testid="amt"]').fill('300.00');

    await page.locator('[data-testid="submit-btn"]').click();
    await expect(page.locator('[data-testid="message"]')).toContainText('Transaction processed successfully');
  });

  test('Update Account parameters', async ({ page }) => {
    await page.locator('[data-testid="menu-action-input"]').fill('UAM');
    await page.locator('[data-testid="menu-submit-btn"]').click();

    await page.locator('[data-testid="accno"]').fill('ACC200001');
    await page.locator('[data-testid="search-btn"]').click();

    await page.locator('[data-testid="intrt"]').fill('02.10');
    await page.locator('[data-testid="save-btn"]').click();
    await expect(page.locator('[data-testid="message"]')).toContainText('Account updated successfully');
  });
});
