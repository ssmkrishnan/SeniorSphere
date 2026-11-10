import React, { useState } from 'react';
import { ArrowLeft, Landmark, Scale, FileText, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';

export const CertificationCounselling: React.FC = () => {
  const { t, setCurrentScreen } = useApp();
  const [selectedItem, setSelectedItem] = useState<string>('pension');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const iconsMap: Record<string, any> = {
    pension: Landmark,
    legal: Scale,
    schemes: HeartHandshake,
    medical: FileText
  };

  const colorsMap: Record<string, { bg: string; text: string }> = {
    pension: { bg: 'bg-rose-50 border-rose-200', text: 'text-rose-600' },
    legal: { bg: 'bg-indigo-50 border-indigo-200', text: 'text-indigo-600' },
    schemes: { bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-600' },
    medical: { bg: 'bg-amber-50 border-amber-200', text: 'text-amber-600' }
  };

  const handleRequest = async () => {
    setSubmitted(true);
    await api.requestCounselling(selectedItem);
    setTimeout(() => {
      setSubmitted(false);
      setCurrentScreen(11); // Navigate to Services
    }, 1200);
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-xs">
        <button
          onClick={() => setCurrentScreen(11)}
          className="p-1 -ml-1 text-slate-700 hover:text-slate-900 rounded-lg"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-base font-bold text-slate-800 tracking-tight">
          {t.counselling.title}
        </h2>
        <div className="w-5" />
      </div>

      <div className="flex-1 p-4 pb-8 space-y-4 overflow-y-auto">
        <p className="text-xs font-semibold text-slate-600 leading-relaxed">
          {t.counselling.subtitle}
        </p>

        {/* Counselling Categories */}
        <div className="space-y-3">
          {t.counselling.items.map(item => {
            const Icon = iconsMap[item.id] || FileText;
            const style = colorsMap[item.id] || colorsMap.pension;
            const isSelected = selectedItem === item.id;

            return (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer shadow-xs ${
                  isSelected
                    ? 'border-teal-700 bg-teal-50/60 ring-2 ring-teal-700/20 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 border ${style.bg} ${style.text}`}>
                    <Icon className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-slate-900">
                        {item.title}
                      </h3>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-teal-700 bg-teal-700' : 'border-slate-300'
                      }`}>
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed mt-1">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleRequest}
            className="w-full py-3.5 px-4 rounded-xl bg-teal-800 hover:bg-teal-900 active:scale-[0.99] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            {submitted ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                <span>Counseling Requested!</span>
              </>
            ) : (
              <span>{t.counselling.requestButton}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
