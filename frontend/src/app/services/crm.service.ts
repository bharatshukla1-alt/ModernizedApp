import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { Customer, Account, DepositWithdrawRequest, TransferRequest, CRMOperationResult } from '../models/crm-models';

@Injectable({
  providedIn: 'root'
})
export class CrmService {
  private mockCustomers: Customer[] = [
    {
      company: 'BNK1',
      custNo: 'CUST1001',
      title: 'Mr.',
      firstName: 'John',
      middleInitial: 'A',
      lastName: 'Smith',
      addressLine1: '100 Main Street',
      addressLine2: 'Suite 400',
      city: 'London',
      postcode: 'EC1A 1BB',
      country: 'United Kingdom',
      dateOfBirth: '1985-06-15',
      sortCode: '20-40-60',
      creditScore: 780,
      scoreDate: '2023-11-01'
    },
    {
      company: 'BNK1',
      custNo: 'CUST1002',
      title: 'Ms.',
      firstName: 'Sarah',
      middleInitial: 'E',
      lastName: 'Jenkins',
      addressLine1: '45 Park Lane',
      addressLine2: 'Apt 12B',
      city: 'Manchester',
      postcode: 'M1 4BT',
      country: 'United Kingdom',
      dateOfBirth: '1990-03-22',
      sortCode: '20-40-60',
      creditScore: 815,
      scoreDate: '2023-10-15'
    },
    {
      company: 'BNK1',
      custNo: 'CUST1003',
      title: 'Dr.',
      firstName: 'Robert',
      middleInitial: 'H',
      lastName: 'Vance',
      addressLine1: '12 Innovation Way',
      addressLine2: 'Tech District',
      city: 'Edinburgh',
      postcode: 'EH1 2NG',
      country: 'United Kingdom',
      dateOfBirth: '1978-11-04',
      sortCode: '30-90-12',
      creditScore: 690,
      scoreDate: '2023-12-05'
    }
  ];

  private mockAccounts: Account[] = [
    {
      company: 'BNK1',
      accountNumber: 'ACC800101',
      customerNumber: 'CUST1001',
      accountType: 'CHECKING',
      interestRate: 0.5,
      overdraftLimit: 1000.00,
      sortCode: '20-40-60',
      openDate: '2020-01-10',
      lastModifiedDate: '2023-12-10',
      nextStatementDate: '2024-01-01',
      availableBalance: 4250.75,
      actualBalance: 4250.75
    },
    {
      company: 'BNK1',
      accountNumber: 'ACC800102',
      customerNumber: 'CUST1001',
      accountType: 'SAVINGS',
      interestRate: 3.25,
      overdraftLimit: 0.00,
      sortCode: '20-40-60',
      openDate: '2021-03-15',
      lastModifiedDate: '2023-11-20',
      nextStatementDate: '2024-01-01',
      availableBalance: 18500.00,
      actualBalance: 18500.00
    },
    {
      company: 'BNK1',
      accountNumber: 'ACC800201',
      customerNumber: 'CUST1002',
      accountType: 'CHECKING',
      interestRate: 0.5,
      overdraftLimit: 2500.00,
      sortCode: '20-40-60',
      openDate: '2019-08-01',
      lastModifiedDate: '2023-12-12',
      nextStatementDate: '2024-01-01',
      availableBalance: 8900.50,
      actualBalance: 8900.50
    },
    {
      company: 'BNK1',
      accountNumber: 'ACC800301',
      customerNumber: 'CUST1003',
      accountType: 'INVESTMENT',
      interestRate: 5.5,
      overdraftLimit: 0.00,
      sortCode: '30-90-12',
      openDate: '2022-05-19',
      lastModifiedDate: '2023-12-01',
      nextStatementDate: '2024-01-01',
      availableBalance: 34200.00,
      actualBalance: 34200.00
    }
  ];

  private customersSubject = new BehaviorSubject<Customer[]>(this.mockCustomers);
  private accountsSubject = new BehaviorSubject<Account[]>(this.mockAccounts);

  constructor() {}

  getCustomers(): Observable<Customer[]> {
    return this.customersSubject.asObservable();
  }

  getCustomerByNo(custNo: string): Observable<Customer | undefined> {
    const customer = this.mockCustomers.find(c => c.custNo === custNo);
    return of(customer);
  }

  saveCustomer(customer: Customer): Observable<CRMOperationResult> {
    const index = this.mockCustomers.findIndex(c => c.custNo === customer.custNo);
    if (index >= 0) {
      this.mockCustomers[index] = { ...customer };
    } else {
      if (!customer.custNo) {
        customer.custNo = `CUST${Math.floor(1000 + Math.random() * 9000)}`;
      }
      this.mockCustomers.push(customer);
    }
    this.customersSubject.next([...this.mockCustomers]);
    return of({
      success: true,
      message: `Customer ${customer.custNo} processed successfully.`,
      timestamp: new Date().toISOString()
    });
  }

  deleteCustomer(custNo: string): Observable<CRMOperationResult> {
    this.mockCustomers = this.mockCustomers.filter(c => c.custNo !== custNo);
    this.mockAccounts = this.mockAccounts.filter(a => a.customerNumber !== custNo);
    this.customersSubject.next([...this.mockCustomers]);
    this.accountsSubject.next([...this.mockAccounts]);
    return of({
      success: true,
      message: `Customer ${custNo} and associated accounts deleted. (BNK1DCM)`,
      timestamp: new Date().toISOString()
    });
  }

  getAccounts(): Observable<Account[]> {
    return this.accountsSubject.asObservable();
  }

  getAccountByNo(accNo: string): Observable<Account | undefined> {
    const account = this.mockAccounts.find(a => a.accountNumber === accNo);
    return of(account);
  }

  getAccountsByCustomer(custNo: string): Observable<Account[]> {
    const accounts = this.mockAccounts.filter(a => a.customerNumber === custNo);
    return of(accounts);
  }

  saveAccount(account: Account): Observable<CRMOperationResult> {
    const index = this.mockAccounts.findIndex(a => a.accountNumber === account.accountNumber);
    if (index >= 0) {
      this.mockAccounts[index] = { ...account, lastModifiedDate: new Date().toISOString().split('T')[0] };
    } else {
      if (!account.accountNumber) {
        account.accountNumber = `ACC${Math.floor(800000 + Math.random() * 100000)}`;
      }
      account.openDate = account.openDate || new Date().toISOString().split('T')[0];
      account.lastModifiedDate = new Date().toISOString().split('T')[0];
      this.mockAccounts.push(account);
    }
    this.accountsSubject.next([...this.mockAccounts]);
    return of({
      success: true,
      message: `Account ${account.accountNumber} saved successfully. (BNK1CAM/BNK1UAM)`,
      updatedAccount: account,
      timestamp: new Date().toISOString()
    });
  }

  deleteAccount(accNo: string): Observable<CRMOperationResult> {
    this.mockAccounts = this.mockAccounts.filter(a => a.accountNumber !== accNo);
    this.accountsSubject.next([...this.mockAccounts]);
    return of({
      success: true,
      message: `Account ${accNo} successfully purged from system. (BNK1DAM)`,
      timestamp: new Date().toISOString()
    });
  }

  executeDepositWithdraw(req: DepositWithdrawRequest): Observable<CRMOperationResult> {
    const account = this.mockAccounts.find(a => a.accountNumber === req.accountNumber);
    if (!account) {
      return of({
        success: false,
        message: `Error: Account ${req.accountNumber} not found.`,
        timestamp: new Date().toISOString()
      });
    }

    if (req.sign === '-') {
      if (account.availableBalance + account.overdraftLimit < req.amount) {
        return of({
          success: false,
          message: `Error: Insufficient funds. Overdraft limit exceeded for ${account.accountNumber}.`,
          timestamp: new Date().toISOString()
        });
      }
      account.availableBalance -= req.amount;
      account.actualBalance -= req.amount;
    } else {
      account.availableBalance += req.amount;
      account.actualBalance += req.amount;
    }

    account.lastModifiedDate = new Date().toISOString().split('T')[0];
    this.accountsSubject.next([...this.mockAccounts]);

    return of({
      success: true,
      message: `Transaction successful (BNK1CDM). New Balance: $${account.actualBalance.toFixed(2)}`,
      updatedAccount: account,
      timestamp: new Date().toISOString()
    });
  }

  executeTransfer(req: TransferRequest): Observable<CRMOperationResult> {
    const fromAcc = this.mockAccounts.find(a => a.accountNumber === req.fromAccountNumber);
    const toAcc = this.mockAccounts.find(a => a.accountNumber === req.toAccountNumber);

    if (!fromAcc) {
      return of({
        success: false,
        message: `Error: Source account ${req.fromAccountNumber} not found.`,
        timestamp: new Date().toISOString()
      });
    }

    if (!toAcc) {
      return of({
        success: false,
        message: `Error: Destination account ${req.toAccountNumber} not found.`,
        timestamp: new Date().toISOString()
      });
    }

    if (fromAcc.availableBalance + fromAcc.overdraftLimit < req.amount) {
      return of({
        success: false,
        message: `Error: Insufficient funds in account ${fromAcc.accountNumber}.`,
        timestamp: new Date().toISOString()
      });
    }

    fromAcc.availableBalance -= req.amount;
    fromAcc.actualBalance -= req.amount;
    fromAcc.lastModifiedDate = new Date().toISOString().split('T')[0];

    toAcc.availableBalance += req.amount;
    toAcc.actualBalance += req.amount;
    toAcc.lastModifiedDate = new Date().toISOString().split('T')[0];

    this.accountsSubject.next([...this.mockAccounts]);

    return of({
      success: true,
      message: `Transfer completed successfully (BNK1TFM/BNK1B2M). $${req.amount.toFixed(2)} moved from ${fromAcc.accountNumber} to ${toAcc.accountNumber}.`,
      transactionId: `TXN${Math.floor(10000000 + Math.random() * 90000000)}`,
      timestamp: new Date().toISOString()
    });
  }
}