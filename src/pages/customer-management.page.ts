import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { CustomerData } from '../fixtures/test-data';

export class CustomerManagementPage extends BasePage {
  readonly custTitle: Locator;
  readonly christianName: Locator;
  readonly custInitial: Locator;
  readonly custSurname: Locator;
  readonly addressLine1: Locator;
  readonly addressLine2: Locator;
  readonly city: Locator;
  readonly postcode: Locator;
  readonly country: Locator;
  readonly dobDay: Locator;
  readonly dobMonth: Locator;
  readonly dobYear: Locator;
  readonly sortCode: Locator;
  readonly custNoInput: Locator;
  readonly custNoDisplay: Locator;
  readonly creditScore: Locator;
  readonly scoreDateDay: Locator;
  readonly scoreDateMonth: Locator;
  readonly scoreDateYear: Locator;
  readonly deleteConfirmButton: Locator;

  constructor(page: Page) {
    super(page);
    this.custTitle = page.locator('[data-test="field-custtit"]');
    this.christianName = page.locator('[data-test="field-christn"]');
    this.custInitial = page.locator('[data-test="field-custins"]');
    this.custSurname = page.locator('[data-test="field-custsn"]');
    this.addressLine1 = page.locator('[data-test="field-custad1"]');
    this.addressLine2 = page.locator('[data-test="field-custad2"]');
    this.city = page.locator('[data-test="field-city"]');
    this.postcode = page.locator('[data-test="field-postcode"]');
    this.country = page.locator('[data-test="field-country"]');
    this.dobDay = page.locator('[data-test="field-dobdd"]');
    this.dobMonth = page.locator('[data-test="field-dobmm"]');
    this.dobYear = page.locator('[data-test="field-dobyy"]');
    this.sortCode = page.locator('[data-test="field-sortc"]');
    this.custNoInput = page.locator('[data-test="field-custno"]');
    this.custNoDisplay = page.locator('[data-test="field-custno2"]');
    this.creditScore = page.locator('[data-test="field-credsc"]');
    this.scoreDateDay = page.locator('[data-test="field-scrdtdd"]');
    this.scoreDateMonth = page.locator('[data-test="field-scrdtmm"]');
    this.scoreDateYear = page.locator('[data-test="field-scrdtyy"]');
    this.deleteConfirmButton = page.locator('[data-test="btn-confirm-delete"]');
  }

  async navigateToCreateCustomer(): Promise<void> {
    await this.navigateTo('/customers/create');
  }

  async navigateToDeleteCustomer(custNo: string): Promise<void> {
    await this.navigateTo(`/customers/delete/${custNo}`);
  }

  async fillCustomerForm(data: CustomerData): Promise<void> {
    await this.custTitle.fill(data.title);
    await this.christianName.fill(data.firstName);
    await this.custInitial.fill(data.middleInitial);
    await this.custSurname.fill(data.lastName);
    await this.addressLine1.fill(data.addressLine1);
    await this.addressLine2.fill(data.addressLine2);
    await this.city.fill(data.city);
    await this.postcode.fill(data.postcode);
    await this.country.fill(data.country);
    await this.dobDay.fill(data.dobDay);
    await this.dobMonth.fill(data.dobMonth);
    await this.dobYear.fill(data.dobYear);
    await this.sortCode.fill(data.sortCode);
    if (await this.custNoInput.isVisible()) {
      await this.custNoInput.fill(data.custNo);
    }
    await this.creditScore.fill(data.creditScore);
    await this.scoreDateDay.fill(data.scoreDateDay);
    await this.scoreDateMonth.fill(data.scoreDateMonth);
    await this.scoreDateYear.fill(data.scoreDateYear);
  }

  async verifyCustomerDetails(data: CustomerData): Promise<void> {
    await expect(this.custTitle).toHaveValue(data.title);
    await expect(this.christianName).toHaveValue(data.firstName);
    await expect(this.custSurname).toHaveValue(data.lastName);
    await expect(this.city).toHaveValue(data.city);
    await expect(this.postcode).toHaveValue(data.postcode);
    await expect(this.country).toHaveValue(data.country);
  }

  async confirmDeleteCustomer(): Promise<void> {
    await this.deleteConfirmButton.click();
  }
}