import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

interface NeonToastProps {
  message: string | null;
}

export const NeonToast: React.FC<NeonToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300 pointer-events-none">
      <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#0d1b2a]/90 backdrop-blur-md text-white text-xs sm:text-sm font-semibold border border-sky-400/50 shadow-[0_0_18px_rgba(0,210,255,0.45),0_10px_25px_rgba(0,0,0,0.3)]">
        <span className="w-2 h-2 rounded-full bg-[#00d2ff] shadow-[0_0_8px_#00d2ff] animate-ping" />
        <span>{message}</span>
      </div>
    </div>
  );
};
