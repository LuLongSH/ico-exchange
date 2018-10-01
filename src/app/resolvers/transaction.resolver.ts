import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { TransactionsService } from '../services/transactions.service';

@Injectable()
export class TransactionResolver implements Resolve<any> {

  constructor(private transactionsService: TransactionsService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.transactionsService.getCurrencyRanges();
  }
}
