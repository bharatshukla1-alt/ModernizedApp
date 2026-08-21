"use client";

import React from 'react';
import { ShieldCheck, Terminal, Cpu } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="flex items-center space-x-3">
        <div className="bg-sky-600 p-2 rounded-lg text-white font-bold flex items-center justify-center">
          <Cpu className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-100 flex items-center gap-2">
            ModernizedApp <span className="text-xs bg-sky-950 text-sky-400 border border-sky-800 px-2 py-0.5 rounded font-mono">CRM / COBOL v4.2</span>
          </h1>
          <p className="text-xs text-slate-400 font-mono">Target Domain: Customer Relationship Management (CICS / BMS Migration)</p>
        </div>
      </div>

      <div className="flex items-center space-x-4 text-xs font-mono text-slate-300 bg-slate-950 px-3 py-2 rounded border border-slate-800">
        <div className="flex items-center space-x-1">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span>COMPANY:</span>
          <span className="text-emerald-400 font-bold">MOD-CORP-01</span>
        </div>
        <div className="h-4 w-px bg-slate-800"></div>
        <div className="flex items-center space-x-1 text-slate-400">
          <ShieldCheck className="w-4 h-4 text-sky-400" />
          <span>SYS: ONLINE</span>
        </div>
      </div>
    </header>
  );
}
