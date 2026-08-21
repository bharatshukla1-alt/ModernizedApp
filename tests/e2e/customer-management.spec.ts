import { test, expect } from '@playwright/test';

test.describe('Customer Management (BNK1CCM, BNK1DCM, BNK1ACC)', () => {
  test('should create a new customer (BNK1CCM)', async ({ page }) => {
    await page.goto('/customers/create');

    await page.fill('[data-testid="field-COMPANY"]', 'BNK1');
    await page.selectOption('[data-testid="field-CUSTTIT"]', 'MR');
    await page.fill('[data-testid="field-CHRISTN"]', 'John');
    await page.fill('[data-testid="field-CUSTINS"]', 'A');
    await page.fill('[data-testid="field-CUSTSN"]', 'Doe');
    await page.fill('[data-testid="field-CUSTAD1"]', '123 High Street');
    await page.fill('[data-testid="field-CUSTAD2"]', 'Suite 4B');
    await page.fill('[data-testid="field-CITY"]', 'London');
    await page.fill('[data-testid="field-POSTCODE"]', 'EC1A 1BB');
    await page.fill('[data-testid="field-COUNTRY"]', 'UK');
    
    await page.fill('[data-testid="field-DOBDD"]', '15');
    await page.fill('[data-testid="field-DOBMM"]', '08');
    await page.fill('[data-testid="field-DOBYY"]', '1985');
    
    await page.fill('[data-testid="field-SORTC"]', '123456');
    await page.fill('[data-testid="field-CREDSC"]', '750');

    await page.click('[data-testid="submit-btn"]');

    const message = page.locator('[data-testid="field-MESSAGE"]');
    await expect(message).toContainText('CUSTOMER CREATED SUCCESSFULLY');
    await expect(page.locator('[data-testid="field-CUSTNO2"]')).not.toBeEmpty();
  });

  test('should query customer details by customer number (BNK1ACC)', async ({ page }) => {
    await page.goto('/customers/search');

    await page.fill('[data-testid="field-COMPANY"]', 'BNK1');
    await page.fill('[data-testid="field-CUSTNO"]', '10000234');
    await page.click('[data-testid="search-btn"]');

    await expect(page.locator('[data-testid="customer-details"]')).toBeVisible();
    await expect(page.locator('[data-testid="field-ACCOUNT"]')).toBeVisible();
    await expect(page.locator('[data-testid="field-MESSAGE"]')).toContainText('RECORD FOUND');
  });

  test('should display customer details screen (BNK1DCM)', async ({ page }) => {
    await page.goto('/customers/details/10000234');

    await expect(page.locator('[data-testid="field-CUSTFNAM"]')).toHaveValue('John');
    await expect(page.locator('[data-testid="field-CUSTLNAM"]')).toHaveValue('Doe');
    await expect(page.locator('[data-testid="field-CUSTCITY"]')).toHaveValue('London');
    await expect(page.locator('[data-testid="field-CREDSC"]')).toHaveValue('750');
  });
});