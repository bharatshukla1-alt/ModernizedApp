import { test, expect } from '@playwright/test';

test.describe('CRM Playwright - Funds Transfer (BNK1TFM / BNK1B2M)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.locator('[data-testid="company-input"]').fill('GLOBAL_CORP');
    await page.locator('[data-testid="username-input"]').fill('transfer_clerk');
    await page.locator('[data-testid="password-input"]').fill('SecurePass123!');
    await page.locator('[data-testid="login-btn"]').click();
  });

  test('Direct Transfer flow', async ({ page }) => {
    await page.locator('[data-testid="menu-action-input"]').fill('TFM');
    await page.locator('[data-testid="menu-submit-btn"]').click();

    await page.locator('[data-testid="faccno"]').fill('ACC200001');
    await page.locator('[data-testid="fsortc"]').fill('123456');
    await page.locator('[data-testid="taccno"]').fill('ACC200002');
    await page.locator('[data-testid="tsortc"]').fill('654321');
    await page.locator('[data-testid="amt"]').fill('200.00');

    await page.locator('[data-testid="transfer-btn"]').click();
    await expect(page.locator('[data-testid="message"]')).toContainText('Transfer completed successfully');
  });

  test('Batch Transfer flow', async ({ page }) => {
    await page.locator('[data-testid="menu-action-input"]').fill('B2M');
    await page.locator('[data-testid="menu-submit-btn"]').click();

    await page.locator('[data-testid="faccno"]').fill('ACC200001');
    await page.locator('[data-testid="fscde1"]').fill('01');
    await page.locator('[data-testid="taccno"]').fill('ACC200002');
    await page.locator('[data-testid="tscde1"]').fill('02');
    await page.locator('[data-testid="amt"]').fill('1000.00');

    await page.locator('[data-testid="submit-batch-btn"]').click();
    await expect(page.locator('[data-testid="message"]')).toContainText('Batch transfer submitted');
  });
});
