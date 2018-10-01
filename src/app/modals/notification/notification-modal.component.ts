import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators';

@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.css']
})
export class NotificationModalComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  notificationInterval$ = interval(10000);
  isShow: boolean;

  constructor() {}

  onClose() {
    this.isShow = false;
  }

  ngOnInit() {
    this.notificationInterval$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => this.isShow = !this.isShow)
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
