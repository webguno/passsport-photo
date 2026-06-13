import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { ArrowLeft } from 'lucide-react';

export function TermsOfService() {
  const setCurrentView = useAppStore((state) => state.setCurrentView);

  return (
    <div className="max-w-3xl mx-auto w-full bg-white p-8 rounded-xl border border-[#E2E8F0] shadow-sm">
      <button 
        onClick={() => setCurrentView('home')}
        className="flex items-center text-sm text-[#64748B] hover:text-[#1E293B] mb-6 transition-colors"
      >
        <ArrowLeft size={16} className="mr-1" /> Back to Home
      </button>
      <h1 className="text-3xl font-bold text-[#1E293B] mb-6">Terms of Service</h1>
      <div className="space-y-4 text-[#475569] leading-relaxed">
        <p>By using Passport Photo Maker, you agree to the following terms and conditions.</p>
        <h2 className="text-xl font-semibold text-[#1E293B] mt-6 mb-3">1. Use of the Application</h2>
        <p>This tool is provided "as is" and is intended to help you format photos to common dimensions. We do not guarantee that the generated photos will be unconditionally accepted by any specific government or issuing authority.</p>
        <h2 className="text-xl font-semibold text-[#1E293B] mt-6 mb-3">2. User Responsibility</h2>
        <p>It is your sole responsibility to ensure that the photos you generate meet the latest requirements of the relevant authority. We recommend checking official guidelines before submitting your final prints.</p>
        <h2 className="text-xl font-semibold text-[#1E293B] mt-6 mb-3">3. Intellectual Property</h2>
        <p>The code, design, and logic of this application are owned by the creator. You may use this tool for personal and commercial purposes, but you may not duplicate, copy, or reuse any portion of the underlying code or visual design elements without express written permission.</p>
      </div>
    </div>
  );
}
