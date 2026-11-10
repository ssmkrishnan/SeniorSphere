import React from 'react';
import { ArrowLeft, Bell, Plus, PhoneCall, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const EmergencyAlert: React.FC = () => {
  const { t, setCurrentScreen, triggerEmergencyAlert } = useApp();

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      {/* Top Red Header Card */}
      <div className="bg-gradient-to-b from-red-600 to-red-700 text-white pt-3 pb-8 px-5 rounded-b-[2.5rem] shadow-xl relative overflow-hidden flex flex-col items-center text-center">
        {/* Subtle Background Rings */}
        <div className="absolute inset-0 flex items-center justify-center opacity-15 pointer-events-none">
          <div className="w-72 h-72 rounded-full border-2 border-white animate-ping" style={{ animationDuration: '3s' }} />
          <div className="w-56 h-56 rounded-full border-2 border-white" />
        </div>

        {/* Back and Title Header */}
        <div className="w-full flex items-center justify-between mb-4 z-10">
          <button
            onClick={() => setCurrentScreen(9)}
            className="p-1 -ml-1 text-white/90 hover:text-white rounded-lg"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-base font-bold text-white tracking-tight">
            {t.sos.title}
          </h2>
          <div className="w-5" />
        </div>

        {/* Main Pulsing SOS Trigger */}
        <div className="my-3 z-10">
          <button
            onClick={() => triggerEmergencyAlert('sos')}
            className="relative group focus:outline-none"
            aria-label="Trigger Emergency Alert"
          >
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white flex items-center justify-center shadow-2xl sos-pulse text-red-600 active:scale-95 transition-transform cursor-pointer">
              <Bell className="w-14 h-14 sm:w-16 sm:h-16 stroke-[2.5] fill-red-600 text-white animate-pulse" />
            </div>
          </button>
        </div>

        {/* Title and Instruction */}
        <div className="z-10 mt-3 max-w-xs">
          <h3 className="text-xl font-extrabold tracking-tight">
            {t.sos.needHelp}
          </h3>
          <p className="text-xs sm:text-sm text-red-100 font-medium mt-1 leading-snug">
            {t.sos.instruction}
          </p>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div className="space-y-3.5 mt-2">
          {/* Medical Emergency Button */}
          <button
            onClick={() => triggerEmergencyAlert('medical')}
            className="w-full py-3.5 px-4 rounded-xl bg-white border border-red-200 text-red-700 font-bold text-sm shadow-xs hover:bg-red-50/50 active:scale-[0.99] transition-all flex items-center justify-center gap-2.5"
          >
            <div className="w-6 h-6 rounded-md bg-red-100 flex items-center justify-center text-red-600">
              <Plus className="w-4 h-4 stroke-[3]" />
            </div>
            <span>{t.sos.medicalEmergency}</span>
          </button>

          {/* Call Staff Button */}
          <button
            onClick={() => triggerEmergencyAlert('staff')}
            className="w-full py-3.5 px-4 rounded-xl bg-white border border-amber-200 text-amber-900 font-bold text-sm shadow-xs hover:bg-amber-50/50 active:scale-[0.99] transition-all flex items-center justify-center gap-2.5"
          >
            <div className="w-6 h-6 rounded-md bg-amber-100 flex items-center justify-center text-amber-700">
              <PhoneCall className="w-4 h-4 stroke-[2.5]" />
            </div>
            <span>{t.sos.callStaff}</span>
          </button>
        </div>

        {/* Cancel Button */}
        <div className="pt-4 pb-2 text-center">
          <button
            onClick={() => setCurrentScreen(9)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 px-4 py-2 rounded-lg"
          >
            <X className="w-4 h-4" />
            <span>{t.sos.cancelAlert}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
