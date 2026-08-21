"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  Wallet, 
  PlusCircle, 
  ArrowRightLeft, 
  Banknote, 
  SlidersHorizontal 
} from 'lucide-react';

export function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Main Menu (BNK1MAI)', icon: LayoutDashboard },
    { href: '/customers', label: 'Customers (BNK1ACC)', icon: Users },
    { href: '/customers/new', label: 'New Customer (BNK1CCM)', icon: UserPlus },
    { href: '/accounts', label: 'Accounts Ledger', icon: Wallet },
    { href: '/accounts/new', label: 'Open Account (BNK1CAM)', icon: PlusCircle },
    { href: '/transactions/deposit-withdraw', label: 'Deposit/Withdraw (BNK1CDM)', icon: Banknote },
    { href: '/transactions/transfer', label: 'Funds Transfer (BNK1TFM)', icon: ArrowRightLeft },
    { href: '/transactions/batch', label: 'Batch Adjust (BNK1B2M)', icon: SlidersHorizontal },
  ];

  return (
    <nav className="w-full md:w-64 bg-slate-900 border-r border-slate-800 p-4 shrink-0">
      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-2 font-mono">
        COBOL BMS Map Routines
      </div>
      <ul className="space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-xs font-mono transition-colors ${
                  isActive
                    ? 'bg-sky-600 text-white font-bold shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{link.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
