import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators';

import { CurrencyToDollar } from '../../models/CurrencyToDollar';
import { Transactions } from '../../models/transactions';
import { TransactionsService } from '../../services/transactions.service';
import { LocalizationService } from '../../services/localization.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  private transactions: Transactions[];
  private language: string;
  private currencyRenewal$ = interval(120000);
  update: boolean;

  constructor(
    private transactionsService: TransactionsService,
    private localizationService: LocalizationService
    ) {
      this.language = this.localizationService.language;
    }

  ngOnInit() {
    this.currencyRenewal$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => this.updateCurrencies());

    this.transactionsService.getAll()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data:Transactions[]) => {
        this.transactions = data;
      });

    this.localizationService.isLanguage()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data) => {
        this.language = data;
      })
  }

  private updateCurrencies() {
    this.transactions.forEach(transaction => {
      transaction.amount = +(transaction.remain * 0.01).toFixed(2);
      transaction.remain = +(+transaction.remain + +transaction.amount).toFixed(2);
      this.update = true;
      setTimeout(() => {this.update = false}, 2000);
    })
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
