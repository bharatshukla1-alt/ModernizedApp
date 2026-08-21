import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrmService } from '../../services/crm.service';
import { DepositWithdrawalRequest, FundTransferRequest } from '../../models/crm.models';

@Component({
  selector: 'app-transfer-funds',
  templateUrl: './transfer-funds.component.html',
  styleUrls: ['./transfer-funds.component.css']
})
export class TransferFundsComponent implements OnInit {
  @Input() company: string = 'BNK1';

  transferForm!: FormGroup;
  cashForm!: FormGroup;
  
  statusMessage: string = '';
  isError: boolean = false;
  isLoading: boolean = false;
  activeMode: 'transfer' | 'cash' = 'transfer';

  constructor(private fb: FormBuilder, private crmService: CrmService) {}

  ngOnInit(): void {
    this.initForms();
  }

  private initForms(): void {
    this.transferForm = this.fb.group({
      fromAccountNumber: ['', Validators.required],
      fromSortCode: ['', Validators.required],
      toAccountNumber: ['', Validators.required],
      toSortCode: ['', Validators.required],
      amount: [0.0, [Validators.required, Validators.min(0.01)]]
    });

    this.cashForm = this.fb.group({
      accountNumber: ['', Validators.required],
      sortCode: ['', Validators.required],
      sign: ['+', Validators.required],
      amount: [0.0, [Validators.required, Validators.min(0.01)]]
    });
  }

  onExecuteTransfer(): void {
    if (this.transferForm.invalid) return;
    this.isLoading = true;
    
    const payload: FundTransferRequest = {
      ...this.transferForm.value,
      company: this.company
    };

    this.crmService.transferFunds(payload).subscribe({
      next: (res) => {
        this.statusMessage = res.message;
        this.isError = !res.success;
        this.isLoading = false;
      },
      error: (err) => {
        this.statusMessage = err.error?.message || 'Transfer failed.';
        this.isError = true;
        this.isLoading = false;
      }
    });
  }

  onExecuteCash(): void {
    if (this.cashForm.invalid) return;
    this.isLoading = true;

    const payload: DepositWithdrawalRequest = {
      ...this.cashForm.value,
      company: this.company
    };

    this.crmService.processDepositWithdrawal(payload).subscribe({
      next: (res) => {
        this.statusMessage = res.message;
        this.isError = !res.success;
        this.isLoading = false;
      },
      error: (err) => {
        this.statusMessage = err.error?.message || 'Cash transaction failed.';
        this.isError = true;
        this.isLoading = false;
      }
    });
  }
}
