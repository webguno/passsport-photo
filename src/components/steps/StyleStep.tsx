import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Button } from '../ui/Button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export function StyleStep() {
  const { 
    croppedImage,
    backgroundColor, setBackgroundColor,
    borderWidth, setBorder, borderColor,
    nextStep, prevStep
  } = useAppStore();

  const presetColors = [
    { name: 'White', value: '#ffffff' },
    { name: 'Light Blue', value: '#e0f2fe' },
    { name: 'Grey', value: '#f1f5f9' },
    { name: 'Red', value: '#fee2e2' },
  ];

  const presetBorders = [
    { label: 'None', value: 0 },
    { label: 'Thin (1mm)', value: 1 },
    { label: 'Medium (3mm)', value: 3 },
    { label: 'Thick (5mm)', value: 5 },
  ];

  return (
    <div className="flex flex-col h-full bg-white rounded-xl border border-[#E2E8F0] shadow-sm">
      <div className="p-5 border-b border-[#E2E8F0]">
        <h2 className="text-lg font-bold text-[#1E293B]">Background & Border</h2>
        <p className="text-xs text-[#64748B] mt-1">Style your photo. (Background color applies behind transparent images).</p>
      </div>

      <div className="flex flex-col md:flex-row flex-1 overflow-y-auto">
         <div className="flex-1 space-y-6 p-6">
             {/* Background */}
             <div className="space-y-3">
                 <h3 className="text-sm font-semibold text-[#1E293B]">Background Color</h3>
                 <div className="flex flex-wrap gap-3">
                     {presetColors.map(color => (
                         <button
                           key={color.value}
                           onClick={() => setBackgroundColor(color.value)}
                           className={cn(
                             "w-10 h-10 rounded-full border transition-all",
                             backgroundColor === color.value ? "border-[#2563EB] scale-110 shadow-md ring-2 ring-blue-100" : "border-[#E2E8F0] hover:scale-105"
                           )}
                           style={{ backgroundColor: color.value }}
                           title={color.name}
                         />
                     ))}
                     <div className="flex items-center space-x-2 border border-[#E2E8F0] rounded-full h-10 px-1 overflow-hidden focus-within:border-[#2563EB]">
                        <input 
                          type="color" 
                          value={backgroundColor}
                          onChange={(e) => setBackgroundColor(e.target.value)}
                          className="w-8 h-8 rounded-full cursor-pointer border-0 p-0 bg-transparent"
                        />
                        <span className="text-xs font-medium text-[#64748B] pr-2">Custom</span>
                     </div>
                 </div>
             </div>

             {/* Border */}
             <div className="space-y-3 pt-6 border-t border-[#E2E8F0]">
                 <div className="flex justify-between items-center">
                    <h3 className="text-sm font-semibold text-[#1E293B]">Border Settings</h3>
                    <input 
                          type="color" 
                          value={borderColor}
                          onChange={(e) => setBorder(borderWidth, e.target.value)}
                          className="w-8 h-8 rounded cursor-pointer border border-[#E2E8F0]"
                          title="Border Color"
                    />
                 </div>
                 
                 <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                     {presetBorders.map(border => (
                         <button
                           key={border.value}
                           onClick={() => setBorder(border.value, borderColor)}
                           className={cn(
                             "px-3 py-2 rounded-lg border text-xs font-semibold transition-all",
                             borderWidth === border.value 
                              ? "border-[#2563EB] bg-blue-50 text-[#2563EB]" 
                              : "border-[#E2E8F0] text-[#64748B] hover:border-[#94A3B8]"
                           )}
                         >
                           {border.label}
                         </button>
                     ))}
                 </div>
             </div>
         </div>

         {/* Preview */}
         <div className="md:w-[280px] flex-shrink-0 bg-[#F8FAFC] border-l border-[#E2E8F0] p-6 flex flex-col items-center justify-center">
             <span className="text-[11px] font-bold uppercase tracking-widest text-[#94A3B8] mb-6">Live Preview</span>
             {croppedImage && (
                 <div className="shadow-lg transition-all" style={{ backgroundColor }}>
                     <img 
                       src={croppedImage} 
                       className="w-48 object-contain mix-blend-normal" 
                       style={{ 
                         border: `${borderWidth}px solid ${borderColor}`,
                         padding:0,
                         display: 'block'
                       }} 
                       alt="Preview"
                     />
                 </div>
             )}
         </div>
      </div>

      <div className="p-5 border-t border-[#E2E8F0] bg-[#F8FAFC] rounded-b-xl flex justify-between items-center shrink-0">
        <Button variant="outline" onClick={prevStep}><ArrowLeft className="mr-2" size={16}/> Back</Button>
        <Button onClick={nextStep}>Next <ArrowRight className="ml-2" size={16}/></Button>
      </div>
    </div>
  );
}
