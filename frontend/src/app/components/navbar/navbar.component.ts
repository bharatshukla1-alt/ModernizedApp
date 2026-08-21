import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="bg-slate-800 border-b border-slate-700 shadow-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center space-x-3">
            <div class="bg-indigo-600 text-white rounded-lg p-2 font-bold mono text-lg">
              BNK1
            </div>
            <div>
              <span class="text-lg font-bold text-white tracking-wide">ModernizedApp</span>
              <span class="hidden sm:inline-block text-xs bg-indigo-900 text-indigo-300 px-2 py-0.5 rounded ml-2 font-mono">CRM Hub</span>
            </div>
          </div>
          
          <div class="flex space-x-1 md:space-x-4">
            <a routerLink="/dashboard" routerLinkActive="bg-slate-900 text-indigo-400" class="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1">
              <span>Dashboard</span>
            </a>
            <a routerLink="/customers" routerLinkActive="bg-slate-900 text-indigo-400" class="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1">
              <span>Customers</span>
            </a>
            <a routerLink="/accounts" routerLinkActive="bg-slate-900 text-indigo-400" class="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1">
              <span>Accounts</span>
            </a>
            <a routerLink="/deposit-withdraw" routerLinkActive="bg-slate-900 text-indigo-400" class="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1">
              <span>Deposit / Debit</span>
            </a>
            <a routerLink="/transfer" routerLinkActive="bg-slate-900 text-indigo-400" class="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1">
              <span>Fund Transfer</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent {}
