import React, { useCallback, useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Button } from '../ui/Button';
import { UploadCloud, Image as ImageIcon, ArrowLeft, ArrowRight } from 'lucide-react';

export function UploadStep() {
  const { setOriginalImage, nextStep, prevStep } = useAppStore();
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState('');

  const handleFile = (file: File) => {
    setError('');
    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file (JPG, PNG, WEBP).');
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      setError('Image size should be less than 20MB.');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginalImage(e.target?.result as string);
      nextStep();
    };
    reader.readAsDataURL(file);
  };

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  return (
    <div className="flex flex-col h-full bg-white rounded-xl border border-[#E2E8F0] shadow-sm">
      <div className="p-5 border-b border-[#E2E8F0]">
        <h2 className="text-lg font-bold text-[#1E293B]">Upload Photo</h2>
        <p className="text-xs text-[#64748B] mt-1">Select a clear, well-lit photo of your face.</p>
      </div>
      
      <div className="flex-1 p-6 flex flex-col justify-center max-w-2xl mx-auto w-full">
        <div 
          className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-200 flex flex-col items-center justify-center text-center cursor-pointer min-h-[300px]
            ${dragOver ? 'border-[#2563EB] bg-blue-50' : 'border-[#E2E8F0] bg-[#F8FAFC] hover:border-[#94A3B8]'}`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          onClick={() => document.getElementById('file-upload')?.click()}
        >
          <div className="w-16 h-16 bg-blue-50 text-[#2563EB] rounded-full flex items-center justify-center mb-4">
            <UploadCloud size={32} />
          </div>
          <h3 className="text-base font-semibold text-[#1E293B] mb-1">Drag & Drop your image</h3>
          <p className="text-xs text-[#64748B] mb-6">or click to browse from your device</p>
        
        <input 
          id="file-upload" 
          type="file" 
          accept="image/jpeg, image/png, image/webp" 
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              handleFile(e.target.files[0]);
            }
          }}
        />
        
        <div className="flex gap-4 text-[11px] font-bold text-[#64748B] uppercase tracking-wide">
          <span className="flex items-center gap-1"><ImageIcon size={14}/> JPG, PNG, WEBP</span>
          <span>•</span>
          <span>Max 20MB</span>
        </div>

        {error && <p className="text-red-500 mt-4 text-sm font-medium">{error}</p>}
      </div>
      </div>

      <div className="p-5 border-t border-[#E2E8F0] bg-[#F8FAFC] rounded-b-xl flex justify-between">
        <Button variant="outline" onClick={prevStep}><ArrowLeft className="mr-2" size={16}/> Back</Button>
      </div>
    </div>
  );
}
