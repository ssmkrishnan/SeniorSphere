import React, { useState } from 'react';
import { BrandLogo } from '../common/BrandLogo';
import { useApp } from '../../context/AppContext';
import { Globe, ArrowRight, X, LogIn, KeyRound, Building, Phone } from 'lucide-react';

export const Onboarding: React.FC = () => {
  const { t, language, toggleLanguage, setCurrentScreen, profile, updateProfile } = useApp();
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [roomInput, setRoomInput] = useState<string>('');
  const [phoneInput, setPhoneInput] = useState<string>('');
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomInput.trim()) {
      setLoginError(language === 'ta' ? 'அறை எண்ணை உள்ளிடவும்' : 'Please enter your Room Number');
      return;
    }

    // Save/Update room in profile state if empty
    if (!profile.room) {
      await updateProfile({
        room: roomInput.trim(),
        name: profile.name || (language === 'ta' ? 'குடியிருப்பாளர்' : 'Resident')
      });
    }

    setShowLoginModal(false);
    setCurrentScreen(9); // Navigate to Home / Daily Activities
  };

  const handleQuickDemoLogin = async () => {
    setShowLoginModal(false);
    setCurrentScreen(9); // Directly navigate to Home
  };

  return (
    <div className="flex flex-col min-h-full bg-gradient-to-b from-white via-teal-50/30 to-emerald-50/50 justify-between p-6 pb-12 relative overflow-y-auto">
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
        <div className="mt-5 w-full max-w-[280px] aspect-4/3 rounded-2xl overflow-hidden shadow-md border border-teal-100/80 relative group">
          <img
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&auto=format&fit=crop&q=80"
            alt="SeniorSphere Peaceful Living Community"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-teal-950/40 via-transparent to-transparent" />
          <div className="absolute bottom-2.5 left-3 right-3 text-white text-[11px] font-medium text-left bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-lg">
            {language === 'en' ? 'Safe, Serene & Caring Community' : 'பாதுகாப்பான, அமைதியான அன்பு இல்லம்'}
          </div>
        </div>
      </div>

      {/* Action Buttons Section */}
      <div className="w-full flex flex-col items-center gap-3.5 mt-6 z-20">
        <button
          onClick={() => setCurrentScreen(2)}
          className="w-full py-3.5 px-6 rounded-xl bg-teal-700 hover:bg-teal-800 active:scale-[0.99] text-white font-bold text-base shadow-lg shadow-teal-700/25 transition-all flex items-center justify-center gap-2"
        >
          <span>{t.onboarding.getStarted}</span>
          <ArrowRight className="w-5 h-5 stroke-[2.5]" />
        </button>

        <div className="flex items-center justify-center gap-1.5 text-xs text-slate-600 font-medium py-1">
          <span>{t.onboarding.alreadyAccount}</span>
          <button
            type="button"
            onClick={() => setShowLoginModal(true)}
            className="text-teal-700 hover:text-teal-950 font-bold underline underline-offset-4 px-2 py-1 rounded-md hover:bg-teal-100/50 cursor-pointer transition-colors active:scale-95"
          >
            {t.onboarding.login}
          </button>
        </div>
      </div>

      {/* Interactive Resident Login Modal */}
      {showLoginModal && (
        <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-xs bg-white rounded-3xl p-5 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2 text-teal-800">
                <LogIn className="w-5 h-5" />
                <h3 className="text-base font-bold">
                  {language === 'ta' ? 'குடியிருப்பாளர் உள்நுழைவு' : 'Resident Login'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowLoginModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-slate-500" />
                  <span>{language === 'ta' ? 'அறை எண்' : 'Room Number'}</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Room 203"
                  value={roomInput}
                  onChange={e => {
                    setRoomInput(e.target.value);
                    setLoginError(null);
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600 bg-white"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-500" />
                  <span>{language === 'ta' ? 'மொபைல் எண் (விருப்பம்)' : 'Mobile Number (Optional)'}</span>
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 98765 43210"
                  value={phoneInput}
                  onChange={e => setPhoneInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600 bg-white"
                />
              </div>

              {loginError && (
                <p className="text-xs text-red-600 font-semibold">{loginError}</p>
              )}

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-sm shadow-md transition-colors"
              >
                {language === 'ta' ? 'உள்நுழைக' : 'Sign In'}
              </button>

              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="w-full py-2 px-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold text-xs transition-colors"
              >
                {language === 'ta' ? 'நேரடி முகப்பு பக்கம் செல்க →' : 'Continue to Home Dashboard →'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
