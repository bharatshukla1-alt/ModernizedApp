import { test, expect } from '@playwright/test';
import { FundTransferPage } from '../pages/fund-transfer.page';
import { TEST_TRANSFER, TEST_B2M_TRANSFER } from '../fixtures/test-data';

test.describe('Fund Transfer Workflows (BNK1TFM & BNK1B2M)', () => {
  let transferPage: FundTransferPage;

  test.beforeEach(async ({ page }) => {
    transferPage = new FundTransferPage(page);
  });

  test('should process direct account to account transfer', async () => {
    await transferPage.navigateToDirectTransfer();
    await transferPage.executeDirectTransfer(TEST_TRANSFER);
    await transferPage.verifySystemMessage('TRANSFER COMPLETED SUCCESSFULLY');
    await transferPage.verifyUpdatedTransferBalances(
      TEST_TRANSFER.fromActualBal!,
      TEST_TRANSFER.toActualBal!
    );
  });

  test('should execute multi-segment bank to bank transfer', async () => {
    await transferPage.navigateToBankToBankTransfer();
    await transferPage.executeBankToBankTransfer(TEST_B2M_TRANSFER);
    await transferPage.verifySystemMessage('BANK TO BANK TRANSFER PROCESSED');
  });

  test('should reject transfer when amount exceeds limit', async () => {
    await transferPage.navigateToDirectTransfer();
    await transferPage.executeDirectTransfer({ ...TEST_TRANSFER, amount: '99999999.00' });
    await transferPage.verifySystemMessage('INSUFFICIENT FUNDS FOR TRANSFER');
  });
});