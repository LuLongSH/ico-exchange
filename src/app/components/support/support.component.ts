import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalizationService } from '../../services/localization.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  private language: string;

  constructor(private localizationService: LocalizationService) {
    this.language = this.localizationService.language;
  }

  ngOnInit() {
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
