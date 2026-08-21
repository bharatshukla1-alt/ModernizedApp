"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Wallet, ArrowLeft, Trash2, PlusCircle } from 'lucide-react';
import { Customer, Account } from '@/lib/types';
import { getStoredCustomers, saveCustomers, getStoredAccounts } from '@/lib/store';
import { StatusMessage } from '@/components/StatusMessage';

export default function CustomerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const custNo = params.id as string;

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const custs = getStoredCustomers();
    const foundCust = custs.find(c => c.custNo === custNo);
    if (foundCust) {
      setCustomer(foundCust);
      setMessage(`BNK1DCM - CUSTOMER ${custNo} RECORD LOADED OK`);
    } else {
      setMessage(`BNK1DCM ERROR - CUSTOMER ${custNo} NOT FOUND IN MASTER DB`);
    }

    const accs = getStoredAccounts();
    setAccounts(accs.filter(a => a.custNo === custNo));
  }, [custNo]);

  const handleDelete = () => {
    if (confirm(`Confirm deletion of Customer ${custNo} (BNK1DCM)?`)) {
      const custs = getStoredCustomers();
      const updated = custs.filter(c => c.custNo !== custNo);
      saveCustomers(updated);
      router.push('/customers');
    }
  };

  if (!customer) {
    return (
      <div className="space-y-4 max-w-4xl mx-auto font-mono text-xs">
        <StatusMessage message={message || 'LOADING RECORD...'} mapset="BNK1DCM" isError />
        <button onClick={() => router.push('/customers')} className="text-sky-400 hover:underline flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Back to Customers
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-mono text-xs">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => router.push('/customers')}
            className="bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 p-2 rounded transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <User className="w-6 h-6 text-sky-400" /> {customer.custTit} {customer.christn} {customer.custSn}
            </h2>
            <p className="text-slate-400 text-[11px]">CUSTNO: <span className="text-sky-400 font-bold">{customer.custNo}</span> | COMPANY: {customer.company}</p>
          </div>
        </div>
        <button
          onClick={handleDelete}
          className="bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-800 px-3 py-2 rounded flex items-center gap-2 font-bold uppercase transition-colors"
        >
          <Trash2 className="w-4 h-4" /> Delete Customer (BNK1DCM)
        </button>
      </div>

      <StatusMessage message={message} mapset="BNK1DCM" />

      {/* Master Data Grid - BNK1DCM Mapping */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-6 shadow-xl">
        <div className="border-b border-slate-800 pb-2 text-sky-400 font-bold uppercase text-[11px] flex justify-between items-center">
          <span>BMS Master Fields (BNK1DCM)</span>
          <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded text-[10px]">{customer.status}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <span className="text-slate-500 block">CUSTTITL / CUSTFNAM / CUSTLNAM</span>
            <span className="text-slate-100 font-bold text-sm">{customer.custTit} {customer.christn} {customer.custIns} {customer.custSn}</span>
          </div>
          <div>
            <span className="text-slate-500 block">CUSTAD1 / CUSTAD2</span>
            <span className="text-slate-200">{customer.custAd1 || 'N/A'}{customer.custAd2 ? `, ${customer.custAd2}` : ''}</span>
          </div>
          <div>
            <span className="text-slate-500 block">CITY / CUSTPOST / CUSTCTRY</span>
            <span className="text-slate-200">{customer.city || 'N/A'}, {customer.postcode} ({customer.country})</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-800">
          <div>
            <span className="text-slate-500 block">DOBDD / DOBMM / DOBYY</span>
            <span className="text-slate-200 font-bold">{customer.dobDD}/{customer.dobMM}/{customer.dobYY}</span>
          </div>
          <div>
            <span className="text-slate-500 block">SORTC (SORT CODE)</span>
            <span className="text-slate-200 font-bold">{customer.sortCode}</span>
          </div>
          <div>
            <span className="text-slate-500 block">CREDSC (CREDIT SCORE) & SCRDT</span>
            <span className="text-emerald-400 font-bold text-sm">{customer.credSc} <span className="text-slate-500 text-xs font-normal">(Evaluated {customer.scrdtDD}/{customer.scrdtMM}/{customer.scrdtYY})</span></span>
          </div>
        </div>
      </div>

      {/* Associated Accounts Ledger */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Wallet className="w-5 h-5 text-sky-400" /> Associated Customer Accounts ({accounts.length})
          </h3>
          <Link
            href="/accounts/new"
            className="bg-sky-600 hover:bg-sky-500 text-white px-3 py-1.5 rounded text-xs font-mono flex items-center gap-1 transition-colors uppercase font-bold"
          >
            <PlusCircle className="w-3.5 h-3.5" /> Open Account (BNK1CAM)
          </Link>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase">
              <tr>
                <th className="p-3">Account No</th>
                <th className="p-3">Type</th>
                <th className="p-3">Interest Rate</th>
                <th className="p-3">Overdraft</th>
                <th className="p-3">Avail Balance</th>
                <th className="p-3">Actual Balance</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {accounts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-slate-500">
                    NO ACCOUNTS REGISTERED FOR THIS CUSTOMER
                  </td>
                </tr>
              ) : (
                accounts.map(acc => (
                  <tr key={acc.accNo} className="hover:bg-slate-800/50 transition-colors">
                    <td className="p-3 font-bold text-sky-400">{acc.accNo}</td>
                    <td className="p-3 font-semibold text-slate-200">{acc.accTyp}</td>
                    <td className="p-3">{acc.intRt}%</td>
                    <td className="p-3">${acc.overdr.toFixed(2)}</td>
                    <td className="p-3 font-bold text-emerald-400">${acc.avail.toFixed(2)}</td>
                    <td className="p-3 font-bold text-slate-100">${acc.actBal.toFixed(2)}</td>
                    <td className="p-3 text-right">
                      <Link
                        href={`/accounts/${acc.accNo}`}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-2 py-1 rounded text-[11px] border border-slate-700 transition-colors"
                      >
                        Manage (BNK1UAM)
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
