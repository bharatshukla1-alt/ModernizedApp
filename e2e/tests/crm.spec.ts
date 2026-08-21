import { test, expect } from '@playwright/test';

test.describe('ModernizedApp CRM E2E Tests', () => {
  test('should display customer list and header', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.navbar-brand')).toContainText('ModernizedApp CRM');
    await expect(page.locator('h2')).toContainText('Customer Directory');
  });

  test('should navigate to accounts page', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Accounts');
    await expect(page.locator('h2')).toContainText('Accounts Maintenance');
  });

  test('should navigate to transfers page', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Transfers');
    await expect(page.locator('h5').first()).toContainText('Transfer Funds');
  });
});