import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { Customer, CreateCustomerDto } from '../../models/crm.models';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2>Customer Directory (BNK1CCM / BNK1DCM)</h2>
      <button class="btn btn-success" (click)="toggleForm()">
        {{ showForm ? 'Close Form' : '+ New Customer' }}
      </button>
    </div>

    <div *ngIf="showForm" class="card card-body mb-4 bg-light">
      <h5>Create Customer (BNK1CCM)</h5>
      <form (ngSubmit)="createCustomer()">
        <div class="row g-3">
          <div class="col-md-2">
            <label class="form-label">Company</label>
            <input type="text" class="form-control" [(ngModel)]="newCust.company" name="company">
          </div>
          <div class="col-md-3">
            <label class="form-label">Customer ID (CUSTNO)</label>
            <input type="text" class="form-control" [(ngModel)]="newCust.custNo" name="custNo" required>
          </div>
          <div class="col-md-2">
            <label class="form-label">Title</label>
            <input type="text" class="form-control" [(ngModel)]="newCust.title" name="title">
          </div>
          <div class="col-md-2">
            <label class="form-label">First Name</label>
            <input type="text" class="form-control" [(ngModel)]="newCust.firstName" name="firstName" required>
          </div>
          <div class="col-md-3">
            <label class="form-label">Last Name</label>
            <input type="text" class="form-control" [(ngModel)]="newCust.lastName" name="lastName" required>
          </div>
          <div class="col-md-4">
            <label class="form-label">Address 1</label>
            <input type="text" class="form-control" [(ngModel)]="newCust.address1" name="address1">
          </div>
          <div class="col-md-3">
            <label class="form-label">City</label>
            <input type="text" class="form-control" [(ngModel)]="newCust.city" name="city">
          </div>
          <div class="col-md-2">
            <label class="form-label">Postcode</label>
            <input type="text" class="form-control" [(ngModel)]="newCust.postcode" name="postcode">
          </div>
          <div class="col-md-3">
            <label class="form-label">Country</label>
            <input type="text" class="form-control" [(ngModel)]="newCust.country" name="country">
          </div>
          <div class="col-md-3">
            <label class="form-label">Date of Birth</label>
            <input type="date" class="form-control" [(ngModel)]="newCust.dateOfBirth" name="dateOfBirth">
          </div>
          <div class="col-md-3">
            <label class="form-label">Sort Code</label>
            <input type="text" class="form-control" [(ngModel)]="newCust.sortCode" name="sortCode">
          </div>
          <div class="col-md-3">
            <label class="form-label">Credit Score</label>
            <input type="number" class="form-control" [(ngModel)]="newCust.creditScore" name="creditScore">
          </div>
        </div>
        <div class="mt-3">
          <button type="submit" class="btn btn-primary">Save Customer</button>
        </div>
      </form>
    </div>

    <div class="mb-3">
      <input type="text" class="form-control" placeholder="Search by Customer No, First or Last Name..." 
             [(ngModel)]="searchTerm" (input)="loadCustomers()">
    </div>

    <table class="table table-hover table-striped bg-white rounded shadow-sm">
      <thead class="table-dark">
        <tr>
          <th>Cust No</th>
          <th>Name</th>
          <th>City</th>
          <th>Postcode</th>
          <th>Credit Score</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let c of customers">
          <td><strong>{{ c.custNo }}</strong></td>
          <td>{{ c.title }} {{ c.firstName }} {{ c.lastName }}</td>
          <td>{{ c.city }}</td>
          <td>{{ c.postcode }}</td>
          <td><span class="badge bg-info text-dark">{{ c.creditScore }}</span></td>
          <td>
            <a [routerLink]="['/customers', c.custNo]" class="btn btn-sm btn-outline-primary me-2">View Details</a>
            <button (click)="deleteCustomer(c.custNo)" class="btn btn-sm btn-outline-danger">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  `
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  searchTerm: string = '';
  showForm: boolean = false;

  newCust: CreateCustomerDto = {
    company: 'BNK1',
    custNo: '',
    title: 'Mr',
    firstName: '',
    initials: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    postcode: '',
    country: 'United Kingdom',
    dateOfBirth: '1990-01-01',
    sortCode: '20-00-00',
    creditScore: 700
  };

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getCustomers(this.searchTerm).subscribe({
      next: (data) => this.customers = data,
      error: (err) => console.error('Failed to load customers', err)
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  createCustomer(): void {
    this.customerService.createCustomer(this.newCust).subscribe({
      next: () => {
        this.showForm = false;
        this.loadCustomers();
      },
      error: (err) => alert(err.error?.message || 'Error creating customer')
    });
  }

  deleteCustomer(custNo: string): void {
    if (confirm(`Are you sure you want to delete customer ${custNo}?`)) {
      this.customerService.deleteCustomer(custNo).subscribe({
        next: () => this.loadCustomers(),
        error: (err) => alert(err.error?.message || 'Error deleting customer')
      });
    }
  }
}