import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { CashDepositData } from '../fixtures/test-data';

export class CashDepositPage extends BasePage {
  readonly accNoInput: Locator;
  readonly signInput: Locator;
  readonly amountInput: Locator;
  readonly sortCodeInput: Locator;
  readonly availableBalDisplay: Locator;
  readonly actualBalDisplay: Locator;

  constructor(page: Page) {
    super(page);
    this.accNoInput = page.locator('[data-test="field-accno"]');
    this.signInput = page.locator('[data-test="field-sign"]');
    this.amountInput = page.locator('[data-test="field-amt"]');
    this.sortCodeInput = page.locator('[data-test="field-sortc"]');
    this.availableBalDisplay = page.locator('[data-test="field-avbal"]');
    this.actualBalDisplay = page.locator('[data-test="field-actbal"]');
  }

  async navigateToCashMaintenance(): Promise<void> {
    await this.navigateTo('/cash-maintenance');
  }

  async processTransaction(data: CashDepositData): Promise<void> {
    await this.accNoInput.fill(data.accNo);
    await this.signInput.fill(data.sign);
    await this.amountInput.fill(data.amount);
    await this.sortCodeInput.fill(data.sortCode);
    await this.submitForm();
  }

  async verifyResultingBalances(availBal: string, actBal: string): Promise<void> {
    await expect(this.availableBalDisplay).toHaveValue(availBal);
    await expect(this.actualBalDisplay).toHaveValue(actBal);
  }
}