import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Button } from '../ui/Button';
import { ChevronDown, ChevronUp } from 'lucide-react';

function FaqItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden transition-all duration-200 shadow-sm">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex items-center justify-between w-full p-5 text-left hover:bg-gray-50 transition-colors"
      >
        <h3 className="font-semibold text-[#1E293B]">{question}</h3>
        <div className={`p-1 rounded-full transition-colors ${isOpen ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>
      {isOpen && (
        <div className="px-5 pb-5">
          <p className="text-sm text-[#64748B] leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export function WelcomeStep() {
  const nextStep = useAppStore((state) => state.nextStep);

  return (
    <div className="flex flex-col space-y-8 pb-12 w-full max-w-4xl mx-auto">
      {/* Hero section */}
      <div className="flex flex-col items-center justify-center text-center space-y-6 bg-white p-10 rounded-xl border border-[#E2E8F0] shadow-sm w-full mt-4">
        <div className="w-16 h-16 rounded-xl flex items-center justify-center shadow overflow-hidden bg-white">
          <img src="/app-icon.png" alt="App Icon" className="w-[51px] h-[51px]" />
        </div>
        <div className="space-y-2 max-w-lg">
          <h1 className="text-3xl font-bold tracking-tight text-[#1E293B]">
            Passport Photo Maker
          </h1>
          <p className="text-sm text-[#64748B] leading-relaxed">
            Create professional passport, visa, and ID photos in seconds. Fully responsive, secure, and works entirely in your browser.
          </p>
        </div>
        
        <div className="max-w-xs w-full">
          <Button onClick={nextStep} size="lg" className="mt-4 gap-2 w-full">
            Create Passport Photo
          </Button>
        </div>
      </div>

      {/* How to Make a Passport Photo Section */}
      <div className="bg-white p-8 rounded-xl border border-[#E2E8F0] shadow-sm w-full">
        <h2 className="text-2xl font-bold text-[#1E293B] mb-6">How to Make a Passport Photo</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-[#F8FAFC] p-5 rounded-xl border border-[#E2E8F0] space-y-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-[#2563EB] flex items-center justify-center font-bold text-lg">1</div>
            <h3 className="font-semibold text-gray-900">Upload Image</h3>
            <p className="text-sm text-gray-600 leading-relaxed">Select a clear, front-facing photo from your device. Ensure good lighting.</p>
          </div>
          <div className="bg-[#F8FAFC] p-5 rounded-xl border border-[#E2E8F0] space-y-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-[#2563EB] flex items-center justify-center font-bold text-lg">2</div>
            <h3 className="font-semibold text-gray-900">Select Size</h3>
            <p className="text-sm text-gray-600 leading-relaxed">Choose your country or ID type to automatically set the exact dimensions needed.</p>
          </div>
          <div className="bg-[#F8FAFC] p-5 rounded-xl border border-[#E2E8F0] space-y-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-[#2563EB] flex items-center justify-center font-bold text-lg">3</div>
            <h3 className="font-semibold text-gray-900">Crop & Align</h3>
            <p className="text-sm text-gray-600 leading-relaxed">Adjust your photo using the smart visual guides to ensure proper head size and placement.</p>
          </div>
          <div className="bg-[#F8FAFC] p-5 rounded-xl border border-[#E2E8F0] space-y-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-[#2563EB] flex items-center justify-center font-bold text-lg">4</div>
            <h3 className="font-semibold text-gray-900">Background & Borders</h3>
            <p className="text-sm text-gray-600 leading-relaxed">Remove the background or change its color, and apply custom borders or margins to your photo.</p>
          </div>
          <div className="bg-[#F8FAFC] p-5 rounded-xl border border-[#E2E8F0] space-y-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-[#2563EB] flex items-center justify-center font-bold text-lg">5</div>
            <h3 className="font-semibold text-gray-900">Print Settings</h3>
            <p className="text-sm text-gray-600 leading-relaxed">Select the paper size (like A4 or 4x6) and setup a grid layout if you need multiple copies.</p>
          </div>
          <div className="bg-[#F8FAFC] p-5 rounded-xl border border-[#E2E8F0] space-y-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-[#2563EB] flex items-center justify-center font-bold text-lg">6</div>
            <h3 className="font-semibold text-gray-900">Export & Download</h3>
            <p className="text-sm text-gray-600 leading-relaxed">Preview your finalized photo and save it as a high-quality ready-to-print image.</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-[#F8FAFC] p-8 rounded-xl border border-[#E2E8F0] shadow-sm w-full">
        <h2 className="text-2xl font-bold text-[#1E293B] mb-6">Frequently Asked Questions</h2>
        <div className="space-y-3">
          <FaqItem question="Is this tool free to use?" answer="Yes, our passport photo maker is completely free and works directly in your web browser without storing your photos." />
          <FaqItem question="What sizes are supported?" answer="We support standard US (2x2 inches), UK, Schengen visa, and many custom dimensions depending on your requirement." />
          <FaqItem question="Can I trust this with my data?" answer="Absolutely. All image processing happens locally within your device's browser. We don't upload or store your personal photos on our servers." />
          <FaqItem question="What photo formats do you accept?" answer="We support standard image formats such as JPG, PNG, and WebP." />
        </div>
      </div>

      {/* Important Details for Google Ads / Footer info */}
      <div className="bg-[#EFF6FF] p-8 rounded-xl border border-[#DBEAFE] shadow-sm w-full text-sm flex flex-col space-y-6">
        <div>
           <h2 className="text-xl font-bold text-[#1E3A8A] mb-3">Important Information</h2>
           <p className="leading-relaxed text-[#1E40AF]">This tool is provided as-is to help individuals crop and format their passport and ID photos according to common dimension guidelines. Please always double check with your local government or ID issuing authority for the latest requirements. All photos are generated purely locally on your client machine for maximum privacy.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-[#BFDBFE] font-medium text-[#1D4ED8]">
          <button onClick={() => useAppStore.getState().setCurrentView('privacy')} className="text-left hover:text-[#1E3A8A] transition-colors">Privacy Policy</button>
          <button onClick={() => useAppStore.getState().setCurrentView('terms')} className="text-left hover:text-[#1E3A8A] transition-colors">Terms of Service</button>
          <button onClick={() => useAppStore.getState().setCurrentView('contact')} className="text-left hover:text-[#1E3A8A] transition-colors">Contact Us</button>
          <button onClick={() => useAppStore.getState().setCurrentView('about')} className="text-left hover:text-[#1E3A8A] transition-colors">About Us</button>
        </div>
      </div>

    </div>
  );
}
