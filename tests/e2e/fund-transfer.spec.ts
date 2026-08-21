import { test, expect } from '@playwright/test';

test.describe('Fund Transfers (BNK1TFM & BNK1B2M)', () => {
  test('should execute standard transfer between two accounts (BNK1TFM)', async ({ page }) => {
    await page.goto('/transfers/standard');

    await page.fill('[data-testid="field-COMPANY"]', 'BNK1');
    await page.fill('[data-testid="field-FACCNO"]', '87654321');
    await page.fill('[data-testid="field-FSORTC"]', '123456');
    await page.fill('[data-testid="field-TACCNO"]', '87654322');
    await page.fill('[data-testid="field-TSORTC"]', '123456');
    await page.fill('[data-testid="field-AMT"]', '150.00');

    await page.click('[data-testid="transfer-btn"]');

    await expect(page.locator('[data-testid="field-MESSAGE"]')).toContainText('TRANSFER COMPLETED');
    await expect(page.locator('[data-testid="field-FACTBAL"]')).toBeVisible();
    await expect(page.locator('[data-testid="field-TACTBAL"]')).toBeVisible();
  });

  test('should execute batch transfer with status flags (BNK1B2M)', async ({ page }) => {
    await page.goto('/transfers/batch');

    await page.fill('[data-testid="field-COMPANY"]', 'BNK1');
    await page.fill('[data-testid="field-FSCDE1"]', '01');
    await page.fill('[data-testid="field-FACCNO"]', '87654321');
    await page.fill('[data-testid="field-TSCDE1"]', '02');
    await page.fill('[data-testid="field-TACCNO"]', '87654322');
    await page.fill('[data-testid="field-AMT"]', '500.00');
    await page.selectOption('[data-testid="field-ACTSIGN"]', '+');

    await page.click('[data-testid="execute-batch-btn"]');

    await expect(page.locator('[data-testid="field-MESSAGE"]')).toContainText('BATCH TRANSFER SUCCESS');
    await expect(page.locator('[data-testid="field-ACTPND"]')).toBeVisible();
  });
});