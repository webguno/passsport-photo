import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { ArrowLeft, Instagram } from 'lucide-react';

export function ContactUs() {
  const setCurrentView = useAppStore((state) => state.setCurrentView);

  return (
    <div className="max-w-3xl mx-auto w-full bg-white p-8 rounded-xl border border-[#E2E8F0] shadow-sm">
      <button 
        onClick={() => setCurrentView('home')}
        className="flex items-center text-sm text-[#64748B] hover:text-[#1E293B] mb-6 transition-colors"
      >
        <ArrowLeft size={16} className="mr-1" /> Back to Home
      </button>
      <h1 className="text-3xl font-bold text-[#1E293B] mb-6">Contact Us</h1>
      <p className="text-[#475569] mb-8 leading-relaxed">
        Have questions, feedback, or need support? Reach out to me directly on Instagram.
      </p>

      <div className="flex flex-col items-center justify-center p-12 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
        <a 
          href="https://instagram.com/web.guno" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex flex-col items-center group transition-transform hover:scale-105"
        >
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-md border border-gray-100 group-hover:shadow-lg transition-all">
            <Instagram size={32} className="text-[#E1306C]" strokeWidth={2} />
          </div>
          <span className="text-lg font-medium text-[#1E293B] group-hover:text-[#E1306C] transition-colors">@web.guno</span>
        </a>
      </div>
    </div>
  );
}
