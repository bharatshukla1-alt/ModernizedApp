import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrmService } from '../../services/crm.service';
import { AccountDetails } from '../../models/crm.models';

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.css']
})
export class AccountManagementComponent implements OnInit {
  @Input() company: string = 'BNK1';

  accountForm!: FormGroup;
  searchAccountNo: string = '';
  statusMessage: string = '';
  isError: boolean = false;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private crmService: CrmService) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.accountForm = this.fb.group({
      accountNumber: ['', [Validators.required]],
      customerNumber: ['', [Validators.required]],
      accountType: ['SAVINGS', [Validators.required]],
      interestRate: [0.0, [Validators.required]],
      overdraftLimit: [0.0],
      sortCode: ['', [Validators.required]],
      openDate: [''],
      lastStatementDate: [''],
      nextStatementDate: [''],
      availableBalance: [0.0],
      actualBalance: [0.0]
    });
  }

  onSearch(): void {
    if (!this.searchAccountNo) return;
    this.isLoading = true;
    this.crmService.getAccount(this.company, this.searchAccountNo).subscribe({
      next: (data) => {
        this.accountForm.patchValue(data);
        this.statusMessage = data.statusMessage || 'Account records retrieved.';
        this.isError = false;
        this.isLoading = false;
      },
      error: (err) => {
        this.statusMessage = err.error?.message || 'Account search failed.';
        this.isError = true;
        this.isLoading = false;
      }
    });
  }

  onSave(): void {
    if (this.accountForm.invalid) {
      this.statusMessage = 'Please supply valid account details.';
      this.isError = true;
      return;
    }

    this.isLoading = true;
    const payload: AccountDetails = {
      ...this.accountForm.value,
      company: this.company
    };

    this.crmService.saveAccount(payload).subscribe({
      next: (res) => {
        this.statusMessage = res.statusMessage || 'Account created/updated successfully.';
        this.isError = false;
        this.isLoading = false;
      },
      error: (err) => {
        this.statusMessage = err.error?.message || 'Error processing account.';
        this.isError = true;
        this.isLoading = false;
      }
    });
  }
}
