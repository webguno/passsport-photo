import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { ArrowLeft, Mail, MessageSquare } from 'lucide-react';
import { Button } from '../ui/Button';

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
        Have questions, feedback, or need support? We're here to help. Reach out to us using the form below or via email.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#1E293B] mb-1">Name</label>
            <input type="text" className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1E293B] mb-1">Email</label>
            <input type="email" className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1E293B] mb-1">Message</label>
            <textarea rows={4} className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="How can we help you?"></textarea>
          </div>
          <Button className="w-full">Send Message</Button>
        </div>

        <div className="bg-[#F8FAFC] p-6 rounded-lg border border-[#E2E8F0] h-fit">
          <h3 className="font-semibold text-[#1E293B] mb-4">Other ways to reach us</h3>
          <div className="space-y-4">
            <div className="flex items-center text-[#475569]">
              <Mail className="w-5 h-5 mr-3 text-[#2563EB]" />
              <span>support@passportphoto.webguno.example</span>
            </div>
            <div className="flex items-center text-[#475569]">
              <MessageSquare className="w-5 h-5 mr-3 text-[#2563EB]" />
              <span>@webguno on Twitter</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
