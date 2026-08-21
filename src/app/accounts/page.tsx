"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Wallet, PlusCircle, Search, Settings } from 'lucide-react';
import { Account } from '@/lib/types';
import { getStoredAccounts } from '@/lib/store';
import { StatusMessage } from '@/components/StatusMessage';

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [searchAcc, setSearchAcc] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setAccounts(getStoredAccounts());
    setMessage('BNK1CAM / BNK1UAM - ACCOUNT LEDGER OVERVIEW ACTIVE');
  }, []);

  const filtered = accounts.filter(a => 
    !searchAcc || a.accNo.toLowerCase().includes(searchAcc.toLowerCase()) || a.custNo.toLowerCase().includes(searchAcc.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto font-mono text-xs">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Wallet className="w-6 h-6 text-sky-400" /> Account Management Ledger
          </h2>
          <p className="text-slate-400 text-[11px] mt-1">
            Legacy BMS Maps: BNK1CAM (Create/View Account) & BNK1UAM (Update Account)
          </p>
        </div>
        <Link
          href="/accounts/new"
          className="bg-sky-600 hover:bg-sky-500 text-white px-4 py-2 rounded font-bold uppercase transition-colors flex items-center gap-2 font-mono"
        >
          <PlusCircle className="w-4 h-4" /> Open New Account (BNK1CAM)
        </Link>
      </div>

      <StatusMessage message={message} mapset="BNK1CAM" />

      {/* Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 flex flex-col md:flex-row items-center gap-4">
        <div className="flex-1 relative w-full">
          <input
            type="text"
            value={searchAcc}
            onChange={(e) => setSearchAcc(e.target.value)}
            placeholder="Filter by Account No (ACCNO) or Customer No (CUSTNO)..."
            className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 pl-9 text-xs text-white focus:outline-none focus:border-sky-500"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
        </div>
        <div className="text-slate-400 text-xs">
          Total Records: <span className="text-sky-400 font-bold">{filtered.length}</span>
        </div>
      </div>

      {/* Accounts Ledger Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase text-[11px]">
              <tr>
                <th className="p-3">Account No</th>
                <th className="p-3">Customer ID</th>
                <th className="p-3">Type (ACTYPE)</th>
                <th className="p-3">Interest %</th>
                <th className="p-3">Overdraft Limit</th>
                <th className="p-3">Avail Balance</th>
                <th className="p-3">Actual Balance</th>
                <th className="p-3 text-right">Manage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 text-xs">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-6 text-center text-slate-500">
                    NO ACCOUNT RECORDS FOUND MATCHING SEARCH CRITERIA
                  </td>
                </tr>
              ) : (
                filtered.map(acc => (
                  <tr key={acc.accNo} className="hover:bg-slate-800/50 transition-colors">
                    <td className="p-3 font-bold text-sky-400">{acc.accNo}</td>
                    <td className="p-3 text-slate-300 font-semibold">{acc.custNo}</td>
                    <td className="p-3 text-slate-200 font-bold">{acc.accTyp}</td>
                    <td className="p-3 text-slate-300">{acc.intRt}%</td>
                    <td className="p-3 text-slate-300">${acc.overdr.toFixed(2)}</td>
                    <td className="p-3 font-bold text-emerald-400">${acc.avail.toFixed(2)}</td>
                    <td className="p-3 font-bold text-slate-100">${acc.actBal.toFixed(2)}</td>
                    <td className="p-3 text-right">
                      <Link
                        href={`/accounts/${acc.accNo}`}
                        className="inline-flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded border border-slate-700 transition-colors text-[11px] font-bold uppercase"
                      >
                        <Settings className="w-3 h-3" /> View / Edit
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
