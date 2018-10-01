import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators';

import { Transactions } from '../../models/transactions';
import { LocalizationService } from '../../services/localization.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  private transactions: Transactions[];
  private language: string;

  constructor(
    private route: ActivatedRoute,
    private localizationService: LocalizationService
  ) {
    this.language = this.localizationService.language;
  }

  ngOnInit() {
    const currencyName = this.route.snapshot.params['name'];

    this.route.data
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        this.transactions = data.currencies.filter(tempData => tempData.name === currencyName);
      });

    this.localizationService.isLanguage()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data) => {
        this.language = data;
      })
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
