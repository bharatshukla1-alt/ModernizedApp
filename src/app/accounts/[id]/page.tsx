"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Wallet, Save, ArrowLeft, Trash2 } from 'lucide-react';
import { Account } from '@/lib/types';
import { getStoredAccounts, saveAccounts } from '@/lib/store';
import { StatusMessage } from '@/components/StatusMessage';

export default function UpdateAccountPage() {
  const params = useParams();
  const router = useRouter();
  const accNo = params.id as string;

  const [account, setAccount] = useState<Account | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const accs = getStoredAccounts();
    const found = accs.find(a => a.accNo === accNo);
    if (found) {
      setAccount(found);
      setMessage(`BNK1UAM - ACCOUNT RECORD ${accNo} LOADED SUCCESSFUL`);
    } else {
      setMessage(`BNK1UAM ERROR - ACCOUNT ${accNo} NOT FOUND`);
    }
  }, [accNo]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!account) return;

    const accs = getStoredAccounts();
    const updated = accs.map(a => a.accNo === accNo ? account : a);
    saveAccounts(updated);
    setMessage(`BNK1UAM - ACCOUNT ${accNo} UPDATED SUCCESSFULLY`);
  };

  const handleDeleteAccount = () => {
    if (confirm(`BNK1DAM: Are you sure you want to deactivate/close account ${accNo}?`)) {
      const accs = getStoredAccounts();
      const updated = accs.filter(a => a.accNo !== accNo);
      saveAccounts(updated);
      setMessage(`BNK1DAM - ACCOUNT ${accNo} CLOSED AND REMOVED FROM LEDGER`);
      setTimeout(() => router.push('/accounts'), 1000);
    }
  };

  if (!account) {
    return (
      <div className="space-y-4 max-w-4xl mx-auto font-mono text-xs">
        <StatusMessage message={message || 'LOADING ACCOUNT RECORD...'} mapset="BNK1UAM" isError />
        <button onClick={() => router.push('/accounts')} className="text-sky-400 hover:underline flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Back to Accounts
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-mono text-xs">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => router.push('/accounts')}
            className="bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 p-2 rounded transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Wallet className="w-6 h-6 text-sky-400" /> Account Master Details & Update
            </h2>
            <p className="text-slate-400 text-[11px]">Legacy BMS Maps: BNK1UAM (Update) & BNK1DAM (Deactivate)</p>
          </div>
        </div>
        <button
          onClick={handleDeleteAccount}
          className="bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-800 px-3 py-2 rounded flex items-center gap-2 font-bold uppercase transition-colors"
        >
          <Trash2 className="w-4 h-4" /> Deactivate Account (BNK1DAM)
        </button>
      </div>

      <StatusMessage message={message} mapset="BNK1UAM" />

      <form onSubmit={handleSave} className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-6 shadow-xl">
        <div className="border-b border-slate-800 pb-2 text-sky-400 font-bold uppercase text-[11px]">
          Account Attribute Editors (BNK1UAM)
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-slate-400 mb-1">COMPANY</label>
            <input
              type="text"
              disabled
              value={account.company}
              className="w-full bg-slate-950/60 border border-slate-800 rounded px-3 py-2 text-slate-500 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">CUSTOMER ID (CUSTNO)</label>
            <input
              type="text"
              disabled
              value={account.custNo}
              className="w-full bg-slate-950/60 border border-slate-800 rounded px-3 py-2 text-sky-400 font-bold cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">ACCOUNT NO (ACCNO)</label>
            <input
              type="text"
              disabled
              value={account.accNo}
              className="w-full bg-slate-950/60 border border-slate-800 rounded px-3 py-2 text-sky-400 font-bold cursor-not-allowed"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-slate-400 mb-1">ACCOUNT TYPE (ACTYPE)</label>
            <select
              value={account.accTyp}
              onChange={(e) => setAccount({ ...account, accTyp: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-white focus:border-sky-500 outline-none"
            >
              <option value="CHECKING">CHECKING</option>
              <option value="SAVINGS">SAVINGS</option>
              <option value="LOAN">LOAN</option>
              <option value="BUSINESS">BUSINESS</option>
            </select>
          </div>
          <div>
            <label className="block text-slate-400 mb-1">INTEREST RATE % (INTRT)</label>
            <input
              type="number"
              step="0.01"
              value={account.intRt}
              onChange={(e) => setAccount({ ...account, intRt: parseFloat(e.target.value) || 0 })}
              className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-white focus:border-sky-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">OVERDRAFT LIMIT (OVERDR)</label>
            <input
              type="number"
              step="0.01"
              value={account.overdr}
              onChange={(e) => setAccount({ ...account, overdr: parseFloat(e.target.value) || 0 })}
              className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-white focus:border-sky-500 outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
          <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-1">
            <span className="text-slate-500 text-[10px] uppercase block">AVAILABLE BALANCE (AVBAL)</span>
            <span className="text-emerald-400 font-bold text-lg">${account.avail.toFixed(2)}</span>
          </div>
          <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-1">
            <span className="text-slate-500 text-[10px] uppercase block">ACTUAL BALANCE (ACTBAL)</span>
            <span className="text-slate-100 font-bold text-lg">${account.actBal.toFixed(2)}</span>
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
          <button
            type="button"
            onClick={() => router.push('/accounts')}
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs px-5 py-2.5 rounded transition-colors uppercase font-bold"
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-sky-600 hover:bg-sky-500 text-white font-mono text-xs px-6 py-2.5 rounded transition-colors uppercase font-bold flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save Updates (BNK1UAM)
          </button>
        </div>
      </form>
    </div>
  );
}
