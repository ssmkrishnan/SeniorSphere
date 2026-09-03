import React, { useState } from 'react';
import {
  Sparkles,
  Shirt,
  Utensils,
  Car,
  Users,
  Info,
  ChevronRight,
  AlertTriangle,
  FileText,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Services: React.FC = () => {
  const { t, setCurrentScreen } = useApp();
  const [activeRequestToast, setActiveRequestToast] = useState<string | null>(null);

  const iconsMap: Record<string, any> = {
    housekeeping: Sparkles,
    laundry: Shirt,
    meal: Utensils,
    transport: Car,
    visitor: Users,
    general: Info
  };

  const handleServiceClick = (item: { id: string; title: string }) => {
    setActiveRequestToast(item.title);
    setTimeout(() => {
      setActiveRequestToast(null);
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-4 py-3 shadow-xs">
        <h2 className="text-base font-bold text-slate-800 tracking-tight">
          {t.services.title}
        </h2>
      </div>

      <div className="flex-1 p-4 pb-8 space-y-4 overflow-y-auto">
        {/* Toast confirmation */}
        {activeRequestToast && (
          <div className="bg-emerald-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-200 flex-shrink-0" />
            <span>{activeRequestToast} submitted to management desk.</span>
          </div>
        )}

        {/* Quick Link Cards to Complaint & Counselling */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setCurrentScreen(6)}
            className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/80 text-left hover:border-amber-300 transition-all shadow-xs"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center mb-2 shadow-xs">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <p className="text-xs font-bold text-slate-900 leading-tight">
              {t.complaint.title}
            </p>
            <p className="text-[10px] text-slate-500 mt-0.5">
              {t.complaintStatus.title} &rarr;
            </p>
          </button>

          <button
            onClick={() => setCurrentScreen(10)}
            className="p-3.5 rounded-2xl bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-200/80 text-left hover:border-teal-300 transition-all shadow-xs"
          >
            <div className="w-8 h-8 rounded-lg bg-teal-700 text-white flex items-center justify-center mb-2 shadow-xs">
              <FileText className="w-4 h-4" />
            </div>
            <p className="text-xs font-bold text-slate-900 leading-tight">
              {t.counselling.title}
            </p>
            <p className="text-[10px] text-slate-500 mt-0.5">
              Certificates & legal &rarr;
            </p>
          </button>
        </div>

        {/* Services List */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs divide-y divide-slate-100 overflow-hidden">
          {t.services.items.map(item => {
            const Icon = iconsMap[item.id] || Info;

            return (
              <button
                key={item.id}
                onClick={() => handleServiceClick(item)}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50/80 transition-colors group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 border border-teal-100 flex items-center justify-center flex-shrink-0 group-hover:bg-teal-700 group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-slate-800">
                    {item.title}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-teal-700 group-hover:translate-x-0.5 transition-all" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
