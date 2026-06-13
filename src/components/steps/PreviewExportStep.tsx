import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Button } from '../ui/Button';
import { ArrowLeft, Download, FileType2, Image as ImageIcon } from 'lucide-react';
import { generatePDF, generateImage } from '../../utils/printEngine';

export function PreviewExportStep() {
  const { 
    croppedImage, photoSize, customWidth, customHeight, customUnit,
    backgroundColor, borderWidth, borderColor, innerMargin, marginColor,
    paperSize, paperOrientation, quantity, spacing, pageMargin, showCropMarks,
    nextStep, prevStep
  } = useAppStore();

  const [isExporting, setExporting] = useState<string | null>(null);

  // Conversion rates to keep calculations consistent (let's calculate everything in mm for logical grid)
  const toMM = (val: number, unit: string) => {
    switch(unit) {
      case 'cm': return val * 10;
      case 'inch': return val * 25.4;
      case 'px': return val * 0.264583; // Approx 96 DPI
      default: return val;
    }
  };

  const pWidth = photoSize.id === 'custom' ? customWidth : photoSize.width;
  const pHeight = photoSize.id === 'custom' ? customHeight : photoSize.height;
  const pUnit = photoSize.id === 'custom' ? customUnit : photoSize.unit;

  const photoWidthMM = toMM(pWidth, pUnit);
  const photoHeightMM = toMM(pHeight, pUnit);

  // Paper Dimensions in mm
  const isA4 = paperSize === 'A4';
  const rawPaperWidth = isA4 ? 210 : 215.9; // A4 vs Letter
  const rawPaperHeight = isA4 ? 297 : 279.4;

  const paperWidthMM = paperOrientation === 'portrait' ? rawPaperWidth : rawPaperHeight;
  const paperHeightMM = paperOrientation === 'portrait' ? rawPaperHeight : rawPaperWidth;

  const marginMM = pageMargin; // Dynamic page margin

  // Calculate layout
  const gridLayout = useMemo(() => {
    if (!croppedImage) return [];

    const availableWidth = paperWidthMM - (marginMM * 2);
    const availableHeight = paperHeightMM - (marginMM * 2);

    const outerPhotoW = photoWidthMM + spacing;
    const outerPhotoH = photoHeightMM + spacing;

    const cols = Math.floor(availableWidth / outerPhotoW);
    const rows = Math.floor(availableHeight / outerPhotoH);

    const maxCapacity = cols * rows;
    const count = quantity === 'auto' ? maxCapacity : Math.min(Number(quantity), maxCapacity);

    // Calculate actual grid width/height to center it
    const actualCols = Math.min(cols, count);
    const actualRows = Math.ceil(count / actualCols);
    
    // Centers the container block of photos inside the A4 paper
    // A4 container logic handled mostly by flex wrap & CSS

    const items = [];
    for(let i=0; i<count; i++) {
      items.push(i);
    }
    return items;
  }, [paperWidthMM, paperHeightMM, photoWidthMM, photoHeightMM, spacing, quantity, marginMM, croppedImage]);

  const handleExport = async (type: 'pdf' | 'jpg' | 'png') => {
    setExporting(type);
    try {
      if (type === 'pdf') {
        await generatePDF('print-preview', paperSize.toLowerCase() as any, paperOrientation);
      } else {
        await generateImage('print-preview', type === 'jpg' ? 'image/jpeg' : 'image/png');
      }
      // After tiny delay for animation feel, move to success
      setTimeout(() => nextStep(), 600);
    } catch(e) {
      console.error(e);
      alert("Export failed");
    } finally {
      setExporting(null);
    }
  };

  if (!croppedImage) return null;

  // We need to render the document precisely. CSS unit mm is supported in modern browsers for printing/screen.
  // 1mm = ~3.78px on 96dpi. Setting element exact mm size allows precise dimensioning.

  return (
    <div className="flex flex-col h-full bg-white rounded-xl border border-[#E2E8F0] shadow-sm">
      <div className="p-5 border-b border-[#E2E8F0]">
        <h2 className="text-lg font-bold text-[#1E293B]">Preview & Download</h2>
        <p className="text-xs text-[#64748B] mt-1">Your layout is ready. Choose an export format.</p>
      </div>

      <div className="flex flex-col lg:flex-row flex-1 overflow-y-auto">
         
         {/* Export Controls */}
         <div className="lg:w-[280px] flex-shrink-0 space-y-4 bg-[#F8FAFC] border-r border-[#E2E8F0] p-6 lg:order-1 order-2">
            <h3 className="text-[11px] font-bold text-[#64748B] uppercase tracking-wide mb-4">Export Options</h3>
            <Button 
               className="w-full justify-start h-10" 
               onClick={() => handleExport('jpg')} 
               isLoading={isExporting === 'jpg'}
               disabled={!!isExporting}
            >
               <ImageIcon className="mr-2" size={16}/> Download JPG (HQ)
            </Button>
            <Button 
               className="w-full justify-start h-10" 
               variant="secondary"
               onClick={() => handleExport('png')}
               isLoading={isExporting === 'png'}
               disabled={!!isExporting}
            >
               <ImageIcon className="mr-2" size={16}/> Download PNG
            </Button>
            <Button 
               className="w-full justify-start h-10" 
               variant="outline"
               onClick={() => handleExport('pdf')}
               isLoading={isExporting === 'pdf'}
               disabled={!!isExporting}
            >
               <FileType2 className="mr-2" size={16}/> Download Print PDF
            </Button>

            <div className="pt-6 mt-6 border-t border-[#E2E8F0] space-y-2">
                 <p className="text-[11px] font-bold text-[#64748B] uppercase tracking-wide">Output Info</p>
                 <ul className="text-xs text-[#64748B] space-y-1 mt-2">
                    <li className="flex justify-between"><span>Paper</span> <span className="font-semibold text-[#1E293B]">{paperSize} ({paperOrientation})</span></li>
                    <li className="flex justify-between"><span>Photos</span> <span className="font-semibold text-[#1E293B]">{gridLayout.length}</span></li>
                    <li className="flex justify-between"><span>Size</span> <span className="font-semibold text-[#1E293B]">{pWidth}x{pHeight} {pUnit}</span></li>
                 </ul>
            </div>
         </div>

         {/* Preview Area */}
         <div className="flex-1 bg-[#E2E8F0] p-4 lg:p-8 lg:order-2 order-1 min-h-[400px] overflow-auto">
             
             {/* The exact DOM element for capture */}
             <div className="shadow-2xl bg-white mx-auto origin-top" 
                  style={{
                    width: `${paperWidthMM}mm`,
                    height: `${paperHeightMM}mm`,
                    minWidth: `${paperWidthMM}mm`,
                    minHeight: `${paperHeightMM}mm`,
                  }}
             >
                 <div 
                   id="print-preview" 
                   className="w-full h-full bg-white"
                   style={{
                      padding: `${marginMM}mm`,
                      boxSizing: 'border-box'
                   }}
                 >
                     <div className="flex flex-wrap content-start justify-start w-full h-full" style={{ gap: `${spacing}mm` }}>
                       {gridLayout.map((_, idx) => (
                           <div 
                             key={idx} 
                             className="relative box-border flex items-center justify-center p-0 m-0"
                             style={{
                               width: `${photoWidthMM}mm`,
                               height: `${photoHeightMM}mm`,
                               backgroundColor: marginColor,
                               padding: `${innerMargin}mm`,
                               boxSizing: 'border-box'
                             }}
                           >
                              <div
                                className="w-full h-full box-border"
                                style={{
                                   border: `${borderWidth}mm solid ${borderColor}`,
                                   backgroundColor: backgroundColor,
                                   boxSizing: 'border-box'
                                }}
                              >
                                  <img 
                                    src={croppedImage} 
                                    className="w-full h-full object-cover pointer-events-none mix-blend-normal block m-0 p-0" 
                                  />
                              </div>
                              
                              {/* Crop marks logic */}
                              {showCropMarks && (
                                <div 
                                    className="absolute inset-0 pointer-events-none box-border" 
                                    style={{ 
                                      border: '0.15mm solid rgba(0,0,0,0.8)' 
                                    }} 
                                />
                              )}
                           </div>
                       ))}
                     </div>
                 </div>
             </div>

         </div>
      </div>

      <div className="p-5 border-t border-[#E2E8F0] bg-white rounded-b-xl flex justify-between items-center shrink-0">
        <Button variant="outline" onClick={prevStep}><ArrowLeft className="mr-2" size={16}/> Back to adjusting</Button>
      </div>
    </div>
  );
}
