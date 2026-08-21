import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { Account, CreateAccountDto } from '../../models/crm.models';

@Component({
  selector: 'app-account-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2>Accounts Maintenance (BNK1CAM / BNK1UAM / BNK1DAM)</h2>
      <button class="btn btn-success" (click)="toggleForm()">
        {{ showForm ? 'Close Form' : '+ New Account' }}
      </button>
    </div>

    <div *ngIf="showForm" class="card card-body mb-4 bg-light">
      <h5>Create New Account (BNK1CAM)</h5>
      <form (ngSubmit)="createAccount()">
        <div class="row g-3">
          <div class="col-md-3">
            <label class="form-label">Customer ID</label>
            <input type="text" class="form-control" [(ngModel)]="newAccount.custNo" name="custNo" required>
          </div>
          <div class="col-md-3">
            <label class="form-label">Account Number (ACCNO)</label>
            <input type="text" class="form-control" [(ngModel)]="newAccount.accNo" name="accNo" required>
          </div>
          <div class="col-md-3">
            <label class="form-label">Account Type</label>
            <select class="form-select" [(ngModel)]="newAccount.accType" name="accType">
              <option value="SAVINGS">SAVINGS</option>
              <option value="CHECKING">CHECKING</option>
              <option value="INVESTMENT">INVESTMENT</option>
            </select>
          </div>
          <div class="col-md-3">
            <label class="form-label">Sort Code</label>
            <input type="text" class="form-control" [(ngModel)]="newAccount.sortCode" name="sortCode">
          </div>
          <div class="col-md-4">
            <label class="form-label">Interest Rate (%)</label>
            <input type="number" step="0.01" class="form-control" [(ngModel)]="newAccount.interestRate" name="interestRate">
          </div>
          <div class="col-md-4">
            <label class="form-label">Overdraft Limit</label>
            <input type="number" step="0.01" class="form-control" [(ngModel)]="newAccount.overdraftLimit" name="overdraftLimit">
          </div>
          <div class="col-md-4">
            <label class="form-label">Initial Deposit</label>
            <input type="number" step="0.01" class="form-control" [(ngModel)]="newAccount.initialDeposit" name="initialDeposit">
          </div>
        </div>
        <div class="mt-3">
          <button type="submit" class="btn btn-primary">Create Account</button>
        </div>
      </form>
    </div>

    <table class="table table-hover table-striped bg-white rounded shadow-sm">
      <thead class="table-dark">
        <tr>
          <th>Acc No</th>
          <th>Cust No</th>
          <th>Type</th>
          <th>Sort Code</th>
          <th>Interest</th>
          <th>Avail Bal</th>
          <th>Actual Bal</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let a of accounts">
          <td><strong>{{ a.accNo }}</strong></td>
          <td>{{ a.custNo }}</td>
          <td><span class="badge bg-secondary">{{ a.accType }}</span></td>
          <td>{{ a.sortCode }}</td>
          <td>{{ a.interestRate }}%</td>
          <td>{{ a.availableBalance | currency:'GBP' }}</td>
          <td>{{ a.actualBalance | currency:'GBP' }}</td>
          <td>
            <button (click)="deleteAccount(a.accNo)" class="btn btn-sm btn-outline-danger">Close Account</button>
          </td>
        </tr>
      </tbody>
    </table>
  `
})
export class AccountListComponent implements OnInit {
  accounts: Account[] = [];
  showForm: boolean = false;

  newAccount: CreateAccountDto = {
    company: 'BNK1',
    custNo: '',
    accNo: '',
    accType: 'CHECKING',
    interestRate: 1.5,
    overdraftLimit: 500,
    sortCode: '20-00-00',
    initialDeposit: 100
  };

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts(): void {
    this.accountService.getAccounts().subscribe({
      next: (data) => this.accounts = data,
      error: (err) => console.error('Failed to load accounts', err)
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  createAccount(): void {
    this.accountService.createAccount(this.newAccount).subscribe({
      next: () => {
        this.showForm = false;
        this.loadAccounts();
      },
      error: (err) => alert(err.error?.message || 'Error creating account')
    });
  }

  deleteAccount(accNo: string): void {
    if (confirm(`Are you sure you want to close account ${accNo}?`)) {
      this.accountService.deleteAccount(accNo).subscribe({
        next: () => this.loadAccounts(),
        error: (err) => alert(err.error?.message || 'Error closing account')
      });
    }
  }
}