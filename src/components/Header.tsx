import React from 'react';
import { FileImage } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export function Header() {
  const step = useAppStore(state => state.step);

  return (
    <header className="h-14 border-b border-[#E2E8F0] bg-white flex items-center justify-between px-6 shrink-0 shadow-sm z-10 w-full relative">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center">
          <FileImage size={20} strokeWidth={2.5} className="text-white"/>
        </div>
        <h1 className="font-bold text-lg tracking-tight">Passport Pro <span className="text-[10px] font-medium bg-[#E2E8F0] px-1.5 py-0.5 rounded text-[#64748B] align-middle ml-1">BETA</span></h1>
      </div>
      
      <div className="flex items-center gap-4">
        {step > 1 && step < 8 && (
          <div className="flex items-center gap-2 text-sm text-[#64748B]">
            <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
            Step {step - 1} of 6
          </div>
        )}
      </div>
    </header>
  );
}
