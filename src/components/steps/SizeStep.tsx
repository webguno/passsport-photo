import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Button } from '../ui/Button';
import { PRESET_SIZES, Unit } from '../../types';
import { ArrowLeft, ArrowRight, Expand } from 'lucide-react';
import { cn } from '../../lib/utils';

export function SizeStep() {
  const { photoSize, setPhotoSize, customWidth, customHeight, customUnit, setCustomSize, nextStep, prevStep } = useAppStore();

  const isCustom = photoSize.id === 'custom';

  return (
    <div className="flex flex-col h-full bg-white rounded-xl border border-[#E2E8F0] shadow-sm">
      <div className="p-5 border-b border-[#E2E8F0]">
        <h2 className="text-lg font-bold text-[#1E293B]">Select Format Size</h2>
        <p className="text-xs text-[#64748B] mt-1">Choose a preset or enter custom dimensions.</p>
      </div>

      <div className="p-6 flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {PRESET_SIZES.map((size) => (
            <button
              key={size.id}
              onClick={() => setPhotoSize(size)}
              className={cn(
                "flex items-center p-3 rounded-lg border text-left transition-all",
                photoSize.id === size.id 
                  ? "border-[#2563EB] bg-blue-50 ring-1 ring-[#2563EB]" 
                  : "border-[#E2E8F0] bg-white hover:border-[#94A3B8]"
              )}
            >
               <div className="w-10 h-10 bg-white rounded-md shadow-sm border border-[#E2E8F0] flex items-center justify-center mr-3 shrink-0">
                   <Expand className={photoSize.id === size.id ? "text-[#2563EB] w-5 h-5" : "text-[#94A3B8] w-5 h-5"} />
               </div>
               <div>
                  <h3 className={cn("text-sm font-semibold", photoSize.id === size.id ? "text-[#2563EB]" : "text-[#1E293B]")}>
                    {size.name}
                  </h3>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    {size.id === 'custom' ? 'Custom dimensions' : `${size.width} × ${size.height} ${size.unit}`}
                  </p>
               </div>
            </button>
          ))}
        </div>

        {isCustom && (
          <div className="mt-6 p-5 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] space-y-4">
             <h4 className="text-[11px] font-bold text-[#64748B] uppercase tracking-wide">Custom Dimensions</h4>
             <div className="flex flex-wrap items-end gap-3">
                <div className="space-y-1.5 flex-1 min-w-[100px]">
                  <label className="text-xs font-semibold text-[#1E293B]">Width</label>
                  <input 
                    type="number" 
                    value={customWidth}
                    onChange={(e) => setCustomSize(Number(e.target.value), customHeight, customUnit)}
                    className="w-full text-sm border border-[#E2E8F0] p-2 rounded-lg bg-white focus:border-[#2563EB] focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5 flex-1 min-w-[100px]">
                  <label className="text-xs font-semibold text-[#1E293B]">Height</label>
                  <input 
                    type="number" 
                    value={customHeight}
                    onChange={(e) => setCustomSize(customWidth, Number(e.target.value), customUnit)}
                    className="w-full text-sm border border-[#E2E8F0] p-2 rounded-lg bg-white focus:border-[#2563EB] focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5 w-[100px]">
                  <label className="text-xs font-semibold text-[#1E293B]">Unit</label>
                  <select 
                    value={customUnit}
                    onChange={(e) => setCustomSize(customWidth, customHeight, e.target.value as Unit)}
                    className="w-full text-sm border border-[#E2E8F0] p-2 rounded-lg bg-white focus:border-[#2563EB] focus:outline-none"
                  >
                  <option value="mm">mm</option>
                  <option value="cm">cm</option>
                  <option value="inch">inch</option>
                  <option value="px">px</option>
                </select>
              </div>
           </div>
        </div>
      )}
      </div>

      <div className="p-5 border-t border-[#E2E8F0] bg-[#F8FAFC] rounded-b-xl flex justify-between items-center shrink-0">
        <Button variant="outline" onClick={prevStep}><ArrowLeft className="mr-2" size={16}/> Back</Button>
        <Button onClick={nextStep}>Next <ArrowRight className="ml-2" size={16}/></Button>
      </div>
    </div>
  );
}
