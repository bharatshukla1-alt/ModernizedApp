import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CrmService } from '../../services/crm.service';
import { Account, Customer } from '../../models/crm-models';

@Component({
  selector: 'app-account-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="max-w-3xl mx-auto space-y-6">
      <div class="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 class="text-2xl font-bold text-white">{{ isEditMode ? 'Update Account Details' : 'Open New Account' }}</h1>
          <p class="text-slate-400 text-sm mt-1">COBOL BMS Field Mapping: BNK1CAM / BNK1UAM</p>
        </div>
        <a routerLink="/accounts" class="btn-secondary text-sm">&larr; Back to Accounts</a>
      </div>

      <form (ngSubmit)="onSubmit()" #accForm="ngForm" class="glass-card p-6 space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-slate-800 pb-4">
          <div>
            <label class="block text-xs font-semibold uppercase text-slate-400 mb-1">Company (COMPANY)</label>
            <input type="text" [(ngModel)]="account.company" name="company" required class="input-field font-mono bg-slate-900/50" readonly />
          </div>
          <div>
            <label class="block text-xs font-semibold uppercase text-slate-400 mb-1">Account No (ACCNO)</label>
            <input type="text" [(ngModel)]="account.accountNumber" name="accountNumber" [readonly]="isEditMode" placeholder="Auto-generated if empty" class="input-field font-mono" />
          </div>
          <div>
            <label class="block text-xs font-semibold uppercase text-slate-400 mb-1">Sort Code (SRTCD / SORTC)</label>
            <input type="text" [(ngModel)]="account.sortCode" name="sortCode" required class="input-field font-mono" />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-slate-400 mb-1">Customer (CUSTNO)</label>
            <select [(ngModel)]="account.customerNumber" name="customerNumber" required class="input-field">
              @for (cust of customers; track cust.custNo) {
                <option [value]="cust.custNo">{{ cust.custNo }} - {{ cust.firstName }} {{ cust.lastName }}</option>
              }
            </select>
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-400 mb-1">Account Type (ACCTYP)</label>
            <select [(ngModel)]="account.accountType" name="accountType" required class="input-field">
              <option value="CHECKING">CHECKING</option>
              <option value="SAVINGS">SAVINGS</option>
              <option value="INVESTMENT">INVESTMENT</option>
              <option value="BUSINESS">BUSINESS</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-slate-400 mb-1">Interest Rate % (INTRT)</label>
            <input type="number" step="0.01" [(ngModel)]="account.interestRate" name="interestRate" required class="input-field font-mono" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-400 mb-1">Overdraft Limit (OVERDR)</label>
            <input type="number" step="100" [(ngModel)]="account.overdraftLimit" name="overdraftLimit" required class="input-field font-mono" />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-slate-400 mb-1">Available Balance (AVAIL / AVBAL)</label>
            <input type="number" step="0.01" [(ngModel)]="account.availableBalance" name="availableBalance" required class="input-field font-mono" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-400 mb-1">Actual Balance (ACTBAL)</label>
            <input type="number" step="0.01" [(ngModel)]="account.actualBalance" name="actualBalance" required class="input-field font-mono" />
          </div>
        </div>

        <div class="flex justify-end space-x-4 pt-4 border-t border-slate-800">
          <a routerLink="/accounts" class="btn-secondary">Cancel</a>
          <button type="submit" [disabled]="!accForm.form.valid" class="btn-primary">
            {{ isEditMode ? 'Update Account' : 'Open Account' }}
          </button>
        </div>
      </form>
    </div>
  `
})
export class AccountFormComponent implements OnInit {
  account: Account = {
    company: 'BNK1',
    accountNumber: '',
    customerNumber: '',
    accountType: 'CHECKING',
    interestRate: 1.5,
    overdraftLimit: 500,
    sortCode: '20-40-60',
    openDate: new Date().toISOString().split('T')[0],
    lastModifiedDate: new Date().toISOString().split('T')[0],
    nextStatementDate: '2024-01-01',
    availableBalance: 1000,
    actualBalance: 1000
  };
  customers: Customer[] = [];
  isEditMode = false;

  constructor(
    private crmService: CrmService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.crmService.getCustomers().subscribe(custs => {
      this.customers = custs;
      if (custs.length > 0 && !this.account.customerNumber) {
        this.account.customerNumber = custs[0].custNo;
      }
    });

    const accNo = this.route.snapshot.paramMap.get('accNo');
    if (accNo) {
      this.isEditMode = true;
      this.crmService.getAccountByNo(accNo).subscribe(data => {
        if (data) {
          this.account = { ...data };
        }
      });
    }
  }

  onSubmit(): void {
    this.crmService.saveAccount(this.account).subscribe(res => {
      if (res.success) {
        this.router.navigate(['/accounts']);
      }
    });
  }
}
