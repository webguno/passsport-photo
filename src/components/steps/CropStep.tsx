import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { useAppStore } from '../../store/useAppStore';
import { Button } from '../ui/Button';
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import getCroppedImg from '../../utils/cropImage';

export function CropStep() {
  const { originalImage, photoSize, customWidth, customHeight, customUnit, setCroppedImage, nextStep, prevStep } = useAppStore();
  
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculate Aspect Ratio based on size
  const width = photoSize.id === 'custom' ? customWidth : photoSize.width;
  const height = photoSize.id === 'custom' ? customHeight : photoSize.height;
  const aspect = width / height;

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleNext = async () => {
    if (!originalImage || !croppedAreaPixels) return;
    setIsProcessing(true);
    try {
      const croppedImage = await getCroppedImg(originalImage, croppedAreaPixels, rotation);
      setCroppedImage(croppedImage);
      nextStep();
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl border border-[#E2E8F0] shadow-sm">
      <div className="p-5 border-b border-[#E2E8F0]">
        <h2 className="text-lg font-bold text-[#1E293B]">Crop & Adjust</h2>
        <p className="text-xs text-[#64748B] mt-1">Position your face within the frame. Leave space above the head.</p>
      </div>

      <div className="flex-1 flex flex-col p-6 overflow-y-auto">
        <div className="bg-[#E2E8F0] rounded-lg overflow-hidden border border-[#E2E8F0] relative flex-1 min-h-[300px] w-full isolate">
           {originalImage && (
               <Cropper
                image={originalImage}
                crop={crop}
                zoom={zoom}
                rotation={rotation}
                aspect={aspect}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                onRotationChange={setRotation}
             />
         )}
         
         {/* Face guide overlay */}
         <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10 w-full h-full p-4">
             {/* We approximate the guide oval but react-easy-crop naturally limits bounds based on aspect ratio */}
             <div className="border border-white/40 border-dashed w-[20%] h-[30%] rounded-full absolute" style={{ top: '30%' }} />
             <div className="absolute left-4 top-4 bg-black/50 text-white px-3 py-1 text-xs rounded-full backdrop-blur-md">
                 Ratio: {width}:{height}
             </div>
         </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
           <div className="space-y-2 p-4 border border-[#E2E8F0] rounded-lg bg-[#F8FAFC]">
               <div className="flex justify-between text-xs font-bold text-[#64748B] uppercase tracking-wide">
                 <label>Zoom</label>
                 <span className="text-[#1E293B] font-mono bg-white px-1 rounded">{zoom.toFixed(1)}x</span>
               </div>
               <input
                 type="range"
                 value={zoom}
                 min={1}
                 max={3}
                 step={0.1}
                 aria-labelledby="Zoom"
                 onChange={(e) => setZoom(Number(e.target.value))}
                 className="w-full h-1 bg-[#E2E8F0] rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
               />
           </div>
           <div className="space-y-2 p-4 border border-[#E2E8F0] rounded-lg bg-[#F8FAFC]">
               <div className="flex justify-between text-xs font-bold text-[#64748B] uppercase tracking-wide">
                 <label>Rotation</label>
                 <span className="text-[#1E293B] font-mono bg-white px-1 rounded">{rotation}°</span>
               </div>
               <div className="flex items-center gap-3">
                 <input
                   type="range"
                   value={rotation}
                   min={-180}
                   max={180}
                   step={1}
                   aria-labelledby="Rotation"
                   onChange={(e) => setRotation(Number(e.target.value))}
                   className="flex-1 h-1 bg-[#E2E8F0] rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
                 />
                 <button 
                   onClick={() => setRotation(0)} 
                   className="p-1 hover:bg-[#E2E8F0] rounded text-[#64748B] transition-colors"
                   title="Reset Rotation"
                 >
                   <RotateCcw size={16} />
                 </button>
               </div>
           </div>
        </div>
      </div>

      <div className="p-5 border-t border-[#E2E8F0] bg-[#F8FAFC] rounded-b-xl flex justify-between items-center shrink-0">
        <Button variant="outline" onClick={prevStep}><ArrowLeft className="mr-2" size={16}/> Back</Button>
        <Button onClick={handleNext} isLoading={isProcessing}>Next <ArrowRight className="ml-2" size={16}/></Button>
      </div>
    </div>
  );
}
