import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { ArrowLeft } from 'lucide-react';

export function AboutUs() {
  const setCurrentView = useAppStore((state) => state.setCurrentView);

  return (
    <div className="max-w-3xl mx-auto w-full bg-white p-8 rounded-xl border border-[#E2E8F0] shadow-sm">
      <button 
        onClick={() => setCurrentView('home')}
        className="flex items-center text-sm text-[#64748B] hover:text-[#1E293B] mb-6 transition-colors"
      >
        <ArrowLeft size={16} className="mr-1" /> Back to Home
      </button>
      <h1 className="text-3xl font-bold text-[#1E293B] mb-6">About Us</h1>
      <div className="space-y-4 text-[#475569] leading-relaxed">
        <p>
          Passport Photo Maker was built with a simple mission: to make creating professional, compliant ID and passport photos incredibly easy and accessible to everyone. 
        </p>
        <p>
          We know that going to a physical photo studio or a pharmacy simply for a basic 2x2 inch print can be inconvenient and expensive. By utilizing modern web technologies, we have brought those robust tools directly into your browser.
        </p>
        <p>
          Our application operates 100% locally on your device. This means your personal photos are never uploaded to any remote server—guaranteeing your data stays completely private and secure.
        </p>
        <p>
          Whether you need a visa photo, a new passport, or a customized ID card, we provide the straightforward functionality required to get it done correctly.
        </p>
        <p className="font-medium text-[#1E293B] mt-6">
          Passport Photo App By WEBGUNO
        </p>
      </div>
    </div>
  );
}
