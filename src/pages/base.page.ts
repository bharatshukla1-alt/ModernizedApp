import { Page, Locator, expect } from '@playwright/test';

export abstract class BasePage {
  readonly page: Page;
  readonly companyHeader: Locator;
  readonly systemMessage: Locator;
  readonly dummyField: Locator;
  readonly submitButton: Locator;
  readonly cancelButton: Locator;
  readonly clearButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.companyHeader = page.locator('[data-test="header-company"]');
    this.systemMessage = page.locator('[data-test="system-message"]');
    this.dummyField = page.locator('[data-test="field-dummy"]');
    this.submitButton = page.locator('[data-test="btn-submit"]');
    this.cancelButton = page.locator('[data-test="btn-cancel"]');
    this.clearButton = page.locator('[data-test="btn-clear"]');
  }

  async navigateTo(path: string): Promise<void> {
    await this.page.goto(path);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyCompanyHeader(expectedCompany: string): Promise<void> {
    await expect(this.companyHeader).toHaveText(expectedCompany);
  }

  async verifySystemMessage(expectedMessage: string): Promise<void> {
    await expect(this.systemMessage).toContainText(expectedMessage);
  }

  async submitForm(): Promise<void> {
    await this.submitButton.click();
  }

  async clearForm(): Promise<void> {
    await this.clearButton.click();
  }

  async cancelForm(): Promise<void> {
    await this.cancelButton.click();
  }
}