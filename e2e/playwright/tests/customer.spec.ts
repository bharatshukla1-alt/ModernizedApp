import { test, expect } from '@playwright/test';

test.describe('CRM Playwright - Customer Management (BNK1CCM / BNK1DCM)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.locator('[data-testid="company-input"]').fill('GLOBAL_CORP');
    await page.locator('[data-testid="username-input"]').fill('crm_operator');
    await page.locator('[data-testid="password-input"]').fill('SecurePass123!');
    await page.locator('[data-testid="login-btn"]').click();
    await expect(page.locator('[data-testid="main-menu"]')).toBeVisible();
  });

  test('Create Customer flow', async ({ page }) => {
    await page.locator('[data-testid="menu-action-input"]').fill('CCM');
    await page.locator('[data-testid="menu-submit-btn"]').click();

    await expect(page.locator('[data-testid="company"]')).toHaveValue('GLOBAL_CORP');
    await page.locator('[data-testid="custtit"]').selectOption('Mrs');
    await page.locator('[data-testid="christn"]').fill('Jane');
    await page.locator('[data-testid="custins"]').fill('B');
    await page.locator('[data-testid="custsn"]').fill('Smith');
    await page.locator('[data-testid="custad1"]').fill('500 Enterprise Ave');
    await page.locator('[data-testid="custad2"]').fill('Suite 12');
    await page.locator('[data-testid="city"]').fill('Chicago');
    await page.locator('[data-testid="postcode"]').fill('60601');
    await page.locator('[data-testid="country"]').fill('USA');

    await page.locator('[data-testid="dobdd"]').fill('20');
    await page.locator('[data-testid="dobmm"]').fill('11');
    await page.locator('[data-testid="dobyy"]').fill('1990');

    await page.locator('[data-testid="sortc"]').fill('987654');
    await page.locator('[data-testid="credsc"]').fill('800');
    await page.locator('[data-testid="scrdtdd"]').fill('15');
    await page.locator('[data-testid="scrdtmm"]').fill('03');
    await page.locator('[data-testid="scrdtyy"]').fill('2024');

    await page.locator('[data-testid="submit-btn"]').click();
    await expect(page.locator('[data-testid="message"]')).toContainText('Customer created successfully');
  });

  test('Delete Customer flow', async ({ page }) => {
    await page.locator('[data-testid="menu-action-input"]').fill('DCM');
    await page.locator('[data-testid="menu-submit-btn"]').click();

    await page.locator('[data-testid="custno"]').fill('CUST100003');
    await page.locator('[data-testid="search-btn"]').click();

    await expect(page.locator('[data-testid="custfnam"]')).toBeVisible();
    await page.locator('[data-testid="delete-btn"]').click();
    await page.locator('[data-testid="confirm-modal-btn"]').click();

    await expect(page.locator('[data-testid="message"]')).toContainText('Customer record deleted');
  });
});
