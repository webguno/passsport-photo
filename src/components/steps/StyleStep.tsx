import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Button } from '../ui/Button';
import { ArrowLeft, ArrowRight, Wand2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { removeBackground } from '../../utils/removeBg';

export function StyleStep() {
  const { 
    croppedImage, setCroppedImage,
    photoSize, customWidth, customHeight, customUnit,
    backgroundColor, setBackgroundColor,
    borderWidth, setBorder, borderColor,
    innerMargin, setInnerMargin, marginColor, setMarginColor,
    nextStep, prevStep
  } = useAppStore();

  const [isRemovingBg, setIsRemovingBg] = useState(false);

  const handleRemoveBg = async () => {
      if (!croppedImage) return;
      setIsRemovingBg(true);
      try {
          const removed = await removeBackground(croppedImage);
          setCroppedImage(removed);
      } catch (err: any) {
          console.error(err);
          alert('Failed to remove background: ' + err.message);
      } finally {
          setIsRemovingBg(false);
      }
  };

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

             {/* Background Removal */}
             <div className="space-y-3 pt-6 border-t border-[#E2E8F0]">
                <div className="flex justify-between items-center bg-[#F8FAFC] p-4 rounded-lg border border-[#E2E8F0]">
                   <div>
                       <h3 className="text-sm font-semibold text-[#1E293B]">AI Background Removal</h3>
                       <p className="text-xs text-[#64748B] mt-1">Automatically remove the background.</p>
                   </div>
                   <Button 
                       variant="secondary" 
                       onClick={handleRemoveBg} 
                       isLoading={isRemovingBg}
                       size="sm"
                   >
                       <Wand2 size={14} className="mr-2" /> Remove Bg
                   </Button>
                </div>
             </div>

             {/* Border */}
             <div className="space-y-3 pt-6 border-t border-[#E2E8F0]">
                 <div className="flex justify-between items-center">
                    <h3 className="text-sm font-semibold text-[#1E293B]">Border Settings</h3>
                    <div className="flex items-center gap-2">
                       <span className="text-xs text-[#64748B]">Color:</span>
                       <input 
                              type="color" 
                              value={borderColor}
                              onChange={(e) => setBorder(borderWidth, e.target.value)}
                              className="w-8 h-8 rounded cursor-pointer border border-[#E2E8F0]"
                              title="Border Color"
                        />
                    </div>
                 </div>
                 
                 <div className="flex items-center gap-4">
                     <input 
                        type="range"
                        value={borderWidth}
                        min={0}
                        max={10}
                        step={0.5}
                        onChange={(e) => setBorder(Number(e.target.value), borderColor)}
                        className="flex-1 h-1 bg-[#E2E8F0] rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
                     />
                     <div className="w-20 relative">
                         <input
                           type="number"
                           value={borderWidth}
                           max={20}
                           min={0}
                           step={0.5}
                           onChange={(e) => setBorder(Number(e.target.value), borderColor)}
                           className="w-full text-sm border border-[#E2E8F0] p-1.5 px-2 rounded-lg bg-white focus:border-[#2563EB] focus:outline-none"
                         />
                         <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-[#64748B] pointer-events-none">mm</span>
                     </div>
                 </div>
             </div>

             {/* Inner Margin */}
             <div className="space-y-3 pt-6 border-t border-[#E2E8F0]">
                 <div className="flex justify-between items-center">
                    <h3 className="text-sm font-semibold text-[#1E293B]">Inner Margin</h3>
                    <div className="flex items-center gap-2">
                       <span className="text-xs text-[#64748B]">Color:</span>
                       <input 
                              type="color" 
                              value={marginColor}
                              onChange={(e) => setMarginColor(e.target.value)}
                              className="w-8 h-8 rounded cursor-pointer border border-[#E2E8F0]"
                              title="Margin Color"
                        />
                    </div>
                 </div>
                 
                 <div className="flex items-center gap-4">
                     <input 
                        type="range"
                        value={innerMargin}
                        min={0}
                        max={10}
                        step={0.5}
                        onChange={(e) => setInnerMargin(Number(e.target.value))}
                        className="flex-1 h-1 bg-[#E2E8F0] rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
                     />
                     <div className="w-20 relative">
                         <input
                           type="number"
                           value={innerMargin}
                           max={20}
                           min={0}
                           step={0.5}
                           onChange={(e) => setInnerMargin(Number(e.target.value))}
                           className="w-full text-sm border border-[#E2E8F0] p-1.5 px-2 rounded-lg bg-white focus:border-[#2563EB] focus:outline-none"
                         />
                         <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-[#64748B] pointer-events-none">mm</span>
                     </div>
                 </div>
             </div>
         </div>

         {/* Preview */}
         <div className="md:w-[280px] flex-shrink-0 bg-[#F8FAFC] border-l border-[#E2E8F0] p-6 flex flex-col items-center justify-center">
             <span className="text-[11px] font-bold uppercase tracking-widest text-[#94A3B8] mb-6">Live Preview</span>
             {croppedImage && (() => {
                 const pWidth = photoSize.id === 'custom' ? customWidth : photoSize.width;
                 const pHeight = photoSize.id === 'custom' ? customHeight : photoSize.height;
                 const pUnit = photoSize.id === 'custom' ? customUnit : photoSize.unit;
                 
                 const toMM = (val: number, unit: string) => {
                   switch(unit) {
                     case 'cm': return val * 10;
                     case 'inch': return val * 25.4;
                     case 'px': return val * 0.264583;
                     default: return val;
                   }
                 };
                 
                 const photoWidthMM = toMM(pWidth, pUnit);
                 const photoHeightMM = toMM(pHeight, pUnit);
                 
                 // Compute a responsive scale so it fits the 200px max preview area
                 const scale = Math.min(200 / photoWidthMM, 200 / photoHeightMM);
                 
                 return (
                   <div 
                     className="shadow-lg transition-all box-border flex items-center justify-center" 
                     style={{ 
                       width: `${photoWidthMM * scale}px`,
                       height: `${photoHeightMM * scale}px`,
                       backgroundColor: marginColor,
                       padding: `${innerMargin * scale}px`
                     }}
                   >
                     <div
                        className="w-full h-full box-border"
                        style={{
                           border: `${borderWidth * scale}px solid ${borderColor}`,
                           backgroundColor: backgroundColor
                        }}
                     >
                         <img 
                           src={croppedImage} 
                           className="w-full h-full object-cover mix-blend-normal block" 
                           alt="Preview"
                         />
                     </div>
                   </div>
                 );
             })()}
         </div>
      </div>

      <div className="p-5 border-t border-[#E2E8F0] bg-[#F8FAFC] rounded-b-xl flex justify-between items-center shrink-0">
        <Button variant="outline" onClick={prevStep}><ArrowLeft className="mr-2" size={16}/> Back</Button>
        <Button onClick={nextStep}>Next <ArrowRight className="ml-2" size={16}/></Button>
      </div>
    </div>
  );
}
