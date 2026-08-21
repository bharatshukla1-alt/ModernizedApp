import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class NavigationPage extends BasePage {
  readonly actionInput: Locator;
  readonly executeButton: Locator;
  readonly menuOptionCustomerMaintenance: Locator;
  readonly menuOptionAccountMaintenance: Locator;
  readonly menuOptionCashDeposit: Locator;
  readonly menuOptionTransferMoney: Locator;
  readonly menuOptionBankTransfer: Locator;
  readonly menuOptionLookupAccount: Locator;

  constructor(page: Page) {
    super(page);
    this.actionInput = page.locator('[data-test="field-action"]');
    this.executeButton = page.locator('[data-test="btn-execute-action"]');
    this.menuOptionCustomerMaintenance = page.locator('[data-test="menu-cust-maint"]');
    this.menuOptionAccountMaintenance = page.locator('[data-test="menu-acc-maint"]');
    this.menuOptionCashDeposit = page.locator('[data-test="menu-cash-dep"]');
    this.menuOptionTransferMoney = page.locator('[data-test="menu-transfer"]');
    this.menuOptionBankTransfer = page.locator('[data-test="menu-b2m-transfer"]');
    this.menuOptionLookupAccount = page.locator('[data-test="menu-acc-lookup"]');
  }

  async navigateToMainMenu(): Promise<void> {
    await this.navigateTo('/main-menu');
  }

  async selectActionByCode(code: string): Promise<void> {
    await this.actionInput.fill(code);
    await this.executeButton.click();
  }

  async goToCustomerMaintenance(): Promise<void> {
    await this.menuOptionCustomerMaintenance.click();
  }

  async goToAccountMaintenance(): Promise<void> {
    await this.menuOptionAccountMaintenance.click();
  }

  async goToCashDeposit(): Promise<void> {
    await this.menuOptionCashDeposit.click();
  }

  async goToTransferMoney(): Promise<void> {
    await this.menuOptionTransferMoney.click();
  }

  async goToBankTransfer(): Promise<void> {
    await this.menuOptionBankTransfer.click();
  }

  async goToLookupAccount(): Promise<void> {
    await this.menuOptionLookupAccount.click();
  }
}