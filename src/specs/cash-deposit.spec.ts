import { test, expect } from '@playwright/test';
import { CashDepositPage } from '../pages/cash-deposit.page';
import { TEST_DEPOSIT } from '../fixtures/test-data';

test.describe('Cash Deposit & Debit Maintenance (BNK1CDM)', () => {
  let cashPage: CashDepositPage;

  test.beforeEach(async ({ page }) => {
    cashPage = new CashDepositPage(page);
    await cashPage.navigateToCashMaintenance();
  });

  test('should process cash deposit (+ sign) successfully', async () => {
    await cashPage.processTransaction(TEST_DEPOSIT);
    await cashPage.verifySystemMessage('CASH DEPOSIT PROCESSED');
    await cashPage.verifyResultingBalances(TEST_DEPOSIT.availableBalance, TEST_DEPOSIT.actualBalance);
  });

  test('should process cash withdrawal (- sign) successfully', async () => {
    const withdrawal = {
      ...TEST_DEPOSIT,
      sign: '-' as const,
      amount: '100.00',
      availableBalance: '2400.00',
      actualBalance: '2400.00'
    };
    await cashPage.processTransaction(withdrawal);
    await cashPage.verifySystemMessage('CASH DEBIT PROCESSED');
    await cashPage.verifyResultingBalances('2400.00', '2400.00');
  });

  test('should fail when account number is invalid', async () => {
    const invalidTx = { ...TEST_DEPOSIT, accNo: '00000000' };
    await cashPage.processTransaction(invalidTx);
    await cashPage.verifySystemMessage('ACCOUNT NOT FOUND');
  });
});