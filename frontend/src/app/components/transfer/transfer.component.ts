import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';
import { Transaction, TransferDto, DepositWithdrawDto } from '../../models/crm.models';

@Component({
  selector: 'app-transfer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="row">
      <div class="col-md-6">
        <div class="card mb-4">
          <div class="card-header bg-success text-white">
            <h5>Transfer Funds (BNK1TFM)</h5>
          </div>
          <div class="card-body">
            <form (ngSubmit)="executeTransfer()">
              <div class="mb-3">
                <label class="form-label">From Account (FACCNO)</label>
                <input type="text" class="form-control" [(ngModel)]="transferData.fromAccNo" name="fromAccNo" required>
              </div>
              <div class="mb-3">
                <label class="form-label">To Account (TACCNO)</label>
                <input type="text" class="form-control" [(ngModel)]="transferData.toAccNo" name="toAccNo" required>
              </div>
              <div class="mb-3">
                <label class="form-label">Amount (AMT)</label>
                <input type="number" step="0.01" class="form-control" [(ngModel)]="transferData.amount" name="amount" required>
              </div>
              <button type="submit" class="btn btn-success w-100">Execute Transfer</button>
            </form>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="card mb-4">
          <div class="card-header bg-info text-white">
            <h5>Deposit / Withdrawal (BNK1CDM)</h5>
          </div>
          <div class="card-body">
            <form (ngSubmit)="executeDepositWithdraw()">
              <div class="mb-3">
                <label class="form-label">Account Number (ACCNO)</label>
                <input type="text" class="form-control" [(ngModel)]="dwData.accNo" name="dwAccNo" required>
              </div>
              <div class="mb-3">
                <label class="form-label">Operation Sign (+ / -)</label>
                <select class="form-select" [(ngModel)]="dwData.sign" name="dwSign">
                  <option value="+">Deposit (+)</option>
                  <option value="-">Withdrawal (-)</option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label">Amount (AMT)</label>
                <input type="number" step="0.01" class="form-control" [(ngModel)]="dwData.amount" name="dwAmount" required>
              </div>
              <button type="submit" class="btn btn-info text-white w-100">Process Transaction</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <h4>Recent Transaction History</h4>
    <table class="table table-striped bg-white shadow-sm">
      <thead class="table-dark">
        <tr>
          <th>ID</th>
          <th>Type</th>
          <th>From Acc</th>
          <th>To Acc</th>
          <th>Amount</th>
          <th>Timestamp</th>
          <th>Message</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let tx of transactions">
          <td>{{ tx.id }}</td>
          <td><span class="badge bg-primary">{{ tx.transactionType }}</span></td>
          <td>{{ tx.fromAccNo }}</td>
          <td>{{ tx.toAccNo }}</td>
          <td>{{ tx.amount | currency:'GBP' }}</td>
          <td>{{ tx.timestamp | date:'short' }}</td>
          <td>{{ tx.message }}</td>
        </tr>
      </tbody>
    </table>
  `
})
export class TransferComponent implements OnInit {
  transactions: Transaction[] = [];

  transferData: TransferDto = {
    company: 'BNK1',
    fromAccNo: '',
    toAccNo: '',
    amount: 100,
    fromSortCode: '20-00-00',
    toSortCode: '20-00-00'
  };

  dwData: DepositWithdrawDto = {
    company: 'BNK1',
    accNo: '',
    sign: '+',
    amount: 50,
    sortCode: '20-00-00'
  };

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.transactionService.getTransactions().subscribe({
      next: (data) => this.transactions = data,
      error: (err) => console.error('Failed to load transactions', err)
    });
  }

  executeTransfer(): void {
    this.transactionService.transfer(this.transferData).subscribe({
      next: () => {
        alert('Transfer completed successfully.');
        this.loadTransactions();
      },
      error: (err) => alert(err.error?.message || 'Transfer failed')
    });
  }

  executeDepositWithdraw(): void {
    this.transactionService.depositOrWithdraw(this.dwData).subscribe({
      next: () => {
        alert('Transaction completed successfully.');
        this.loadTransactions();
      },
      error: (err) => alert(err.error?.message || 'Transaction failed')
    });
  }
}