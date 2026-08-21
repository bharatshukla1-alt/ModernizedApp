import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { AccountData } from '../fixtures/test-data';

export class AccountManagementPage extends BasePage {
  readonly custNoInput: Locator;
  readonly accountTypeSelect: Locator;
  readonly interestRateInput: Locator;
  readonly overdraftLimitInput: Locator;
  readonly accNoInput: Locator;
  readonly accNoDisplay: Locator;
  readonly sortCodeInput: Locator;
  readonly openDay: Locator;
  readonly openMonth: Locator;
  readonly openYear: Locator;
  readonly lastStmtDay: Locator;
  readonly lastStmtMonth: Locator;
  readonly lastStmtYear: Locator;
  readonly nextStmtDay: Locator;
  readonly nextStmtMonth: Locator;
  readonly nextStmtYear: Locator;
  readonly availableBalance: Locator;
  readonly actualBalance: Locator;
  readonly lookupAccNoInput: Locator;
  readonly lookupCustNoInput: Locator;
  readonly searchAccountButton: Locator;

  constructor(page: Page) {
    super(page);
    this.custNoInput = page.locator('[data-test="field-custno"]');
    this.accountTypeSelect = page.locator('[data-test="field-acctyp"]');
    this.interestRateInput = page.locator('[data-test="field-intrt"]');
    this.overdraftLimitInput = page.locator('[data-test="field-overdr"]');
    this.accNoInput = page.locator('[data-test="field-accno"]');
    this.accNoDisplay = page.locator('[data-test="field-accno2"]');
    this.sortCodeInput = page.locator('[data-test="field-srtcd"]');
    this.openDay = page.locator('[data-test="field-opendd"]');
    this.openMonth = page.locator('[data-test="field-openmm"]');
    this.openYear = page.locator('[data-test="field-openyy"]');
    this.lastStmtDay = page.locator('[data-test="field-lstmdd"]');
    this.lastStmtMonth = page.locator('[data-test="field-lstmmm"]');
    this.lastStmtYear = page.locator('[data-test="field-lstmyy"]');
    this.nextStmtDay = page.locator('[data-test="field-nstmtdd"]');
    this.nextStmtMonth = page.locator('[data-test="field-nstmtmm"]');
    this.nextStmtYear = page.locator('[data-test="field-nstmtyy"]');
    this.availableBalance = page.locator('[data-test="field-avail"]');
    this.actualBalance = page.locator('[data-test="field-actbal"]');
    this.lookupAccNoInput = page.locator('[data-test="field-lookup-account"]');
    this.lookupCustNoInput = page.locator('[data-test="field-lookup-custno"]');
    this.searchAccountButton = page.locator('[data-test="btn-search-account"]');
  }

  async navigateToCreateAccount(): Promise<void> {
    await this.navigateTo('/accounts/create');
  }

  async navigateToUpdateAccount(accNo: string): Promise<void> {
    await this.navigateTo(`/accounts/update/${accNo}`);
  }

  async navigateToDeleteAccount(accNo: string): Promise<void> {
    await this.navigateTo(`/accounts/delete/${accNo}`);
  }

  async navigateToAccountLookup(): Promise<void> {
    await this.navigateTo('/accounts/lookup');
  }

  async fillAccountForm(data: AccountData): Promise<void> {
    await this.custNoInput.fill(data.custNo);
    await this.accountTypeSelect.selectOption(data.accountType);
    await this.interestRateInput.fill(data.interestRate);
    await this.overdraftLimitInput.fill(data.overdraftLimit);
    await this.accNoInput.fill(data.accNo);
    await this.sortCodeInput.fill(data.sortCode);
    await this.openDay.fill(data.openDay);
    await this.openMonth.fill(data.openMonth);
    await this.openYear.fill(data.openYear);
    await this.lastStmtDay.fill(data.lastStmtDay);
    await this.lastStmtMonth.fill(data.lastStmtMonth);
    await this.lastStmtYear.fill(data.lastStmtYear);
    await this.nextStmtDay.fill(data.nextStmtDay);
    await this.nextStmtMonth.fill(data.nextStmtMonth);
    await this.nextStmtYear.fill(data.nextStmtYear);
    await this.availableBalance.fill(data.availableBalance);
    await this.actualBalance.fill(data.actualBalance);
  }

  async searchAccount(custNo: string, accNo: string): Promise<void> {
    await this.lookupCustNoInput.fill(custNo);
    await this.lookupAccNoInput.fill(accNo);
    await this.searchAccountButton.click();
  }

  async verifyAccountDetails(data: AccountData): Promise<void> {
    await expect(this.custNoInput).toHaveValue(data.custNo);
    await expect(this.accNoInput).toHaveValue(data.accNo);
    await expect(this.actualBalance).toHaveValue(data.actualBalance);
    await expect(this.availableBalance).toHaveValue(data.availableBalance);
  }
}