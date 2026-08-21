import { test, expect } from '@playwright/test';

describe('BNK1MAI - Main Menu & Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should render main menu options correctly', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Customer Relationship & Banking System');
    await expect(page.locator('[data-testid="nav-company"]')).toBeVisible();
    await expect(page.locator('[data-testid="nav-customer-create"]')).toBeVisible();
    await expect(page.locator('[data-testid="nav-account-create"]')).toBeVisible();
    await expect(page.locator('[data-testid="nav-fund-transfer"]')).toBeVisible();
  });

  test('should navigate to Customer Search (BNK1ACC) via Action Code', async ({ page }) => {
    await page.fill('[data-testid="action-code-input"]', 'ACC');
    await page.click('[data-testid="submit-action-btn"]');
    await expect(page).toHaveURL(/\/customers\/search/);
    await expect(page.locator('[data-testid="mapset-header"]')).toContainText('BNK1ACC');
  });

  test('should navigate to Customer Creation (BNK1CCM) via Action Code', async ({ page }) => {
    await page.fill('[data-testid="action-code-input"]', 'CCM');
    await page.click('[data-testid="submit-action-btn"]');
    await expect(page).toHaveURL(/\/customers\/create/);
    await expect(page.locator('[data-testid="mapset-header"]')).toContainText('BNK1CCM');
  });
});