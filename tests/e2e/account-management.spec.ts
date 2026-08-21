import { test, expect } from '@playwright/test';

test.describe('Account Management (BNK1CAM, BNK1DAM, BNK1UAM, BNK1CDM)', () => {
  test('should create a new bank account (BNK1CAM)', async ({ page }) => {
    await page.goto('/accounts/create');

    await page.fill('[data-testid="field-COMPANY"]', 'BNK1');
    await page.fill('[data-testid="field-CUSTNO"]', '10000234');
    await page.selectOption('[data-testid="field-ACCTYP"]', 'SAV');
    await page.fill('[data-testid="field-INTRT"]', '02.50');
    await page.fill('[data-testid="field-OVERDR"]', '00500.00');
    await page.fill('[data-testid="field-SRTCD"]', '123456');
    
    await page.fill('[data-testid="field-OPENDD"]', '01');
    await page.fill('[data-testid="field-OPENMM"]', '01');
    await page.fill('[data-testid="field-OPENYY"]', '2023');

    await page.click('[data-testid="submit-btn"]');

    await expect(page.locator('[data-testid="field-MESSAGE"]')).toContainText('ACCOUNT OPENED SUCCESSFULLY');
    await expect(page.locator('[data-testid="field-ACCNO"]')).not.toBeEmpty();
  });

  test('should update existing account details (BNK1UAM)', async ({ page }) => {
    await page.goto('/accounts/update/87654321');

    await page.fill('[data-testid="field-OVERDR"]', '01000.00');
    await page.fill('[data-testid="field-INTRT"]', '03.00');
    
    await page.click('[data-testid="update-btn"]');

    await expect(page.locator('[data-testid="field-MESSAGE"]')).toContainText('ACCOUNT UPDATED');
    await expect(page.locator('[data-testid="field-OVERDR"]')).toHaveValue('01000.00');
  });

  test('should perform cash deposit transaction (BNK1CDM)', async ({ page }) => {
    await page.goto('/accounts/deposit-withdraw');

    await page.fill('[data-testid="field-COMPANY"]', 'BNK1');
    await page.fill('[data-testid="field-ACCNO"]', '87654321');
    await page.selectOption('[data-testid="field-SIGN"]', '+');
    await page.fill('[data-testid="field-AMT"]', '250.00');
    await page.fill('[data-testid="field-SORTC"]', '123456');

    await page.click('[data-testid="process-btn"]');

    await expect(page.locator('[data-testid="field-MESSAGE"]')).toContainText('TRANSACTION PROCESSED');
    await expect(page.locator('[data-testid="field-AVBAL"]')).not.toBeEmpty();
    await expect(page.locator('[data-testid="field-ACTBAL"]')).not.toBeEmpty();
  });
});