import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil, map } from 'rxjs/internal/operators';
import { Subject } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { LocalizationService } from '../../services/localization.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  public formRegister: FormGroup;
  public error: string;
  public language: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private localizationService: LocalizationService
  ) {
    this.language = this.localizationService.language;
    this.formRegister = new FormGroup({
      'email': new FormControl('', [
        Validators.required,
      ],
        this.validateEmail.bind(this)
      ),
      'password': new FormControl('', Validators.required)
    })
  }

  ngOnInit() {
    this.localizationService.isLanguage()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data) => {
        this.language = data;
      })
  }

  send() {
    this.authService.register(this.formRegister.value)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        result => this.router.navigate(['transactions']),
        err => this.error = 'Could not authenticate'
      )
  }

  private validateEmail(control: AbstractControl) {
    return this.authService.validateEmail(control.value)
      .pipe(
        takeUntil(this.ngUnsubscribe),
        map(res => res.isValid ? null : { invalid : true })
      )
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
