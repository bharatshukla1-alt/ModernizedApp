"use client";

import React, { useState, useEffect } from 'react';
import { SlidersHorizontal, CheckCircle2 } from 'lucide-react';
import { Account } from '@/lib/types';
import { getStoredAccounts, saveAccounts } from '@/lib/store';
import { StatusMessage } from '@/components/StatusMessage';

export default function BatchAdjustmentPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    company: 'MOD-CORP-01',
    fscde1: 'SYS',
    fscde2: 'ADJ',
    fscde3: '001',
    fAccNo: '',
    amt: '150.00',
    actSign: '+' as '+' | '-',
    actPnd: 0,
    actPnc: 0,
    avaSign: '+' as '+' | '-',
    avaPnd: 0,
    avaPnc: 0,
    tscde1: 'SYS',
    tscde2: 'ADJ',
    tscde3: '002',
    tAccNo: ''
  });

  useEffect(() => {
    const accs = getStoredAccounts();
    setAccounts(accs);
    if (accs.length >= 2) {
      setFormData(prev => ({ ...prev, fAccNo: accs[0].accNo, tAccNo: accs[1].accNo }));
    } else if (accs.length === 1) {
      setFormData(prev => ({ ...prev, fAccNo: accs[0].accNo, tAccNo: accs[0].accNo }));
    }
    setMessage('BNK1B2M - BATCH LEDGER ADJUSTMENT MODULE INITIALIZED');
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(formData.amt);
    if (isNaN(amount) || amount <= 0) {
      setMessage('BNK1B2M ERROR: INVALID BATCH ADJUSTMENT AMOUNT.');
      return;
    }

    const actDelta = formData.actSign === '+' ? amount : -amount;
    const avaDelta = formData.avaSign === '+' ? amount : -amount;

    const updated = accounts.map(a => {
      if (a.accNo === formData.fAccNo) {
        return {
          ...a,
          actBal: a.actBal + actDelta,
          avail: a.avail + avaDelta,
          lastMessage: `BNK1B2M BATCH ADJUSTMENT COMPLETED (${formData.fscde1}${formData.fscde2}${formData.fscde3})`
        };
      }
      return a;
    });

    setAccounts(updated);
    saveAccounts(updated);
    setMessage(`BNK1B2M SUCCESS: APPLIED COBOL BATCH LEDGER ADJUSTMENT TO ACCOUNT ${formData.fAccNo}. SERVICE CODE: ${formData.fscde1}-${formData.fscde2}-${formData.fscde3}`);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-mono text-xs">
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <SlidersHorizontal className="w-6 h-6 text-sky-400" /> Batch Ledger Adjustments & Service Codes
        </h2>
        <p className="text-slate-400 text-[11px] mt-1">
          Legacy BMS Map: BNK1B2M (Batch Adjustments, Service Codes & Pending Balances)
        </p>
      </div>

      <StatusMessage message={message} mapset="BNK1B2M" />

      <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-6 shadow-xl">
        <div className="border-b border-slate-800 pb-2 text-sky-400 font-bold uppercase text-[11px] flex justify-between items-center">
          <span>BMS Field Mapping (BNK1B2M)</span>
          <span className="text-slate-500">Company: {formData.company}</span>
        </div>

        {/* Service Code Fields & Account */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-4 rounded border border-slate-800">
          {/* From Service Codes */}
          <div className="space-y-3">
            <h4 className="font-bold text-sky-400 uppercase text-[11px]">From Service Code (FSCDE1 - FSCDE3)</h4>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-slate-500 text-[10px]">FSCDE1</label>
                <input
                  type="text"
                  value={formData.fscde1}
                  onChange={e => setFormData({ ...formData, fscde1: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-center text-white uppercase"
                />
              </div>
              <div>
                <label className="block text-slate-500 text-[10px]">FSCDE2</label>
                <input
                  type="text"
                  value={formData.fscde2}
                  onChange={e => setFormData({ ...formData, fscde2: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-center text-white uppercase"
                />
              </div>
              <div>
                <label className="block text-slate-500 text-[10px]">FSCDE3</label>
                <input
                  type="text"
                  value={formData.fscde3}
                  onChange={e => setFormData({ ...formData, fscde3: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-center text-white uppercase"
                />
              </div>
            </div>
            <div>
              <label className="block text-slate-400 mb-1">FROM ACCOUNT (FACCNO)</label>
              <select
                value={formData.fAccNo}
                onChange={e => setFormData({ ...formData, fAccNo: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sky-400 font-bold outline-none focus:border-sky-500"
              >
                {accounts.map(a => (
                  <option key={a.accNo} value={a.accNo}>
                    {a.accNo} - ActBal: ${a.actBal.toFixed(2)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* To Service Codes */}
          <div className="space-y-3">
            <h4 className="font-bold text-sky-400 uppercase text-[11px]">To Service Code (TSCDE1 - TSCDE3)</h4>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-slate-500 text-[10px]">TSCDE1</label>
                <input
                  type="text"
                  value={formData.tscde1}
                  onChange={e => setFormData({ ...formData, tscde1: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-center text-white uppercase"
                />
              </div>
              <div>
                <label className="block text-slate-500 text-[10px]">TSCDE2</label>
                <input
                  type="text"
                  value={formData.tscde2}
                  onChange={e => setFormData({ ...formData, tscde2: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-center text-white uppercase"
                />
              </div>
              <div>
                <label className="block text-slate-500 text-[10px]">TSCDE3</label>
                <input
                  type="text"
                  value={formData.tscde3}
                  onChange={e => setFormData({ ...formData, tscde3: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-center text-white uppercase"
                />
              </div>
            </div>
            <div>
              <label className="block text-slate-400 mb-1">TO ACCOUNT (TACCNO)</label>
              <select
                value={formData.tAccNo}
                onChange={e => setFormData({ ...formData, tAccNo: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sky-400 font-bold outline-none focus:border-sky-500"
              >
                {accounts.map(a => (
                  <option key={a.accNo} value={a.accNo}>
                    {a.accNo} - ActBal: ${a.actBal.toFixed(2)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Sign and Amount Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div>
            <label className="block text-slate-400 mb-1">ACTUAL SIGN (ACTSIGN)</label>
            <select
              value={formData.actSign}
              onChange={e => setFormData({ ...formData, actSign: e.target.value as '+' | '-' })}
              className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-white font-bold outline-none"
            >
              <option value="+">+ Positive Adjustment</option>
              <option value="-">- Negative Adjustment</option>
            </select>
          </div>
          <div>
            <label className="block text-slate-400 mb-1">AVAIL SIGN (AVASIGN)</label>
            <select
              value={formData.avaSign}
              onChange={e => setFormData({ ...formData, avaSign: e.target.value as '+' | '-' })}
              className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-white font-bold outline-none"
            >
              <option value="+">+ Positive Adjustment</option>
              <option value="-">- Negative Adjustment</option>
            </select>
          </div>
          <div>
            <label className="block text-slate-400 mb-1">ADJUSTMENT AMOUNT (AMT)</label>
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
          className="w-full bg-sky-600 hover:bg-sky-500 text-white font-mono text-xs py-3 rounded transition-colors font-bold uppercase shadow-md flex items-center justify-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4" /> PROCESS BATCH ADJUSTMENT (BNK1B2M)
        </button>
      </form>
    </div>
  );
}
