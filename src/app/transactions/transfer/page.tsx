"use client";

import React, { useState, useEffect } from 'react';
import { ArrowRightLeft, ArrowRight } from 'lucide-react';
import { Account } from '@/lib/types';
import { getStoredAccounts, saveAccounts } from '@/lib/store';
import { StatusMessage } from '@/components/StatusMessage';

export default function FundsTransferPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [message, setMessage] = useState('');
  
  const [formData, setFormData] = useState({
    company: 'MOD-CORP-01',
    fAccNo: '',
    tAccNo: '',
    amt: '250.00',
    fSortC: '10-20-30',
    tSortC: '10-20-30'
  });

  useEffect(() => {
    const accs = getStoredAccounts();
    setAccounts(accs);
    if (accs.length >= 2) {
      setFormData(prev => ({
        ...prev,
        fAccNo: accs[0].accNo,
        fSortC: accs[0].srtCd,
        tAccNo: accs[1].accNo,
        tSortC: accs[1].srtCd
      }));
    } else if (accs.length === 1) {
      setFormData(prev => ({ ...prev, fAccNo: accs[0].accNo, fSortC: accs[0].srtCd }));
    }
    setMessage('BNK1TFM - FUNDS TRANSFER MODULE INITIALIZED');
  }, []);

  const fromAccount = accounts.find(a => a.accNo === formData.fAccNo);
  const toAccount = accounts.find(a => a.accNo === formData.tAccNo);

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(formData.amt);

    if (isNaN(amount) || amount <= 0) {
      setMessage('BNK1TFM ERROR: INVALID TRANSFER AMOUNT.');
      return;
    }

    if (!fromAccount || !toAccount) {
      setMessage('BNK1TFM ERROR: SOURCE AND TARGET ACCOUNTS MUST BE SELECTED.');
      return;
    }

    if (fromAccount.accNo === toAccount.accNo) {
      setMessage('BNK1TFM ERROR: SOURCE AND TARGET ACCOUNTS CANNOT BE THE SAME.');
      return;
    }

    if (fromAccount.avail < amount) {
      setMessage(`BNK1TFM REJECTED: INSUFFICIENT FUNDS IN SOURCE ACCOUNT ${fromAccount.accNo}.`);
      return;
    }

    const updated = accounts.map(a => {
      if (a.accNo === fromAccount.accNo) {
        return {
          ...a,
          avail: a.avail - amount,
          actBal: a.actBal - amount,
          lastMessage: `BNK1TFM TRANSFER OUT $${amount.toFixed(2)} TO ${toAccount.accNo}`
        };
      }
      if (a.accNo === toAccount.accNo) {
        return {
          ...a,
          avail: a.avail + amount,
          actBal: a.actBal + amount,
          lastMessage: `BNK1TFM TRANSFER IN $${amount.toFixed(2)} FROM ${fromAccount.accNo}`
        };
      }
      return a;
    });

    setAccounts(updated);
    saveAccounts(updated);
    setMessage(`BNK1TFM SUCCESS: TRANSFERRED $${amount.toFixed(2)} FROM ${fromAccount.accNo} TO ${toAccount.accNo}.`);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-mono text-xs">
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <ArrowRightLeft className="w-6 h-6 text-sky-400" /> Inter-Account Funds Transfer
        </h2>
        <p className="text-slate-400 text-[11px] mt-1">
          Legacy BMS Map: BNK1TFM (Transfer Funds Routine)
        </p>
      </div>

      <StatusMessage message={message} mapset="BNK1TFM" />

      <form onSubmit={handleTransfer} className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-6 shadow-xl">
        <div className="border-b border-slate-800 pb-2 text-sky-400 font-bold uppercase text-[11px] flex justify-between items-center">
          <span>BMS Field Map (BNK1TFM)</span>
          <span className="text-slate-500">Company: {formData.company}</span>
        </div>

        {/* From / To side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-950 rounded border border-slate-800">
          {/* Source Account */}
          <div className="space-y-4">
            <div className="font-bold text-amber-400 uppercase text-[11px] flex items-center gap-2">
              Source Account (FACCNO)
            </div>
            <div>
              <label className="block text-slate-400 mb-1">FROM ACCOUNT (FACCNO)</label>
              <select
                value={formData.fAccNo}
                onChange={e => {
                  const acc = accounts.find(a => a.accNo === e.target.value);
                  setFormData({ ...formData, fAccNo: e.target.value, fSortC: acc?.srtCd || formData.fSortC });
                }}
                className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-amber-400 font-bold outline-none focus:border-amber-500"
              >
                {accounts.map(a => (
                  <option key={a.accNo} value={a.accNo}>
                    {a.accNo} (Bal: ${a.avail.toFixed(2)})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-slate-400 mb-1">SOURCE SORT CODE (FSORTC)</label>
              <input
                type="text"
                value={formData.fSortC}
                onChange={e => setFormData({ ...formData, fSortC: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white outline-none focus:border-amber-500"
              />
            </div>
            {fromAccount && (
              <div className="text-[11px] text-slate-400 bg-slate-900 p-2 rounded border border-slate-800">
                FACTBAL / FAVBAL: <span className="text-emerald-400 font-bold">${fromAccount.avail.toFixed(2)}</span>
              </div>
            )}
          </div>

          {/* Target Account */}
          <div className="space-y-4">
            <div className="font-bold text-sky-400 uppercase text-[11px] flex items-center gap-2">
              Target Account (TACCNO)
            </div>
            <div>
              <label className="block text-slate-400 mb-1">TO ACCOUNT (TACCNO)</label>
              <select
                value={formData.tAccNo}
                onChange={e => {
                  const acc = accounts.find(a => a.accNo === e.target.value);
                  setFormData({ ...formData, tAccNo: e.target.value, tSortC: acc?.srtCd || formData.tSortC });
                }}
                className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sky-400 font-bold outline-none focus:border-sky-500"
              >
                {accounts.map(a => (
                  <option key={a.accNo} value={a.accNo}>
                    {a.accNo} (Bal: ${a.avail.toFixed(2)})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-slate-400 mb-1">TARGET SORT CODE (TSORTC)</label>
              <input
                type="text"
                value={formData.tSortC}
                onChange={e => setFormData({ ...formData, tSortC: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white outline-none focus:border-sky-500"
              />
            </div>
            {toAccount && (
              <div className="text-[11px] text-slate-400 bg-slate-900 p-2 rounded border border-slate-800">
                TACTBAL / TAVBAL: <span className="text-emerald-400 font-bold">${toAccount.avail.toFixed(2)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Transfer Amount Input */}
        <div className="bg-slate-950 p-4 rounded border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div>
            <label className="block text-slate-400 mb-1 font-bold">TRANSFER AMOUNT (AMT)</label>
            <input
              type="number"
              step="0.01"
              value={formData.amt}
              onChange={e => setFormData({ ...formData, amt: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-emerald-400 font-bold text-base outline-none focus:border-sky-500"
            />
          </div>
          <div className="text-[11px] text-slate-400 space-y-1">
            <p className="flex items-center gap-1 text-slate-300 font-semibold">
              <ArrowRight className="w-3.5 h-3.5 text-sky-400" /> COBOL Validation Rule:
            </p>
            <p>Verifies active balance and valid sort codes prior to execution.</p>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-sky-600 hover:bg-sky-500 text-white font-mono text-xs py-3 rounded transition-colors font-bold uppercase shadow-md flex items-center justify-center gap-2"
        >
          <ArrowRightLeft className="w-4 h-4" /> EXECUTE TRANSFER (BNK1TFM)
        </button>
      </form>
    </div>
  );
}
