import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/internal/operators';
import { Subject } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { User } from '../../models/users';
import { LocalizationService } from '../../services/localization.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: []
})
export class LoginComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  user: User = new User;
  public error: string;
  public language: string;
  emailPattern = '[a-zA-Z_]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}';

  constructor(
    private authService: AuthService,
    private router: Router,
    private localizationService: LocalizationService
  ) {
    this.language = this.localizationService.language;
  }

  send() {
    this.authService.login(this.user.email, this.user.password)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        result => this.router.navigate(['transactions']),
        err => this.error = 'Could not authenticate'
      )
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
