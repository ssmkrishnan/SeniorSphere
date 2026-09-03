import React from 'react';
import { BrandLogo } from '../common/BrandLogo';
import { useApp } from '../../context/AppContext';
import { Globe, ArrowRight } from 'lucide-react';

export const Onboarding: React.FC = () => {
  const { t, language, toggleLanguage, setCurrentScreen } = useApp();

  return (
    <div className="flex flex-col min-h-full bg-gradient-to-b from-white via-teal-50/30 to-emerald-50/50 justify-between p-6 pb-8">
      {/* Top bar with quick language pill */}
      <div className="flex justify-end pt-2">
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold shadow-xs hover:bg-teal-100 transition-colors"
        >
          <Globe className="w-3.5 h-3.5 text-teal-600" />
          <span>{language === 'en' ? 'தமிழ்' : 'English'}</span>
        </button>
      </div>

      {/* Hero Branding Section */}
      <div className="flex flex-col items-center justify-center my-auto text-center pt-2">
        <BrandLogo
          size="lg"
          variant="vertical"
          taglineText={t.onboarding.subtitle}
        />

        {/* Scenic Senior Living Community Home Illustration */}
        <div className="mt-6 w-full max-w-[300px] aspect-4/3 rounded-2xl overflow-hidden shadow-md border border-teal-100/80 relative group">
          <img
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&auto=format&fit=crop&q=80"
            alt="SeniorSphere Peaceful Living Community"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-teal-950/40 via-transparent to-transparent" />
          <div className="absolute bottom-2.5 left-3 right-3 text-white text-[11px] font-medium text-left bg-black/30 backdrop-blur-xs px-2.5 py-1 rounded-lg">
            {language === 'en' ? 'Safe, Serene & Caring Community' : 'பாதுகாப்பான, அமைதியான அன்பு இல்லம்'}
          </div>
        </div>
      </div>

      {/* Action Buttons Section */}
      <div className="w-full flex flex-col items-center gap-4 mt-8">
        <button
          onClick={() => setCurrentScreen(2)}
          className="w-full py-4 px-6 rounded-xl bg-teal-700 hover:bg-teal-800 active:scale-[0.99] text-white font-bold text-base shadow-lg shadow-teal-700/25 transition-all flex items-center justify-center gap-2"
        >
          <span>{t.onboarding.getStarted}</span>
          <ArrowRight className="w-5 h-5 stroke-[2.5]" />
        </button>

        <p className="text-xs text-slate-600 font-medium text-center">
          {t.onboarding.alreadyAccount}{' '}
          <button
            onClick={() => setCurrentScreen(9)}
            className="text-teal-700 hover:text-teal-900 font-bold underline underline-offset-2 ml-1"
          >
            {t.onboarding.login}
          </button>
        </p>
      </div>
    </div>
  );
};
