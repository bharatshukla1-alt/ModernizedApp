"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  UserPlus, 
  Wallet, 
  PlusCircle, 
  Banknote, 
  ArrowRightLeft, 
  SlidersHorizontal,
  Search,
  Layers
} from 'lucide-react';
import { StatusMessage } from '@/components/StatusMessage';

export default function MainMenuPage() {
  const router = Router();
  const [actionInput, setActionInput] = useState('');
  const [message, setMessage] = useState('BNK1MAI - SYSTEM READY. SELECT ACTION CODE OR ENTER NAVIGATION.');

  const handleActionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = actionInput.trim().toUpperCase();
    switch (code) {
      case '1':
      case 'CCM':
        router.push('/customers/new');
        break;
      case '2':
      case 'ACC':
        router.push('/customers');
        break;
      case '3':
      case 'CAM':
        router.push('/accounts/new');
        break;
      case '4':
      case 'CDM':
        router.push('/transactions/deposit-withdraw');
        break;
      case '5':
      case 'TFM':
        router.push('/transactions/transfer');
        break;
      case '6':
      case 'B2M':
        router.push('/transactions/batch');
        break;
      default:
        setMessage(`INVALID ACTION CODE '${code}'. AVAILABLE: 1-CCM, 2-ACC, 3-CAM, 4-CDM, 5-TFM, 6-B2M.`);
        break;
    }
  };

  function Router() {
    return useRouter();
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="border-b border-slate-800 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Layers className="w-6 h-6 text-sky-400" />
            Main Application Dispatch
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Modernized Legacy CICS Main Menu Map (BNK1MAI)
          </p>
        </div>
        <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded text-xs font-mono text-slate-300">
          COMPANY ID: <span className="text-emerald-400 font-bold">MOD-CORP-01</span>
        </div>
      </div>

      <StatusMessage message={message} mapset="BNK1MAI" />

      {/* Fast Action Command Input - Mimicking Legacy CICS Action Field */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-5 shadow-lg">
        <h3 className="text-sm font-semibold text-sky-400 font-mono mb-2 uppercase flex items-center gap-2">
          <Search className="w-4 h-4" /> CICS Legacy Direct Action Code (BNK1MAI - ACTION)
        </h3>
        <form onSubmit={handleActionSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={actionInput}
            onChange={(e) => setActionInput(e.target.value)}
            placeholder="Enter code (e.g. 1=CCM, 2=ACC, 3=CAM, 4=CDM, 5=TFM, 6=B2M)..."
            className="flex-1 bg-slate-950 border border-slate-700 rounded px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-sky-500 uppercase"
          />
          <button
            type="submit"
            className="bg-sky-600 hover:bg-sky-500 text-white font-mono text-xs px-6 py-2 rounded transition-colors uppercase font-bold"
          >
            EXECUTE ACTION
          </button>
        </form>
      </div>

      {/* Grid Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <Link href="/customers/new" className="group bg-slate-900 border border-slate-800 hover:border-sky-500 rounded-lg p-5 transition-all shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-sky-950 text-sky-400 rounded-md group-hover:bg-sky-600 group-hover:text-white transition-colors">
                <UserPlus className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-slate-500 bg-slate-950 px-2 py-1 rounded border border-slate-800">MAPSET: BNK1CCM</span>
            </div>
            <h4 className="font-bold text-slate-100 group-hover:text-sky-400 transition-colors font-mono">1. Create Customer Profile</h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Register customer title, name, address, DOB, sort code, and credit score ratings.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-sky-400 flex items-center justify-between">
            <span>Action Code: 1 / CCM</span>
            <span>&rarr;</span>
          </div>
        </Link>

        <Link href="/customers" className="group bg-slate-900 border border-slate-800 hover:border-sky-500 rounded-lg p-5 transition-all shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-sky-950 text-sky-400 rounded-md group-hover:bg-sky-600 group-hover:text-white transition-colors">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-slate-500 bg-slate-950 px-2 py-1 rounded border border-slate-800">MAPSET: BNK1ACC / BNK1DCM</span>
            </div>
            <h4 className="font-bold text-slate-100 group-hover:text-sky-400 transition-colors font-mono">2. Customer Lookup & Master</h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Search customer directory, review profile attributes, or perform customer deletion.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-sky-400 flex items-center justify-between">
            <span>Action Code: 2 / ACC</span>
            <span>&rarr;</span>
          </div>
        </Link>

        <Link href="/accounts/new" className="group bg-slate-900 border border-slate-800 hover:border-sky-500 rounded-lg p-5 transition-all shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-sky-950 text-sky-400 rounded-md group-hover:bg-sky-600 group-hover:text-white transition-colors">
                <PlusCircle className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-slate-500 bg-slate-950 px-2 py-1 rounded border border-slate-800">MAPSET: BNK1CAM</span>
            </div>
            <h4 className="font-bold text-slate-100 group-hover:text-sky-400 transition-colors font-mono">3. Create Account Record</h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Open new account with interest rate, overdraft limits, opening date & balances.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-sky-400 flex items-center justify-between">
            <span>Action Code: 3 / CAM</span>
            <span>&rarr;</span>
          </div>
        </Link>

        <Link href="/transactions/deposit-withdraw" className="group bg-slate-900 border border-slate-800 hover:border-sky-500 rounded-lg p-5 transition-all shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-sky-950 text-sky-400 rounded-md group-hover:bg-sky-600 group-hover:text-white transition-colors">
                <Banknote className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-slate-500 bg-slate-950 px-2 py-1 rounded border border-slate-800">MAPSET: BNK1CDM</span>
            </div>
            <h4 className="font-bold text-slate-100 group-hover:text-sky-400 transition-colors font-mono">4. Deposit / Withdrawal</h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Process account deposits (+) and withdrawals (-) updating available and actual balance.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-sky-400 flex items-center justify-between">
            <span>Action Code: 4 / CDM</span>
            <span>&rarr;</span>
          </div>
        </Link>

        <Link href="/transactions/transfer" className="group bg-slate-900 border border-slate-800 hover:border-sky-500 rounded-lg p-5 transition-all shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-sky-950 text-sky-400 rounded-md group-hover:bg-sky-600 group-hover:text-white transition-colors">
                <ArrowRightLeft className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-slate-500 bg-slate-950 px-2 py-1 rounded border border-slate-800">MAPSET: BNK1TFM</span>
            </div>
            <h4 className="font-bold text-slate-100 group-hover:text-sky-400 transition-colors font-mono">5. Funds Transfer</h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Transfer funds between target accounts with sort code validation and balance checks.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-sky-400 flex items-center justify-between">
            <span>Action Code: 5 / TFM</span>
            <span>&rarr;</span>
          </div>
        </Link>

        <Link href="/transactions/batch" className="group bg-slate-900 border border-slate-800 hover:border-sky-500 rounded-lg p-5 transition-all shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-sky-950 text-sky-400 rounded-md group-hover:bg-sky-600 group-hover:text-white transition-colors">
                <SlidersHorizontal className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-slate-500 bg-slate-950 px-2 py-1 rounded border border-slate-800">MAPSET: BNK1B2M</span>
            </div>
            <h4 className="font-bold text-slate-100 group-hover:text-sky-400 transition-colors font-mono">6. Batch Ledger Adjustment</h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Apply service codes (FSCDE/TSCDE), pending/cleared adjustments and balance signs.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-sky-400 flex items-center justify-between">
            <span>Action Code: 6 / B2M</span>
            <span>&rarr;</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
