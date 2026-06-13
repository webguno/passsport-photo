import React from 'react';
import { useAppStore } from '../store/useAppStore';

export function Header() {
  const step = useAppStore(state => state.step);

  return (
    <header className="h-14 border-b border-[#E2E8F0] bg-white flex items-center justify-between px-6 shrink-0 shadow-sm z-10 w-full relative">
      <div className="flex items-center gap-3 font-outfit">
        <img src="/app-icon.png" alt="App Icon" className="w-[51px] h-[51px] rounded-lg" />
        <div className="flex flex-col">
          <h1 className="font-bold text-lg tracking-tight leading-none">Passport Photo</h1>
          <span className="text-[10px] text-[#94A3B8] font-medium tracking-tight mt-0.5">App By WEBGUNO</span>
        </div>
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
