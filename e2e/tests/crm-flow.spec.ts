import { test, expect, Page } from '@playwright/test';

async function performLogin(page: Page) {
  await page.goto('/login');
  await page.fill('[data-testid="username"]', 'admin');
  await page.fill('[data-testid="password"]', 'AdminPass123!');
  await page.click('[data-testid="login-btn"]');
  await page.waitForURL('/dashboard');
  await expect(page.locator('[data-testid="dashboard-header"]')).toContainText('Management Dashboard');
}

test.describe('Customer Relationship Management - E2E Playwright Suite', () => {
  test.beforeEach(async ({ page }) => {
    await performLogin(page);
  });

  test('Create a new customer profile successfully using legacy map specifications (BNK1CCM)', async ({ page }) => {
    await page.click('[data-testid="nav-bnk1ccm"]');
    await expect(page.locator('[data-testid="mapset-title"]')).toContainText('BNK1CCM');

    await page.fill('[data-testid="COMPANY"]', 'Global Bank Corp');
    await page.fill('[data-testid="CUSTTIT"]', 'Mr.');
    await page.fill('[data-testid="CHRISTN"]', 'John');
    await page.fill('[data-testid="CUSTINS"]', 'Alan');
    await page.fill('[data-testid="CUSTSN"]', 'Doe');
    await page.fill('[data-testid="CUSTAD1"]', '123 Main Street');
    await page.fill('[data-testid="CUSTAD2"]', 'Suite 400');
    await page.fill('[data-testid="CITY"]', 'New York');
    await page.fill('[data-testid="POSTCODE"]', '10001');
    await page.fill('[data-testid="COUNTRY"]', 'USA');
    await page.fill('[data-testid="DOBDD"]', '15');
    await page.fill('[data-testid="DOBMM"]', '08');
    await page.fill('[data-testid="DOBYY"]', '1985');
    await page.fill('[data-testid="SORTC"]', '12-34-56');
    await page.fill('[data-testid="CREDSC"]', '750');
    await page.fill('[data-testid="SCRDTDD"]', '01');
    await page.fill('[data-testid="SCRDTMM"]', '01');
    await page.fill('[data-testid="SCRDTYY"]', '2023');

    await page.click('[data-testid="submit-customer-btn"]');

    const messageLocator = page.locator('[data-testid="MESSAGE"]');
    await expect(messageLocator).toBeVisible();
    await expect(messageLocator).toHaveText('Customer profile created successfully');

    const custNoLocator = page.locator('[data-testid="CUSTNO2"]');
    await expect(custNoLocator).toBeVisible();
    const generatedCustNo = await custNoLocator.textContent();
    expect(generatedCustNo).not.toBeNull();
    expect(generatedCustNo?.trim().length).toBeGreaterThan(0);
  });

  test('Retrieve and view account details for an existing customer (BNK1CAM)', async ({ page }) => {
    await page.click('[data-testid="nav-bnk1cam"]');
    await expect(page.locator('[data-testid="mapset-title"]')).toContainText('BNK1CAM');

    await page.fill('[data-testid="CUSTNO"]', 'CUST100982');
    await page.fill('[data-testid="ACCNO"]', 'ACC98765432');
    await page.click('[data-testid="lookup-btn"]');

    await expect(page.locator('[data-testid="COMPANY"]')).toHaveValue('Global Bank Corp');
    await expect(page.locator('[data-testid="ACCTYP"]')).toHaveValue('SAVINGS');
    await expect(page.locator('[data-testid="INTRT"]')).toHaveValue('2.50');
    await expect(page.locator('[data-testid="OVERDR"]')).toHaveValue('500.00');
    await expect(page.locator('[data-testid="SRTCD"]')).toHaveValue('12-34-56');
    await expect(page.locator('[data-testid="OPENDD"]')).toHaveValue('10');
    await expect(page.locator('[data-testid="OPENMM"]')).toHaveValue('05');
    await expect(page.locator('[data-testid="OPENYY"]')).toHaveValue('2020');
    await expect(page.locator('[data-testid="LSTMDD"]')).toHaveValue('01');
    await expect(page.locator('[data-testid="LSTMMM"]')).toHaveValue('10');
    await expect(page.locator('[data-testid="LSTMYY"]')).toHaveValue('2023');
    await expect(page.locator('[data-testid="NSTMTDD"]')).toHaveValue('01');
    await expect(page.locator('[data-testid="NSTMTMM"]')).toHaveValue('11');
    await expect(page.locator('[data-testid="NSTMTYY"]')).toHaveValue('2023');
    await expect(page.locator('[data-testid="AVAIL"]')).toHaveValue('1250.50');
    await expect(page.locator('[data-testid="ACTBAL"]')).toHaveValue('1300.00');
  });

  test('Transfer funds between accounts using legacy map specs (BNK1TFM)', async ({ page }) => {
    await page.click('[data-testid="nav-bnk1tfm"]');
    await expect(page.locator('[data-testid="mapset-title"]')).toContainText('BNK1TFM');

    await page.fill('[data-testid="FACCNO"]', '11223344');
    await page.fill('[data-testid="FSORTC"]', '12-34-56');
    await page.fill('[data-testid="TACCNO"]', '55667788');
    await page.fill('[data-testid="TSORTC"]', '65-43-21');
    await page.fill('[data-testid="AMT"]', '250.00');

    await page.click('[data-testid="confirm-transfer-btn"]');

    await expect(page.locator('[data-testid="FACTBAL"]')).toHaveValue('750.00');
    await expect(page.locator('[data-testid="FAVBAL"]')).toHaveValue('750.00');
    await expect(page.locator('[data-testid="TACTBAL"]')).toHaveValue('1250.00');
    await expect(page.locator('[data-testid="TAVBAL"]')).toHaveValue('1250.00');
    await expect(page.locator('[data-testid="MESSAGE"]')).toHaveText('Transfer Completed Successfully');
  });

  test('Update account parameters and overdraft limits (BNK1UAM)', async ({ page }) => {
    await page.click('[data-testid="nav-bnk1uam"]');
    await expect(page.locator('[data-testid="mapset-title"]')).toContainText('BNK1UAM');

    await page.fill('[data-testid="ACCNO"]', 'ACC98765432');
    await page.fill('[data-testid="CUSTNO"]', 'CUST100982');
    await page.click('[data-testid="retrieve-account-btn"]');

    await page.fill('[data-testid="INTRT"]', '3.10');
    await page.fill('[data-testid="OVERDR"]', '1000.00');
    await page.click('[data-testid="submit-update-btn"]');

    await expect(page.locator('[data-testid="INTRT"]')).toHaveValue('3.10');
    await expect(page.locator('[data-testid="OVERDR"]')).toHaveValue('1000.00');
    await expect(page.locator('[data-testid="MESSAGE"]')).toHaveText('Account updated successfully');
  });
});