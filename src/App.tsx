/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { WizardContainer } from './components/WizardContainer';
import { Header } from './components/Header';
import { WorkflowSidebar } from './components/WorkflowSidebar';
import { useAppStore } from './store/useAppStore';
import { PrivacyPolicy } from './components/pages/PrivacyPolicy';
import { TermsOfService } from './components/pages/TermsOfService';
import { ContactUs } from './components/pages/ContactUs';
import { AboutUs } from './components/pages/AboutUs';

export default function App() {
  const currentView = useAppStore((state) => state.currentView);

  return (
    <div className="h-screen bg-[#F8FAFC] text-[#1E293B] font-sans flex flex-col overflow-hidden selection:bg-blue-100 selection:text-blue-900">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {currentView === 'home' && <WorkflowSidebar />}
        <main className="flex-1 relative flex flex-col p-4 sm:p-6 lg:p-8 bg-[#E2E8F0] overflow-y-auto w-full">
          {currentView === 'home' && <WizardContainer />}
          {currentView === 'privacy' && <PrivacyPolicy />}
          {currentView === 'terms' && <TermsOfService />}
          {currentView === 'contact' && <ContactUs />}
          {currentView === 'about' && <AboutUs />}
        </main>
      </div>
    </div>
  );
}
