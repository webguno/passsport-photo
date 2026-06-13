import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { WelcomeStep } from './steps/WelcomeStep';
import { UploadStep } from './steps/UploadStep';
import { SizeStep } from './steps/SizeStep';
import { CropStep } from './steps/CropStep';
import { StyleStep } from './steps/StyleStep';
import { PrintSettingsStep } from './steps/PrintSettingsStep';
import { PreviewExportStep } from './steps/PreviewExportStep';
import { SuccessStep } from './steps/SuccessStep';
import { motion, AnimatePresence } from 'motion/react';

export function WizardContainer() {
  const step = useAppStore((state) => state.step);

  const renderStep = () => {
    switch (step) {
      case 1: return <WelcomeStep />;
      case 2: return <UploadStep />;
      case 3: return <SizeStep />;
      case 4: return <CropStep />;
      case 5: return <StyleStep />;
      case 6: return <PrintSettingsStep />;
      case 7: return <PreviewExportStep />;
      case 8: return <SuccessStep />;
      default: return <WelcomeStep />;
    }
  };

  return (
    <div className="w-full max-w-4xl flex flex-col flex-1 h-full mx-auto">
        <AnimatePresence mode="wait">
            <motion.div
                key={step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="w-full flex-1 flex flex-col"
            >
                {renderStep()}
            </motion.div>
        </AnimatePresence>
    </div>
  );
}
