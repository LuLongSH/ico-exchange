import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transactions } from '../models/transactions.model';

@Injectable({
  providedIn: 'root'
})

export class TransactionsService{
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get('/api/transactions');
  }

  getByName(name: string) {
    return this.http.get<Transactions>(`/api/transactions/${name}`);
  }

  getCurrencyExchanges(){
    return this.http.get(`/api/currency/exchanges`);
  }

  getCurrencyRanges(){
    return this.http.get(`/api/currency/ranges`);
  }

}
