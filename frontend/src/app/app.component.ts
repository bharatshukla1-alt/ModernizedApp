import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
      <div class="container">
        <a class="navbar-brand" routerLink="/">ModernizedApp CRM</a>
        <div class="navbar-nav">
          <a class="nav-link" routerLink="/customers">Customers</a>
          <a class="nav-link" routerLink="/accounts">Accounts</a>
          <a class="nav-link" routerLink="/transfer">Transfers</a>
        </div>
      </div>
    </nav>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {}
