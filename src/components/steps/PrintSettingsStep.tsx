import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Button } from '../ui/Button';
import { ArrowLeft, ArrowRight, FileCheck2, Grid2x2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { PaperSize, PaperOrientation } from '../../types';

export function PrintSettingsStep() {
  const { 
    paperSize, paperOrientation, setPaperConfig,
    quantity, setQuantity,
    spacing, setSpacing, pageMargin, setPageMargin,
    showCropMarks, setCropMarks,
    nextStep, prevStep
  } = useAppStore();

  const presetSpacings = [0, 2, 5, 10];
  const quantities: (number | 'auto')[] = ['auto', 2, 4, 6, 8, 12, 16];

  return (
    <div className="flex flex-col h-full bg-white rounded-xl border border-[#E2E8F0] shadow-sm">
      <div className="p-5 border-b border-[#E2E8F0]">
        <h2 className="text-lg font-bold text-[#1E293B]">Layout Settings</h2>
        <p className="text-xs text-[#64748B] mt-1">Configure your print paper and photo distribution.</p>
      </div>

      <div className="p-6 flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          
          {/* Paper Settings */}
          <div className="space-y-6">
             <div className="flex items-center gap-2 mb-4 border-b border-[#E2E8F0] pb-2">
                 <FileCheck2 className="text-[#94A3B8]" size={16}/>
                 <h3 className="text-[11px] font-bold text-[#64748B] uppercase tracking-wide">Paper Layout</h3>
             </div>
             
             <div className="space-y-2">
                 <label className="text-xs font-semibold text-[#1E293B]">Format</label>
                 <div className="grid grid-cols-2 gap-2">
                    {['A4', 'Letter'].map((size) => (
                        <button
                          key={size}
                          onClick={() => setPaperConfig(size as PaperSize, paperOrientation)}
                          className={cn(
                             "px-3 py-2 rounded-lg border text-xs font-semibold transition-all text-center",
                             paperSize === size ? "border-[#2563EB] bg-blue-50 text-[#2563EB]" : "border-[#E2E8F0] text-[#64748B] hover:border-[#94A3B8]"
                           )}
                        >
                          {size}
                        </button>
                    ))}
                 </div>
             </div>

             <div className="space-y-2">
                 <label className="text-xs font-semibold text-[#1E293B]">Orientation</label>
                 <div className="grid grid-cols-2 gap-2">
                    {['portrait', 'landscape'].map((ori) => (
                        <button
                          key={ori}
                          onClick={() => setPaperConfig(paperSize, ori as PaperOrientation)}
                          className={cn(
                             "px-3 py-2 rounded-lg border text-xs font-semibold transition-all text-center capitalize",
                             paperOrientation === ori ? "border-[#2563EB] bg-blue-50 text-[#2563EB]" : "border-[#E2E8F0] text-[#64748B] hover:border-[#94A3B8]"
                           )}
                        >
                          {ori}
                        </button>
                    ))}
                 </div>
             </div>
          </div>

          {/* Photo Settings */}
          <div className="space-y-6">
             <div className="flex items-center gap-2 mb-4 border-b border-[#E2E8F0] pb-2">
                 <Grid2x2 className="text-[#94A3B8]" size={16}/>
                 <h3 className="text-[11px] font-bold text-[#64748B] uppercase tracking-wide">Photo Grid</h3>
             </div>

             <div className="space-y-2">
                 <label className="text-xs font-semibold text-[#1E293B]">Quantity</label>
                 <div className="flex flex-wrap gap-2">
                     {quantities.map(q => (
                         <button
                           key={q}
                           onClick={() => setQuantity(q)}
                           className={cn(
                             "w-12 h-10 rounded border text-xs font-semibold transition-all flex items-center justify-center",
                             quantity === q ? "border-[#2563EB] bg-[#2563EB] text-white" : "border-[#E2E8F0] text-[#1E293B] hover:border-[#2563EB] bg-white"
                           )}
                         >
                           {q === 'auto' ? 'Auto' : q}
                         </button>
                     ))}
                     <div className="relative w-24">
                         <input
                           type="number"
                           min={1}
                           value={quantity === 'auto' ? '' : quantity}
                           onChange={(e) => setQuantity(e.target.value ? Number(e.target.value) : 'auto')}
                           placeholder="Custom"
                           className={cn(
                             "w-full h-10 border p-2 text-xs rounded focus:outline-none transition-all",
                             (!quantities.includes(quantity) && quantity !== 'auto') 
                               ? "border-[#2563EB] ring-1 ring-[#2563EB] dark:focus:ring-blue-500 bg-blue-50" 
                               : "border-[#E2E8F0] focus:border-[#2563EB]"
                           )}
                         />
                     </div>
                 </div>
             </div>

             <div className="space-y-2 pt-2">
                 <label className="text-xs font-semibold text-[#1E293B] flex justify-between">
                     <span>Spacing</span>
                     <span className="text-[#2563EB] font-mono bg-[#F1F5F9] px-1 rounded">{spacing}mm</span>
                 </label>
                 <input 
                    type="range"
                    min={0}
                    max={20}
                    step={1}
                    value={spacing}
                    onChange={(e) => setSpacing(Number(e.target.value))}
                    className="w-full h-1 bg-[#E2E8F0] rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
                 />
                 <div className="flex justify-between text-xs text-[#94A3B8] px-1">
                    <span>0</span>
                    <span>10</span>
                    <span>20</span>
                 </div>
             </div>

             <div className="space-y-2 pt-2">
                 <label className="text-xs font-semibold text-[#1E293B] flex justify-between">
                     <span>Page Margin</span>
                     <span className="text-[#2563EB] font-mono bg-[#F1F5F9] px-1 rounded">{pageMargin}mm</span>
                 </label>
                 <input 
                    type="range"
                    min={0}
                    max={50}
                    step={1}
                    value={pageMargin}
                    onChange={(e) => setPageMargin(Number(e.target.value))}
                    className="w-full h-1 bg-[#E2E8F0] rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
                 />
                 <div className="flex justify-between text-xs text-[#94A3B8] px-1">
                    <span>0</span>
                    <span>25</span>
                    <span>50</span>
                 </div>
             </div>

             <div className="pt-2 flex items-center gap-3">
                 <label className="flex items-center gap-3 cursor-pointer">
                    <input 
                       type="checkbox" 
                       checked={showCropMarks}
                       onChange={(e) => setCropMarks(e.target.checked)}
                       className="w-4 h-4 rounded text-[#2563EB] border-[#E2E8F0] accent-[#2563EB]"
                    />
                    <span className="text-sm text-[#1E293B]">Include Cutting Lines (Crop Marks)</span>
                 </label>
             </div>

          </div>

      </div>

      <div className="p-5 border-t border-[#E2E8F0] bg-[#F8FAFC] rounded-b-xl flex justify-between items-center shrink-0">
        <Button variant="outline" onClick={prevStep}><ArrowLeft className="mr-2" size={16}/> Back</Button>
        <Button onClick={nextStep}>Next <ArrowRight className="ml-2" size={16}/></Button>
      </div>
    </div>
  );
}
