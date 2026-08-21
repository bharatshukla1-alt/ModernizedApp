import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CrmService } from '../../services/crm.service';
import { Customer } from '../../models/crm-models';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="max-w-4xl mx-auto space-y-6">
      <div class="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 class="text-2xl font-bold text-white">{{ isEditMode ? 'Edit Customer' : 'Create New Customer' }}</h1>
          <p class="text-slate-400 text-sm mt-1">BMS Field Mapping: BNK1CCM / BNK1DCM System Data Entry</p>
        </div>
        <a routerLink="/customers" class="btn-secondary text-sm">&larr; Back to List</a>
      </div>

      <form (ngSubmit)="onSubmit()" #custForm="ngForm" class="glass-card p-6 space-y-6">
        <!-- System Identifiers -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-slate-800 pb-4">
          <div>
            <label class="block text-xs font-semibold uppercase text-slate-400 mb-1">Company (COMPANY)</label>
            <input type="text" [(ngModel)]="customer.company" name="company" required class="input-field font-mono bg-slate-900/50" readonly />
          </div>
          <div>
            <label class="block text-xs font-semibold uppercase text-slate-400 mb-1">Customer No (CUSTNO)</label>
            <input type="text" [(ngModel)]="customer.custNo" name="custNo" [readonly]="isEditMode" placeholder="Auto-generated if empty" class="input-field font-mono" />
          </div>
          <div>
            <label class="block text-xs font-semibold uppercase text-slate-400 mb-1">Sort Code (SORTC)</label>
            <input type="text" [(ngModel)]="customer.sortCode" name="sortCode" required placeholder="e.g. 20-40-60" class="input-field font-mono" />
          </div>
        </div>

        <!-- Personal Information -->
        <div>
          <h2 class="text-sm font-semibold uppercase tracking-wider text-indigo-400 mb-3">Personal Details (BNK1CCM)</h2>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-400 mb-1">Title (CUSTTIT)</label>
              <select [(ngModel)]="customer.title" name="title" class="input-field">
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Ms.">Ms.</option>
                <option value="Dr.">Dr.</option>
                <option value="Prof.">Prof.</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-400 mb-1">First Name (CHRISTN / CUSTFNAM)</label>
              <input type="text" [(ngModel)]="customer.firstName" name="firstName" required class="input-field" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-400 mb-1">Middle Initial (CUSTINS)</label>
              <input type="text" [(ngModel)]="customer.middleInitial" name="middleInitial" maxlength="1" class="input-field uppercase" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-400 mb-1">Last Name (CUSTSN / CUSTLNAM)</label>
              <input type="text" [(ngModel)]="customer.lastName" name="lastName" required class="input-field" />
            </div>
          </div>
        </div>

        <!-- Address Details -->
        <div>
          <h2 class="text-sm font-semibold uppercase tracking-wider text-indigo-400 mb-3">Address & Location</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-400 mb-1">Address Line 1 (CUSTAD1)</label>
              <input type="text" [(ngModel)]="customer.addressLine1" name="addressLine1" required class="input-field" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-400 mb-1">Address Line 2 (CUSTAD2)</label>
              <input type="text" [(ngModel)]="customer.addressLine2" name="addressLine2" class="input-field" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-400 mb-1">City (CITY / CUSTCITY)</label>
              <input type="text" [(ngModel)]="customer.city" name="city" required class="input-field" />
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="block text-xs font-semibold text-slate-400 mb-1">Postcode (POSTCODE / CUSTPOST)</label>
                <input type="text" [(ngModel)]="customer.postcode" name="postcode" required class="input-field uppercase" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-400 mb-1">Country (COUNTRY / CUSTCTRY)</label>
                <input type="text" [(ngModel)]="customer.country" name="country" required class="input-field" />
              </div>
            </div>
          </div>
        </div>

        <!-- Rating & Dates -->
        <div>
          <h2 class="text-sm font-semibold uppercase tracking-wider text-indigo-400 mb-3">Demographics & Credit Score</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-400 mb-1">Date of Birth (DOBDD/MM/YY)</label>
              <input type="date" [(ngModel)]="customer.dateOfBirth" name="dateOfBirth" required class="input-field" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-400 mb-1">Credit Score (CREDSC)</label>
              <input type="number" [(ngModel)]="customer.creditScore" name="creditScore" min="300" max="850" required class="input-field font-mono" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-400 mb-1">Score Date (SCRDTDD/MM/YY)</label>
              <input type="date" [(ngModel)]="customer.scoreDate" name="scoreDate" required class="input-field" />
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-end space-x-4 pt-4 border-t border-slate-800">
          <a routerLink="/customers" class="btn-secondary">Cancel</a>
          <button type="submit" [disabled]="!custForm.form.valid" class="btn-primary">
            {{ isEditMode ? 'Update Customer' : 'Save New Customer' }}
          </button>
        </div>
      </form>
    </div>
  `
})
export class CustomerFormComponent implements OnInit {
  customer: Customer = {
    company: 'BNK1',
    custNo: '',
    title: 'Mr.',
    firstName: '',
    middleInitial: '',
    lastName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    postcode: '',
    country: 'United Kingdom',
    dateOfBirth: '1990-01-01',
    sortCode: '20-40-60',
    creditScore: 700,
    scoreDate: new Date().toISOString().split('T')[0]
  };
  isEditMode = false;

  constructor(
    private crmService: CrmService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const custNo = this.route.snapshot.paramMap.get('custNo');
    if (custNo) {
      this.isEditMode = true;
      this.crmService.getCustomerByNo(custNo).subscribe(data => {
        if (data) {
          this.customer = { ...data };
        }
      });
    }
  }

  onSubmit(): void {
    this.crmService.saveCustomer(this.customer).subscribe(res => {
      if (res.success) {
        this.router.navigate(['/customers']);
      }
    });
  }
}
