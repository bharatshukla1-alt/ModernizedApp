"use client";

import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface Props {
  message?: string;
  isError?: boolean;
  mapset?: string;
}

export function StatusMessage({ message, isError = false, mapset }: Props) {
  if (!message) return null;

  return (
    <div className={`p-3 rounded-md border font-mono text-xs flex items-center justify-between shadow-sm ${' '}
      ${isError ? 'bg-red-950/40 border-red-800 text-red-300' : 'bg-emerald-950/40 border-emerald-800 text-emerald-300'}`}
    >
      <div className="flex items-center gap-2">
        {isError ? (
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
        ) : (
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
        )}
        <span>{message}</span>
      </div>
      {mapset && (
        <span className="bg-slate-900 px-2 py-0.5 rounded text-[10px] text-slate-400 border border-slate-700 font-semibold">
          BMS MAP: {mapset}
        </span>
      )}
    </div>
  );
}
