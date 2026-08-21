import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction, TransferDto, DepositWithdrawDto } from '../models/crm.models';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'http://localhost:5000/api/transactions';

  constructor(private http: HttpClient) {}

  getTransactions(accNo: string = ''): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}?accNo=${accNo}`);
  }

  depositOrWithdraw(dto: DepositWithdrawDto): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.apiUrl}/deposit-withdraw`, dto);
  }

  transfer(dto: TransferDto): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.apiUrl}/transfer`, dto);
  }
}