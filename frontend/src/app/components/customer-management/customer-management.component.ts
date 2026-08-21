import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrmService } from '../../services/crm.service';
import { CustomerProfile } from '../../models/crm.models';

@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.css']
})
export class CustomerManagementComponent implements OnInit {
  @Input() company: string = 'BNK1';
  
  customerForm!: FormGroup;
  searchCustNo: string = '';
  statusMessage: string = '';
  isError: boolean = false;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private crmService: CrmService) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.customerForm = this.fb.group({
      customerNumber: ['', [Validators.required]],
      title: [''],
      firstName: ['', [Validators.required]],
      middleInitial: [''],
      lastName: ['', [Validators.required]],
      addressLine1: ['', [Validators.required]],
      addressLine2: [''],
      city: ['', [Validators.required]],
      postcode: ['', [Validators.required]],
      country: ['UK', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      sortCode: ['', [Validators.required]],
      creditScore: [0],
      scoreDate: ['']
    });
  }

  onSearch(): void {
    if (!this.searchCustNo) return;
    this.isLoading = true;
    this.crmService.getCustomer(this.company, this.searchCustNo).subscribe({
      next: (data) => {
        this.customerForm.patchValue(data);
        this.statusMessage = data.statusMessage || 'Customer record retrieved successfully.';
        this.isError = false;
        this.isLoading = false;
      },
      error: (err) => {
        this.statusMessage = err.error?.message || 'Failed to locate customer record.';
        this.isError = true;
        this.isLoading = false;
      }
    });
  }

  onSave(): void {
    if (this.customerForm.invalid) {
      this.statusMessage = 'Please complete all required fields.';
      this.isError = true;
      return;
    }

    this.isLoading = true;
    const payload: CustomerProfile = {
      ...this.customerForm.value,
      company: this.company
    };

    this.crmService.saveCustomer(payload).subscribe({
      next: (res) => {
        this.statusMessage = res.statusMessage || 'Customer details saved successfully.';
        this.isError = false;
        this.isLoading = false;
      },
      error: (err) => {
        this.statusMessage = err.error?.message || 'Error saving customer details.';
        this.isError = true;
        this.isLoading = false;
      }
    });
  }

  onClear(): void {
    this.customerForm.reset();
    this.searchCustNo = '';
    this.statusMessage = '';
  }
}
