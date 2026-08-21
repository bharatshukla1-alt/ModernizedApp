import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CrmService } from '../../services/crm.service';
import { Customer, Account } from '../../models/crm-models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, CurrencyPipe],
  template: `
    <div class="space-y-6">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 class="text-2xl font-bold text-white">Core Executive Overview</h1>
          <p class="text-slate-400 text-sm mt-1">Modernized from COBOL CICS Mapset BNK1MAI (Main Controller)</p>
        </div>
        <div class="flex space-x-3">
          <a routerLink="/customers/new" class="btn-primary text-sm flex items-center space-x-2">
            <span>+ Add New Customer</span>
          </a>
          <a routerLink="/accounts/new" class="btn-secondary text-sm flex items-center space-x-2">
            <span>+ Open Account</span>
          </a>
        </div>
      </div>

      <!-- Metric Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="glass-card p-5 border-l-4 border-indigo-500">
          <p class="text-slate-400 text-xs font-semibold uppercase tracking-wider">Total Active Clients</p>
          <p class="text-3xl font-extrabold text-white mt-2">{{ totalCustomers }}</p>
          <p class="text-xs text-indigo-400 mt-2 font-mono">BMS Map: BNK1CCM / BNK1DCM</p>
        </div>
        
        <div class="glass-card p-5 border-l-4 border-emerald-500">
          <p class="text-slate-400 text-xs font-semibold uppercase tracking-wider">Total System Deposit</p>
          <p class="text-3xl font-extrabold text-emerald-400 mt-2">{{ totalBalance | currency:'USD':'symbol':'1.2-2' }}</p>
          <p class="text-xs text-emerald-400 mt-2 font-mono">Aggregated ACTBAL</p>
        </div>

        <div class="glass-card p-5 border-l-4 border-amber-500">
          <p class="text-slate-400 text-xs font-semibold uppercase tracking-wider">Active Managed Accounts</p>
          <p class="text-3xl font-extrabold text-white mt-2">{{ totalAccounts }}</p>
          <p class="text-xs text-amber-400 mt-2 font-mono">BMS Map: BNK1CAM / BNK1UAM</p>
        </div>

        <div class="glass-card p-5 border-l-4 border-blue-500">
          <p class="text-slate-400 text-xs font-semibold uppercase tracking-wider">Avg Customer Credit Score</p>
          <p class="text-3xl font-extrabold text-white mt-2">{{ avgCreditScore }}</p>
          <p class="text-xs text-blue-400 mt-2 font-mono">BNK1CCM - CREDSC Field</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Customer Overview Table -->
        <div class="glass-card p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-bold text-white">Recent Customers</h2>
            <a routerLink="/customers" class="text-indigo-400 hover:text-indigo-300 text-sm font-medium">View All &rarr;</a>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm">
              <thead class="text-xs uppercase bg-slate-800 text-slate-400 border-b border-slate-700">
                <tr>
                  <th class="py-3 px-3">Cust No</th>
                  <th class="py-3 px-3">Name</th>
                  <th class="py-3 px-3">City</th>
                  <th class="py-3 px-3">Score</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800">
                @for (cust of customers.slice(0, 5); track cust.custNo) {
                  <tr class="hover:bg-slate-800/50 transition-colors">
                    <td class="py-3 px-3 font-mono text-indigo-300">{{ cust.custNo }}</td>
                    <td class="py-3 px-3 font-medium text-white">{{ cust.title }} {{ cust.firstName }} {{ cust.lastName }}</td>
                    <td class="py-3 px-3 text-slate-300">{{ cust.city }}</td>
                    <td class="py-3 px-3 font-semibold text-emerald-400">{{ cust.creditScore }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>

        <!-- Quick Actions Panel -->
        <div class="glass-card p-6 space-y-4">
          <h2 class="text-lg font-bold text-white mb-4">Legacy BMS Operations Switcher</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a routerLink="/deposit-withdraw" class="p-4 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 block transition-all hover:border-indigo-500">
              <div class="font-bold text-indigo-400 text-base">Deposit / Debit (BNK1CDM)</div>
              <div class="text-xs text-slate-400 mt-1">Execute real-time balance adjustments (+ / -) against customer accounts.</div>
            </a>
            <a routerLink="/transfer" class="p-4 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 block transition-all hover:border-emerald-500">
              <div class="font-bold text-emerald-400 text-base">Fund Transfer (BNK1TFM)</div>
              <div class="text-xs text-slate-400 mt-1">Transfer money between accounts with dual sort-code verification.</div>
            </a>
            <a routerLink="/accounts/new" class="p-4 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 block transition-all hover:border-amber-500">
              <div class="font-bold text-amber-400 text-base">Account Creation (BNK1CAM)</div>
              <div class="text-xs text-slate-400 mt-1">Set up savings, checking, or investment portfolios with overdrafts.</div>
            </a>
            <a routerLink="/customers/new" class="p-4 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 block transition-all hover:border-blue-500">
              <div class="font-bold text-blue-400 text-base">Customer Onboarding (BNK1CCM)</div>
              <div class="text-xs text-slate-400 mt-1">Register demographic data, addresses, and credit score evaluations.</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  customers: Customer[] = [];
  accounts: Account[] = [];
  totalCustomers = 0;
  totalAccounts = 0;
  totalBalance = 0;
  avgCreditScore = 0;

  constructor(private crmService: CrmService) {}

  ngOnInit(): void {
    this.crmService.getCustomers().subscribe(custs => {
      this.customers = custs;
      this.totalCustomers = custs.length;
      if (custs.length > 0) {
        const sumScore = custs.reduce((acc, c) => acc + c.creditScore, 0);
        this.avgCreditScore = Math.round(sumScore / custs.length);
      }
    });

    this.crmService.getAccounts().subscribe(accs => {
      this.accounts = accs;
      this.totalAccounts = accs.length;
      this.totalBalance = accs.reduce((acc, a) => acc + a.actualBalance, 0);
    });
  }
}
