import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { DirectTransferData, BankToBankTransferData } from '../fixtures/test-data';

export class FundTransferPage extends BasePage {
  readonly fromAccNo: Locator;
  readonly toAccNo: Locator;
  readonly amount: Locator;
  readonly fromSortCode: Locator;
  readonly toSortCode: Locator;
  readonly fromActualBal: Locator;
  readonly toActualBal: Locator;
  readonly fromAvailBal: Locator;
  readonly toAvailBal: Locator;

  readonly fscde1: Locator;
  readonly fscde2: Locator;
  readonly fscde3: Locator;
  readonly faccno: Locator;
  readonly actSign: Locator;
  readonly actPnd: Locator;
  readonly actPnc: Locator;
  readonly avaSign: Locator;
  readonly avaPnd: Locator;
  readonly avaPnc: Locator;
  readonly tscde1: Locator;
  readonly tscde2: Locator;
  readonly tscde3: Locator;
  readonly taccno: Locator;

  constructor(page: Page) {
    super(page);
    this.fromAccNo = page.locator('[data-test="field-faccno"]');
    this.toAccNo = page.locator('[data-test="field-taccno"]');
    this.amount = page.locator('[data-test="field-amt"]');
    this.fromSortCode = page.locator('[data-test="field-fsortc"]');
    this.toSortCode = page.locator('[data-test="field-tsortc"]');
    this.fromActualBal = page.locator('[data-test="field-factbal"]');
    this.toActualBal = page.locator('[data-test="field-tactbal"]');
    this.fromAvailBal = page.locator('[data-test="field-favbal"]');
    this.toAvailBal = page.locator('[data-test="field-tavbal"]');

    this.fscde1 = page.locator('[data-test="field-fscde1"]');
    this.fscde2 = page.locator('[data-test="field-fscde2"]');
    this.fscde3 = page.locator('[data-test="field-fscde3"]');
    this.faccno = page.locator('[data-test="field-faccno-b2m"]');
    this.actSign = page.locator('[data-test="field-actsign"]');
    this.actPnd = page.locator('[data-test="field-actpnd"]');
    this.actPnc = page.locator('[data-test="field-actpnc"]');
    this.avaSign = page.locator('[data-test="field-avasign"]');
    this.avaPnd = page.locator('[data-test="field-avapnd"]');
    this.avaPnc = page.locator('[data-test="field-avapnc"]');
    this.tscde1 = page.locator('[data-test="field-tscde1"]');
    this.tscde2 = page.locator('[data-test="field-tscde2"]');
    this.tscde3 = page.locator('[data-test="field-tscde3"]');
    this.taccno = page.locator('[data-test="field-taccno-b2m"]');
  }

  async navigateToDirectTransfer(): Promise<void> {
    await this.navigateTo('/transfers/direct');
  }

  async navigateToBankToBankTransfer(): Promise<void> {
    await this.navigateTo('/transfers/bank-to-bank');
  }

  async executeDirectTransfer(data: DirectTransferData): Promise<void> {
    await this.fromAccNo.fill(data.fromAccNo);
    await this.toAccNo.fill(data.toAccNo);
    await this.amount.fill(data.amount);
    await this.fromSortCode.fill(data.fromSortCode);
    await this.toSortCode.fill(data.toSortCode);
    await this.submitForm();
  }

  async executeBankToBankTransfer(data: BankToBankTransferData): Promise<void> {
    await this.fscde1.fill(data.fromSortCode1);
    await this.fscde2.fill(data.fromSortCode2);
    await this.fscde3.fill(data.fromSortCode3);
    await this.faccno.fill(data.fromAccNo);
    await this.amount.fill(data.amount);
    await this.actSign.fill(data.actSign);
    await this.actPnd.fill(data.actPending);
    await this.actPnc.fill(data.actPnc);
    await this.avaSign.fill(data.availSign);
    await this.avaPnd.fill(data.availPending);
    await this.avaPnc.fill(data.availPnc);
    await this.tscde1.fill(data.toSortCode1);
    await this.tscde2.fill(data.toSortCode2);
    await this.tscde3.fill(data.toSortCode3);
    await this.taccno.fill(data.toAccNo);
    await this.submitForm();
  }

  async verifyUpdatedTransferBalances(fromBal: string, toBal: string): Promise<void> {
    await expect(this.fromActualBal).toHaveValue(fromBal);
    await expect(this.toActualBal).toHaveValue(toBal);
  }
}