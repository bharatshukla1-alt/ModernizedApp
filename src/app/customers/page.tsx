"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, UserPlus, Eye, Trash2, CreditCard } from 'lucide-react';
import { Customer } from '@/lib/types';
import { getStoredCustomers, saveCustomers } from '@/lib/store';
import { StatusMessage } from '@/components/StatusMessage';

export default function CustomerListPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchCustNo, setSearchCustNo] = useState('');
  const [searchCompany, setSearchCompany] = useState('MOD-CORP-01');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setCustomers(getStoredCustomers());
    setMessage('BNK1ACC - CUSTOMER INQUIRY SCREEN READY');
  }, []);

  const filteredCustomers = customers.filter(c => {
    const matchCompany = !searchCompany || c.company.toLowerCase().includes(searchCompany.toLowerCase());
    const matchNo = !searchCustNo || c.custNo.toLowerCase().includes(searchCustNo.toLowerCase()) || 
                    `${c.christn} ${c.custSn}`.toLowerCase().includes(searchCustNo.toLowerCase());
    return matchCompany && matchNo;
  });

  const handleDeleteCustomer = (custNo: string) => {
    if (confirm(`BNK1DCM: Are you sure you want to delete Customer ${custNo}?`)) {
      const updated = customers.filter(c => c.custNo !== custNo);
      setCustomers(updated);
      saveCustomers(updated);
      setMessage(`BNK1DCM - CUSTOMER ${custNo} RECORD DELETED SUCCESSFULLY`);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white font-mono flex items-center gap-2">
            Customer Lookup & Inquiry
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Legacy BMS Maps: BNK1ACC (Customer Inquiry) & BNK1DCM (Delete Profile)
          </p>
        </div>
        <Link
          href="/customers/new"
          className="bg-sky-600 hover:bg-sky-500 text-white px-4 py-2 rounded text-xs font-mono flex items-center gap-2 font-bold uppercase transition-colors"
        >
          <UserPlus className="w-4 h-4" /> New Customer (BNK1CCM)
        </Link>
      </div>

      <StatusMessage message={message} mapset="BNK1ACC" />

      {/* Filter / Search Bar (BNK1ACC Mapping) */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-mono text-slate-400 mb-1">COMPANY (COMPANY)</label>
          <input
            type="text"
            value={searchCompany}
            onChange={(e) => setSearchCompany(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-sky-500"
          />
        </div>
        <div>
          <label className="block text-xs font-mono text-slate-400 mb-1">CUSTOMER ID / NAME (CUSTNO)</label>
          <div className="relative">
            <input
              type="text"
              value={searchCustNo}
              onChange={(e) => setSearchCustNo(e.target.value)}
              placeholder="Search CUSTNO or Name..."
              className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-1.5 pl-8 text-xs font-mono text-white focus:outline-none focus:border-sky-500"
            />
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
          </div>
        </div>
        <div className="flex items-end">
          <button
            onClick={() => setMessage(`BNK1ACC - SEARCH QUERY EXECUTED. ${filteredCustomers.length} RECORDS FOUND.`)}
            className="w-full bg-slate-800 hover:bg-slate-700 text-sky-400 font-mono text-xs py-2 rounded border border-slate-700 transition-colors uppercase font-bold"
          >
            REFRESH INQUIRY
          </button>
        </div>
      </div>

      {/* Table List */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase">
              <tr>
                <th className="p-3">Customer No</th>
                <th className="p-3">Full Name</th>
                <th className="p-3">City / Country</th>
                <th className="p-3">Sort Code</th>
                <th className="p-3">Credit Score</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-slate-500 font-mono">
                    NO CUSTOMER RECORDS MATCHING CRITERIA
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((c) => (
                  <tr key={c.custNo} className="hover:bg-slate-800/50 transition-colors">
                    <td className="p-3 font-bold text-sky-400">{c.custNo}</td>
                    <td className="p-3 font-semibold text-slate-200">
                      {c.custTit} {c.christn} {c.custIns} {c.custSn}
                    </td>
                    <td className="p-3 text-slate-400">{c.city}, {c.country}</td>
                    <td className="p-3 text-slate-400">{c.sortCode}</td>
                    <td className="p-3 font-bold text-emerald-400">{c.credSc}</td>
                    <td className="p-3">
                      <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded text-[10px]">
                        {c.status}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <Link
                        href={`/customers/${c.custNo}`}
                        className="inline-flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-200 px-2 py-1 rounded text-[11px] border border-slate-700 transition-colors"
                      >
                        <Eye className="w-3 h-3" /> View
                      </Link>
                      <button
                        onClick={() => handleDeleteCustomer(c.custNo)}
                        className="inline-flex items-center gap-1 bg-red-950/60 hover:bg-red-900 text-red-300 px-2 py-1 rounded text-[11px] border border-red-800 transition-colors"
                      >
                        <Trash2 className="w-3 h-3" /> Delete
                      </button>
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
