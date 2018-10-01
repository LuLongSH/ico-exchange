import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators';

import { CurrencyToDollar } from '../../models/CurrencyToDollar';
import { CurrencyHistory } from '../../models/CurrencyHistory';
import { TransactionsService } from '../../services/transactions.service';
import { LocalizationService } from '../../services/localization.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  public currenciesToUSD: CurrencyToDollar[];
  public currencyHistory: CurrencyHistory[];
  public selectedCurrencies: CurrencyHistory[];
  public language: string;

  constructor(
    private transactionsService: TransactionsService,
    private localizationService: LocalizationService
  ) {
    this.language = this.localizationService.language;
  }

  ngOnInit() {
    this.transactionsService.getCurrencyExchanges()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data:CurrencyToDollar[]) => {
        this.currenciesToUSD = data;
      });

    this.transactionsService.getCurrencyRanges()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data:CurrencyHistory[]) => {
        this.currencyHistory = data;
      });

    this.localizationService.isLanguage()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data) => {
        this.language = data;
      })
  }

  onSelect(data: CurrencyToDollar) {
    this.selectedCurrencies = this.currencyHistory
      .filter(tempData => tempData.name === data.name);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
