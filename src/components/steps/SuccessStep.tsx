import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Button } from '../ui/Button';
import { CheckCircle2, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';

export function SuccessStep() {
  const resetDoc = useAppStore((state) => state.resetDoc);
  const prevStep = useAppStore((state) => state.prevStep);

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6 bg-white p-10 rounded-xl border border-[#E2E8F0] shadow-sm m-auto max-w-lg min-h-[400px]">
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.5, duration: 0.6 }}
        className="w-20 h-20 bg-green-50 text-[#22C55E] rounded-full flex items-center justify-center shadow-inner"
      >
        <CheckCircle2 size={40} strokeWidth={2.5} />
      </motion.div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-[#1E293B]">
          Job Complete!
        </h2>
        <p className="text-sm text-[#64748B]">
          Your professional passport photos have been exported successfully. They are ready to print.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 mt-6 w-full max-w-xs justify-center">
         <Button onClick={prevStep} variant="secondary" className="flex-1">
            Back to Export
         </Button>
         <Button onClick={resetDoc} variant="primary" className="flex-1">
            <RotateCcw className="mr-2" size={18}/> Create New
         </Button>
      </div>
    </div>
  );
}
