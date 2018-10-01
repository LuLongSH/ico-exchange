import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { SupportComponent } from './components/support/support.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { LocalizationService } from './services/localization.service';
import { NotificationModalComponent } from './modals/notification/notification-modal.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { TransactionResolver } from './resolvers/transaction.resolver';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    TransactionsComponent,
    TransactionComponent,
    SupportComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NotificationModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:8000'],
        blacklistedRoutes: ['localhost:8000/api/auth', 'localhost:8000/api/register']
      }
    })
  ],
  providers: [
    AuthService,
    AuthGuard,
    LocalizationService,
    TransactionResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
