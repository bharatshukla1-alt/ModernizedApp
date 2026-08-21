"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PlusCircle, Save, ArrowLeft } from 'lucide-react';
import { Account } from '@/lib/types';
import { getStoredAccounts, saveAccounts, getStoredCustomers } from '@/lib/store';
import { StatusMessage } from '@/components/StatusMessage';

export default function OpenAccountPage() {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const customers = getStoredCustomers();

  const [formData, setFormData] = useState({
    company: 'MOD-CORP-01',
    custNo: customers[0]?.custNo || 'CUST-10001',
    accNo: `ACC-${Math.floor(10000 + Math.random() * 90000)}`,
    accTyp: 'CHECKING',
    intRt: '2.50',
    overdr: '500.00',
    srtCd: '10-20-30',
    openDD: '15',
    openMM: '02',
    openYY: '2024',
    lstmDD: '15',
    lstmMM: '02',
    lstmYY: '2024',
    nstmtDD: '15',
    nstmtMM: '03',
    nstmtYY: '2024',
    avail: '1000.00',
    actBal: '1000.00'
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newAcc: Account = {
      company: formData.company,
      custNo: formData.custNo,
      accNo: formData.accNo,
      accTyp: formData.accTyp,
      intRt: parseFloat(formData.intRt) || 0,
      overdr: parseFloat(formData.overdr) || 0,
      srtCd: formData.srtCd,
      openDD: formData.openDD,
      openMM: formData.openMM,
      openYY: formData.openYY,
      lstmDD: formData.lstmDD,
      lstmMM: formData.lstmMM,
      lstmYY: formData.lstmYY,
      nstmtDD: formData.nstmtDD,
      nstmtMM: formData.nstmtMM,
      nstmtYY: formData.nstmtYY,
      avail: parseFloat(formData.avail) || 0,
      actBal: parseFloat(formData.actBal) || 0,
      status: 'ACTIVE',
      lastMessage: 'BNK1CAM - ACCOUNT CREATED SUCCESSFULLY'
    };

    const existing = getStoredAccounts();
    saveAccounts([newAcc, ...existing]);
    setMessage(`BNK1CAM - ACCOUNT ${newAcc.accNo} CREATED SUCCESSFULLY FOR ${newAcc.custNo}`);
    
    setTimeout(() => {
      router.push('/accounts');
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-mono text-xs">
      <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
        <button
          onClick={() => router.back()}
          className="bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 p-2 rounded transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <PlusCircle className="w-6 h-6 text-sky-400" /> Open Account Master Record
          </h2>
          <p className="text-slate-400 text-[11px]">Legacy BMS Map: BNK1CAM</p>
        </div>
      </div>

      <StatusMessage message={message} mapset="BNK1CAM" />

      <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-6 shadow-xl">
        <div className="border-b border-slate-800 pb-2 text-sky-400 font-bold uppercase text-[11px]">
          BMS Account Fields Mapping (BNK1CAM)
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-slate-400 mb-1">COMPANY</label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => handleChange('company', e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-white outline-none focus:border-sky-500"
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">CUSTOMER ID (CUSTNO)</label>
            <select
              value={formData.custNo}
              onChange={(e) => handleChange('custNo', e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-sky-400 font-bold outline-none focus:border-sky-500"
            >
              {customers.map(c => (
                <option key={c.custNo} value={c.custNo}>
                  {c.custNo} ({c.christn} {c.custSn})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-slate-400 mb-1">ACCOUNT NO (ACCNO / ACCNO2)</label>
            <input
              type="text"
              value={formData.accNo}
              onChange={(e) => handleChange('accNo', e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-sky-400 font-bold outline-none focus:border-sky-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-slate-400 mb-1">ACCOUNT TYPE (ACCTYP / ACTYPE)</label>
            <select
              value={formData.accTyp}
              onChange={(e) => handleChange('accTyp', e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-white outline-none focus:border-sky-500"
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
              value={formData.intRt}
              onChange={(e) => handleChange('intRt', e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-white outline-none focus:border-sky-500"
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">OVERDRAFT LIMIT (OVERDR)</label>
            <input
              type="number"
              step="0.01"
              value={formData.overdr}
              onChange={(e) => handleChange('overdr', e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-white outline-none focus:border-sky-500"
            />
          </div>
        </div>

        {/* Dates and Balances */}
        <div className="space-y-4 pt-2 border-t border-slate-800">
          <h4 className="text-slate-300 font-bold uppercase text-[11px]">Opening & Statement Dates</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">OPEN DATE (OPENDD/MM/YY)</label>
              <div className="flex items-center space-x-1">
                <input type="text" maxLength={2} value={formData.openDD} onChange={e => handleChange('openDD', e.target.value)} className="w-14 bg-slate-950 border border-slate-700 rounded p-2 text-center text-white" />
                <span>/</span>
                <input type="text" maxLength={2} value={formData.openMM} onChange={e => handleChange('openMM', e.target.value)} className="w-14 bg-slate-950 border border-slate-700 rounded p-2 text-center text-white" />
                <span>/</span>
                <input type="text" maxLength={4} value={formData.openYY} onChange={e => handleChange('openYY', e.target.value)} className="w-20 bg-slate-950 border border-slate-700 rounded p-2 text-center text-white" />
              </div>
            </div>
            <div>
              <label className="block text-slate-400 mb-1">SORT CODE (SRTCD / SORTC)</label>
              <input
                type="text"
                value={formData.srtCd}
                onChange={(e) => handleChange('srtCd', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-white outline-none focus:border-sky-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">INITIAL BALANCE (AVAIL / ACTBAL)</label>
              <input
                type="number"
                step="0.01"
                value={formData.actBal}
                onChange={(e) => {
                  handleChange('actBal', e.target.value);
                  handleChange('avail', e.target.value);
                }}
                className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-emerald-400 font-bold outline-none focus:border-sky-500"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs px-5 py-2.5 rounded transition-colors uppercase font-bold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-sky-600 hover:bg-sky-500 text-white font-mono text-xs px-6 py-2.5 rounded transition-colors uppercase font-bold flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Create Account Record
          </button>
        </div>
      </form>
    </div>
  );
}
