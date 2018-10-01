import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SupportComponent } from './components/support/support.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './services/auth.guard';
import { TransactionResolver } from './resolvers/transaction.resolver';
import { TransactionComponent } from './components/transaction/transaction.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'support', component: SupportComponent },
  {
    path: 'transactions',
    component: TransactionsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'transactions/:name',
    component: TransactionComponent,
    resolve: {
      currencies: TransactionResolver
    },
    canActivate: [AuthGuard]
  },
  // { path: 'transactions', component: TransactionsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
