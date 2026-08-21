import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account, CreateAccountDto } from '../models/crm.models';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = 'http://localhost:5000/api/accounts';

  constructor(private http: HttpClient) {}

  getAccounts(custNo: string = ''): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.apiUrl}?custNo=${custNo}`);
  }

  getAccount(accNo: string): Observable<Account> {
    return this.http.get<Account>(`${this.apiUrl}/${accNo}`);
  }

  createAccount(account: CreateAccountDto): Observable<Account> {
    return this.http.post<Account>(this.apiUrl, account);
  }

  updateAccount(accNo: string, account: Partial<Account>): Observable<Account> {
    return this.http.put<Account>(`${this.apiUrl}/${accNo}`, account);
  }

  deleteAccount(accNo: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${accNo}`);
  }
}