import { Routes } from '@angular/router';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';
import { AccountListComponent } from './components/account-list/account-list.component';
import { TransferComponent } from './components/transfer/transfer.component';

export const routes: Routes = [
  { path: '', redirectTo: 'customers', pathMatch: 'full' },
  { path: 'customers', component: CustomerListComponent },
  { path: 'customers/:custNo', component: CustomerDetailComponent },
  { path: 'accounts', component: AccountListComponent },
  { path: 'transfer', component: TransferComponent },
  { path: '**', redirectTo: 'customers' }
];