import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { AccountService } from '../../services/account.service';
import { Customer, Account } from '../../models/crm.models';

@Component({
  selector: 'app-customer-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div *ngIf="customer" class="card mb-4">
      <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <h4>Customer Details: {{ customer.custNo }}</h4>
        <a routerLink="/customers" class="btn btn-light btn-sm">Back to List</a>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-6">
            <p><strong>Full Name:</strong> {{ customer.title }} {{ customer.firstName }} {{ customer.initials }} {{ customer.lastName }}</p>
            <p><strong>Company:</strong> {{ customer.company }}</p>
            <p><strong>Address:</strong> {{ customer.address1 }}, {{ customer.address2 }}</p>
            <p><strong>City / Country:</strong> {{ customer.city }}, {{ customer.country }} ({{ customer.postcode }})</p>
          </div>
          <div class="col-md-6">
            <p><strong>Date of Birth:</strong> {{ customer.dateOfBirth | date:'mediumDate' }}</p>
            <p><strong>Sort Code:</strong> {{ customer.sortCode }}</p>
            <p><strong>Credit Score:</strong> <span class="badge bg-success">{{ customer.creditScore }}</span></p>
            <p><strong>Score Evaluated:</strong> {{ customer.scoreDate | date:'short' }}</p>
          </div>
        </div>
      </div>
    </div>

    <h4>Associated Accounts (BNK1CAM)</h4>
    <table class="table table-bordered bg-white shadow-sm">
      <thead class="table-secondary">
        <tr>
          <th>Account No</th>
          <th>Type</th>
          <th>Interest Rate</th>
          <th>Overdraft Limit</th>
          <th>Available Balance</th>
          <th>Actual Balance</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let a of accounts">
          <td><strong>{{ a.accNo }}</strong></td>
          <td>{{ a.accType }}</td>
          <td>{{ a.interestRate }}%</td>
          <td>{{ a.overdraftLimit | currency:'GBP' }}</td>
          <td>{{ a.availableBalance | currency:'GBP' }}</td>
          <td>{{ a.actualBalance | currency:'GBP' }}</td>
        </tr>
        <tr *ngIf="accounts.length === 0">
          <td colspan="6" class="text-center text-muted">No accounts found for this customer.</td>
        </tr>
      </tbody>
    </table>
  `
})
export class CustomerDetailComponent implements OnInit {
  customer?: Customer;
  accounts: Account[] = [];

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    const custNo = this.route.snapshot.paramMap.get('custNo');
    if (custNo) {
      this.customerService.getCustomer(custNo).subscribe(c => this.customer = c);
      this.accountService.getAccounts(custNo).subscribe(accs => this.accounts = accs);
    }
  }
}