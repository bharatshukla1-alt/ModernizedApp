"use client";

import React, { useState, useEffect } from 'react';
import { Banknote, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { Account } from '@/lib/types';
import { getStoredAccounts, saveAccounts } from '@/lib/store';
import { StatusMessage } from '@/components/StatusMessage';

export default function DepositWithdrawPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [message, setMessage] = useState('');
  
  const [formData, setFormData] = useState({
    company: 'MOD-CORP-01',
    accNo: '',
    sign: '+' as '+' | '-',
    amt: '100.00',
    sortCode: '10-20-30'
  });

  useEffect(() => {
    const accs = getStoredAccounts();
    setAccounts(accs);
    if (accs.length > 0) {
      setFormData(prev => ({ ...prev, accNo: accs[0].accNo, sortCode: accs[0].srtCd }));
    }
    setMessage('BNK1CDM - DEPOSIT & WITHDRAWAL ROUTINE ACTIVE');
  }, []);

  const selectedAccount = accounts.find(a => a.accNo === formData.accNo);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(formData.amt);
    if (isNaN(amount) || amount <= 0) {
      setMessage('BNK1CDM ERROR: AMOUNT MUST BE A POSITIVE NUMBER.');
      return;
    }

    if (!selectedAccount) {
      setMessage('BNK1CDM ERROR: VALID ACCOUNT MUST BE SELECTED.');
      return;
    }

    if (formData.sign === '-' && (selectedAccount.avail + selectedAccount.overdr) < amount) {
      setMessage(`BNK1CDM REJECTED: INSUFFICIENT FUNDS IN ${selectedAccount.accNo}. AVAIL + OVERDRAFT EXCEEDED.`);
      return;
    }

    const delta = formData.sign === '+' ? amount : -amount;
    const updatedAccounts = accounts.map(a => {
      if (a.accNo === formData.accNo) {
        return {
          ...a,
          avail: a.avail + delta,
          actBal: a.actBal + delta,
          lastMessage: `BNK1CDM ${formData.sign === '+' ? 'DEPOSIT' : 'WITHDRAWAL'} OF $${amount.toFixed(2)} COMPLETED`
        };
      }
      return a;
    });

    setAccounts(updatedAccounts);
    saveAccounts(updatedAccounts);
    setMessage(`BNK1CDM SUCCESS: ${formData.sign === '+' ? 'DEPOSITED' : 'WITHDREW'} $${amount.toFixed(2)} ON ${formData.accNo}. NEW AVAIL BAL: $${(selectedAccount.avail + delta).toFixed(2)}`);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-mono text-xs">
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Banknote className="w-6 h-6 text-sky-400" /> Cash Transaction Processing
        </h2>
        <p className="text-slate-400 text-[11px] mt-1">
          Legacy BMS Map: BNK1CDM (Account Cash Deposit / Withdrawal)
        </p>
      </div>

      <StatusMessage message={message} mapset="BNK1CDM" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <form onSubmit={handleSubmit} className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-6 shadow-xl">
          <div className="border-b border-slate-800 pb-2 text-sky-400 font-bold uppercase text-[11px]">
            BMS Field Inputs (BNK1CDM)
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">COMPANY</label>
              <input
                type="text"
                value={formData.company}
                onChange={e => setFormData({ ...formData, company: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-white outline-none focus:border-sky-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">SORT CODE (SORTC)</label>
              <input
                type="text"
                value={formData.sortCode}
                onChange={e => setFormData({ ...formData, sortCode: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-white outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-1">TARGET ACCOUNT (ACCNO)</label>
            <select
              value={formData.accNo}
              onChange={e => {
                const acc = accounts.find(a => a.accNo === e.target.value);
                setFormData({ ...formData, accNo: e.target.value, sortCode: acc?.srtCd || formData.sortCode });
              }}
              className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-sky-400 font-bold outline-none focus:border-sky-500"
            >
              {accounts.map(a => (
                <option key={a.accNo} value={a.accNo}>
                  {a.accNo} - {a.accTyp} (Bal: ${a.avail.toFixed(2)})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">TRANSACTION SIGN (SIGN)</label>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, sign: '+' })}
                  className={`flex-1 py-2 rounded font-bold border transition-colors flex items-center justify-center gap-1 ${
                    formData.sign === '+' 
                      ? 'bg-emerald-950 border-emerald-500 text-emerald-400'
                      : 'bg-slate-950 border-slate-800 text-slate-500'
                  }`}
                >
                  <ArrowDownLeft className="w-4 h-4" /> + Deposit
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, sign: '-' })}
                  className={`flex-1 py-2 rounded font-bold border transition-colors flex items-center justify-center gap-1 ${
                    formData.sign === '-' 
                      ? 'bg-red-950 border-red-500 text-red-400'
                      : 'bg-slate-950 border-slate-800 text-slate-500'
                  }`}
                >
                  <ArrowUpRight className="w-4 h-4" /> - Withdrawal
                </button>
              </div>
            </div>
            <div>
              <label className="block text-slate-400 mb-1">AMOUNT (AMT)</label>
              <input
                type="number"
                step="0.01"
                value={formData.amt}
                onChange={e => setFormData({ ...formData, amt: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-emerald-400 font-bold text-base outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-sky-600 hover:bg-sky-500 text-white font-mono text-xs py-3 rounded transition-colors font-bold uppercase shadow-md"
          >
            EXECUTE TRANSACTION (BNK1CDM)
          </button>
        </form>

        {/* Account Detail Box */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-5 space-y-4 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-300 uppercase border-b border-slate-800 pb-2 mb-3">
              Current Ledger Record
            </h3>
            {selectedAccount ? (
              <div className="space-y-3">
                <div>
                  <span className="text-slate-500 block text-[10px]">ACCOUNT NUMBER</span>
                  <span className="text-sky-400 font-bold text-sm">{selectedAccount.accNo}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">CUSTOMER REF</span>
                  <span className="text-slate-200 font-bold">{selectedAccount.custNo}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">SORT CODE</span>
                  <span className="text-slate-200 font-bold">{selectedAccount.srtCd}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">AVAILABLE BALANCE (AVBAL)</span>
                  <span className="text-emerald-400 font-bold text-lg">${selectedAccount.avail.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">ACTUAL BALANCE (ACTBAL)</span>
                  <span className="text-slate-100 font-bold text-sm">${selectedAccount.actBal.toFixed(2)}</span>
                </div>
              </div>
            ) : (
              <p className="text-slate-500 text-center py-6">No account selected</p>
            )}
          </div>
          <div className="text-[10px] text-slate-500 border-t border-slate-800 pt-3 font-mono">
            COBOL Record: BNK1CDM-REC
          </div>
        </div>
      </div>
    </div>
  );
}
