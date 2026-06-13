/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { WizardContainer } from './components/WizardContainer';
import { Header } from './components/Header';
import { WorkflowSidebar } from './components/WorkflowSidebar';

export default function App() {
  return (
    <div className="h-screen bg-[#F8FAFC] text-[#1E293B] font-sans flex flex-col overflow-hidden selection:bg-blue-100 selection:text-blue-900">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <WorkflowSidebar />
        <main className="flex-1 relative flex flex-col p-4 sm:p-6 lg:p-8 bg-[#E2E8F0] overflow-y-auto w-full">
          <WizardContainer />
        </main>
      </div>
    </div>
  );
}
