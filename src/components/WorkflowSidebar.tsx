import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { cn } from '../lib/utils';

export function WorkflowSidebar() {
  const step = useAppStore(state => state.step);
  
  const steps = [
    { id: 1, label: 'Welcome' },
    { id: 2, label: 'Photo Upload' },
    { id: 3, label: 'Size Selection' },
    { id: 4, label: 'Photo Crop' },
    { id: 5, label: 'Style & Border' },
    { id: 6, label: 'Print Layout' },
    { id: 7, label: 'Format & Export' },
    { id: 8, label: 'Success' },
  ];

  return (
    <nav className="hidden lg:flex w-[240px] border-r border-[#E2E8F0] bg-white flex-col shrink-0 overflow-y-auto">
      <div className="p-4">
        <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-widest mb-4">Workflow Steps</p>
        <div className="space-y-1">
          {steps.map(s => {
            const isCompleted = step > s.id;
            const isCurrent = step === s.id;
            return (
              <div key={s.id} className={cn("flex items-center gap-3 p-2 text-sm rounded-lg", 
                isCurrent ? "bg-[#F1F5F9] text-[#2563EB] font-medium" : 
                isCompleted ? "text-[#64748B]" : "text-[#94A3B8]")}>
                {isCompleted ? (
                   <div className="w-5 h-5 rounded-full border border-green-500 flex items-center justify-center text-[10px] text-green-500 min-w-5">✓</div>
                ) : isCurrent ? (
                   <div className="w-5 h-5 rounded-full bg-[#2563EB] text-white flex items-center justify-center text-[10px] min-w-5">{s.id}</div>
                ) : (
                   <div className="w-5 h-5 rounded-full border border-[#E2E8F0] flex items-center justify-center text-[10px] min-w-5">{s.id}</div>
                )}
                <span>{s.label}</span>
              </div>
            )
          })}
        </div>
      </div>
      <div className="mt-auto p-4 border-t border-[#E2E8F0]">
        <div className="rounded-lg p-3 h-20 flex items-center justify-center text-[#CBD5E1] font-black text-2xl tracking-widest opacity-50 select-none">
          WEBGUNO
        </div>
      </div>
    </nav>
  )
}
