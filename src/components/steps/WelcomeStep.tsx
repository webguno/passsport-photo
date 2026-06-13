import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Button } from '../ui/Button';
import { Camera } from 'lucide-react';

export function WelcomeStep() {
  const nextStep = useAppStore((state) => state.nextStep);

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6 bg-white p-10 rounded-xl border border-[#E2E8F0] shadow-sm m-auto max-w-lg">
      <div className="w-16 h-16 bg-[#2563EB] text-white rounded-xl flex items-center justify-center shadow">
        <Camera size={32} strokeWidth={2} />
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-[#1E293B]">
          Passport Photo Maker
        </h1>
        <p className="text-sm text-[#64748B] leading-relaxed">
          Create professional passport, visa, and ID photos in seconds. Fully responsive, secure, and works entirely in your browser.
        </p>
      </div>
      
      <Button onClick={nextStep} size="lg" className="mt-4 gap-2 w-full">
        Create Passport Photo
      </Button>
    </div>
  );
}
