"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserPlus, Save, ArrowLeft } from 'lucide-react';
import { Customer } from '@/lib/types';
import { getStoredCustomers, saveCustomers } from '@/lib/store';
import { StatusMessage } from '@/components/StatusMessage';

export default function NewCustomerPage() {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    company: 'MOD-CORP-01',
    custNo: `CUST-${Math.floor(10000 + Math.random() * 90000)}`,
    custTit: 'Mr.',
    christn: '',
    custIns: '',
    custSn: '',
    custAd1: '',
    custAd2: '',
    city: '',
    postcode: '',
    country: 'USA',
    dobDD: '01',
    dobMM: '01',
    dobYY: '1990',
    sortCode: '10-20-30',
    credSc: '750',
    scrdtDD: '01',
    scrdtMM: '01',
    scrdtYY: '2024'
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.christn || !formData.custSn) {
      setMessage('BNK1CCM ERROR: FIRST NAME AND SURNAME ARE REQUIRED.');
      return;
    }

    const newCustomer: Customer = {
      ...formData,
      status: 'ACTIVE',
      lastMessage: 'BNK1CCM - CUSTOMER MASTER RECORD CREATED SUCCESSFULLY'
    };

    const existing = getStoredCustomers();
    saveCustomers([newCustomer, ...existing]);
    setMessage(`BNK1CCM - CUSTOMER ${newCustomer.custNo} CREATED SUCCESSFULLY.`);
    
    setTimeout(() => {
      router.push('/customers');
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => router.back()}
            className="bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 p-2 rounded transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-2xl font-bold font-mono text-white flex items-center gap-2">
              <UserPlus className="w-6 h-6 text-sky-400" /> New Customer Profile
            </h2>
            <p className="text-xs text-slate-400 font-mono">BMS Mapset: BNK1CCM</p>
          </div>
        </div>
      </div>

      <StatusMessage message={message} mapset="BNK1CCM" />

      <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-6 shadow-xl font-mono text-xs">
        <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
          <span className="text-sky-400 font-bold uppercase">Legacy BMS Field Mapping (BNK1CCM)</span>
          <span className="text-slate-500 text-[10px]">Company: {formData.company}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-slate-400 mb-1">COMPANY</label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => handleChange('company', e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-white font-mono focus:border-sky-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">CUSTOMER NO (CUSTNO2)</label>
            <input
              type="text"
              value={formData.custNo}
              onChange={(e) => handleChange('custNo', e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-sky-400 font-mono font-bold focus:border-sky-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">TITLE (CUSTTIT)</label>
            <select
              value={formData.custTit}
              onChange={(e) => handleChange('custTit', e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-white font-mono focus:border-sky-500 outline-none"
            >
              <option value="Mr.">Mr.</option>
              <option value="Ms.">Ms.</option>
              <option value="Mrs.">Mrs.</option>
              <option value="Dr.">Dr.</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-slate-400 mb-1">FIRST NAME (CHRISTN)</label>
            <input
              type="text"
              value={formData.christn}
              onChange={(e) => handleChange('christn', e.target.value)}
              required
              placeholder="e.g. John"
              className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-white font-mono focus:border-sky-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">MIDDLE INITIAL (CUSTINS)</label>
            <input
              type="text"
              maxLength={1}
              value={formData.custIns}
              onChange={(e) => handleChange('custIns', e.target.value)}
              placeholder="e.g. M"
              className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-white font-mono focus:border-sky-500 outline-none uppercase"
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">SURNAME (CUSTSN)</label>
            <input
              type="text"
              value={formData.custSn}
              onChange={(e) => handleChange('custSn', e.target.value)}
              required
              placeholder="e.g. Doe"
              className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-white font-mono focus:border-sky-500 outline-none"
            />
          </div>
        </div>

        {/* Address Information */}
        <div className="space-y-4 pt-2 border-t border-slate-800">
          <h4 className="text-slate-300 font-bold uppercase text-[11px]">Address & Location Attributes</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">ADDRESS LINE 1 (CUSTAD1)</label>
              <input
                type="text"
                value={formData.custAd1}
                onChange={(e) => handleChange('custAd1', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-white font-mono focus:border-sky-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">ADDRESS LINE 2 (CUSTAD2)</label>
              <input
                type="text"
                value={formData.custAd2}
                onChange={(e) => handleChange('custAd2', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-white font-mono focus:border-sky-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">CITY (CITY)</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleChange('city', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-white font-mono focus:border-sky-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">POSTCODE (POSTCODE)</label>
              <input
                type="text"
                value={formData.postcode}
                onChange={(e) => handleChange('postcode', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-white font-mono focus:border-sky-500 outline-none uppercase"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">COUNTRY (COUNTRY)</label>
              <input
                type="text"
                value={formData.country}
                onChange={(e) => handleChange('country', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-white font-mono focus:border-sky-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Date of birth, credit score & sortcode */}
        <div className="space-y-4 pt-2 border-t border-slate-800">
          <h4 className="text-slate-300 font-bold uppercase text-[11px]">Banking & Credit Scoring Fields</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">DATE OF BIRTH (DOBDD/MM/YY)</label>
              <div className="flex items-center space-x-1">
                <input
                  type="text"
                  maxLength={2}
                  placeholder="DD"
                  value={formData.dobDD}
                  onChange={(e) => handleChange('dobDD', e.target.value)}
                  className="w-16 bg-slate-950 border border-slate-700 rounded px-2 py-2 text-center text-white font-mono focus:border-sky-500 outline-none"
                />
                <span className="text-slate-600">/</span>
                <input
                  type="text"
                  maxLength={2}
                  placeholder="MM"
                  value={formData.dobMM}
                  onChange={(e) => handleChange('dobMM', e.target.value)}
                  className="w-16 bg-slate-950 border border-slate-700 rounded px-2 py-2 text-center text-white font-mono focus:border-sky-500 outline-none"
                />
                <span className="text-slate-600">/</span>
                <input
                  type="text"
                  maxLength={4}
                  placeholder="YYYY"
                  value={formData.dobYY}
                  onChange={(e) => handleChange('dobYY', e.target.value)}
                  className="w-20 bg-slate-950 border border-slate-700 rounded px-2 py-2 text-center text-white font-mono focus:border-sky-500 outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-slate-400 mb-1">SORT CODE (SORTC)</label>
              <input
                type="text"
                value={formData.sortCode}
                onChange={(e) => handleChange('sortCode', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-white font-mono focus:border-sky-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">CREDIT SCORE (CREDSC)</label>
              <input
                type="number"
                value={formData.credSc}
                onChange={(e) => handleChange('credSc', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-emerald-400 font-bold font-mono focus:border-sky-500 outline-none"
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
            <Save className="w-4 h-4" /> Save Customer Record
          </button>
        </div>
      </form>
    </div>
  );
}
