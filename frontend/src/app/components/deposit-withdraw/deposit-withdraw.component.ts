import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CrmService } from '../../services/crm.service';
import { Account, CRMOperationResult } from '../../models/crm-models';

@Component({
  selector: 'app-deposit-withdraw',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyPipe],
  template: `
    <div class="max-w-2xl mx-auto space-y-6">
      <div class="border-b border-slate-800 pb-4">
        <h1 class="text-2xl font-bold text-white">Deposit & Debit Management</h1>
        <p class="text-slate-400 text-sm mt-1">COBOL BMS Map: BNK1CDM (ACCNO, SIGN, AMT, SORTC, AVBAL, ACTBAL)</p>
      </div>

      @if (result) {
        <div [class]="result.success ? 'p-4 rounded-lg bg-emerald-950/80 border border-emerald-600 text-emerald-200' : 'p-4 rounded-lg bg-rose-950/80 border border-rose-600 text-rose-200'">
          <p class="font-bold text-base">{{ result.success ? 'Transaction Processed' : 'Transaction Failed' }}</p>
          <p class="text-sm mt-1">{{ result.message }}</p>
          <p class="text-xs opacity-75 mt-2 font-mono">Timestamp: {{ result.timestamp }}</p>
        </div>
      }

      <form (ngSubmit)="executeTransaction()" #txForm="ngForm" class="glass-card p-6 space-y-6">
        <div>
          <label class="block text-xs font-semibold uppercase text-slate-400 mb-1">Select Target Account (ACCNO)</label>
          <select [(ngModel)]="selectedAccNo" (ngModelChange)="onAccountSelect()" name="selectedAccNo" required class="input-field font-mono">
            @for (acc of accounts; track acc.accountNumber) {
              <option [value]="acc.accountNumber">{{ acc.accountNumber }} (Sort: {{ acc.sortCode }}) - Balance: {{ acc.actualBalance | currency }}</option>
            }
          </select>
        </div>

        @if (currentAccount) {
          <div class="p-4 rounded-lg bg-slate-800/80 border border-slate-700 grid grid-cols-2 gap-4 text-sm font-mono">
            <div>
              <span class="text-slate-400 text-xs block">Available Balance (AVBAL):</span>
              <span class="text-white font-bold text-lg">{{ currentAccount.availableBalance | currency }}</span>
            </div>
            <div>
              <span class="text-slate-400 text-xs block">Actual Balance (ACTBAL):</span>
              <span class="text-emerald-400 font-bold text-lg">{{ currentAccount.actualBalance | currency }}</span>
            </div>
          </div>
        }

        <div>
          <label class="block text-xs font-semibold uppercase text-slate-400 mb-1">Transaction Action (SIGN)</label>
          <div class="grid grid-cols-2 gap-4">
            <button 
              type="button" 
              (click)="sign = '+'" 
              [class]="sign === '+' ? 'btn-primary border-2 border-emerald-400 bg-emerald-600 hover:bg-emerald-500' : 'btn-secondary'"
            >
              + Deposit
            </button>
            <button 
              type="button" 
              (click)="sign = '-'" 
              [class]="sign === '-' ? 'btn-danger border-2 border-rose-400' : 'btn-secondary'"
            >
              - Debit / Withdrawal
            </button>
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold uppercase text-slate-400 mb-1">Transaction Amount (AMT)</label>
          <input 
            type="number" 
            step="0.01" 
            min="0.01" 
            [(ngModel)]="amount" 
            name="amount" 
            required 
            placeholder="0.00" 
            class="input-field text-xl font-mono text-emerald-400"
          />
        </div>

        <button 
          type="submit" 
          [disabled]="!txForm.form.valid || amount <= 0" 
          class="w-full btn-primary py-3 text-lg font-bold shadow-lg"
        >
          Process {{ sign === '+' ? 'Deposit' : 'Debit' }} Operation
        </button>
      </form>
    </div>
  `
})
export class DepositWithdrawComponent implements OnInit {
  accounts: Account[] = [];
  selectedAccNo = '';
  currentAccount?: Account;
  sign: '+' | '-' = '+';
  amount: number = 0;
  result?: CRMOperationResult;

  constructor(private crmService: CrmService) {}

  ngOnInit(): void {
    this.crmService.getAccounts().subscribe(accs => {
      this.accounts = accs;
      if (accs.length > 0 && !this.selectedAccNo) {
        this.selectedAccNo = accs[0].accountNumber;
        this.onAccountSelect();
      }
    });
  }

  onAccountSelect(): void {
    this.currentAccount = this.accounts.find(a => a.accountNumber === this.selectedAccNo);
  }

  executeTransaction(): void {
    if (!this.currentAccount) return;

    this.crmService.executeDepositWithdraw({
      company: this.currentAccount.company,
      accountNumber: this.currentAccount.accountNumber,
      sortCode: this.currentAccount.sortCode,
      sign: this.sign,
      amount: this.amount
    }).subscribe(res => {
      this.result = res;
      if (res.success) {
        this.amount = 0;
        this.onAccountSelect();
      }
    });
  }
}
