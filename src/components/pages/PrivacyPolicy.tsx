import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { ArrowLeft } from 'lucide-react';

export function PrivacyPolicy() {
  const setCurrentView = useAppStore((state) => state.setCurrentView);

  return (
    <div className="max-w-3xl mx-auto w-full bg-white p-8 rounded-xl border border-[#E2E8F0] shadow-sm">
      <button 
        onClick={() => setCurrentView('home')}
        className="flex items-center text-sm text-[#64748B] hover:text-[#1E293B] mb-6 transition-colors"
      >
        <ArrowLeft size={16} className="mr-1" /> Back to Home
      </button>
      <h1 className="text-3xl font-bold text-[#1E293B] mb-6">Privacy Policy</h1>
      <div className="space-y-4 text-[#475569] leading-relaxed">
        <p>Your privacy is important to us. This application processes all images locally in your web browser. We do not upload, store, or transmit your photos to any external servers.</p>
        <h2 className="text-xl font-semibold text-[#1E293B] mt-6 mb-3">1. Information We Collect</h2>
        <p>Because the app operates entirely client-side, we do not require you to create an account, nor do we collect personally identifiable information or retain copies of the photos you edit.</p>
        <h2 className="text-xl font-semibold text-[#1E293B] mt-6 mb-3">2. Cookies and Tracking</h2>
        <p>We may use standard analytics tools strictly for monitoring application performance and usage metrics. These tools do not track or associate data with your uploaded photos.</p>
        <h2 className="text-xl font-semibold text-[#1E293B] mt-6 mb-3">3. Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
      </div>
    </div>
  );
}
