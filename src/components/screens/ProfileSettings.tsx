import React, { useState } from 'react';
import {
  User,
  HeartPulse,
  PhoneCall,
  BellRing,
  Globe,
  HelpCircle,
  Info,
  ChevronRight,
  Check,
  LogOut,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ProfileSettings: React.FC = () => {
  const { t, language, setLanguage, profile, setCurrentScreen } = useApp();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-4 py-3 shadow-xs">
        <h2 className="text-base font-bold text-slate-800 tracking-tight">
          {t.profileSettings.title}
        </h2>
      </div>

      <div className="flex-1 p-4 pb-8 space-y-4 overflow-y-auto">
        {/* Resident Identity Card */}
        <div
          onClick={() => setCurrentScreen(2)}
          className="bg-gradient-to-r from-teal-800 to-teal-900 rounded-2xl p-4 text-white shadow-md flex items-center justify-between cursor-pointer hover:from-teal-900 hover:to-teal-950 transition-all"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/40 shadow-sm flex-shrink-0 bg-teal-700">
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-base font-bold tracking-tight text-white">
                {profile.name}
              </h3>
              <p className="text-xs text-teal-200 font-medium mt-0.5">
                {profile.room}, {profile.block}
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-teal-200" />
        </div>

        {/* Settings Menu List */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs divide-y divide-slate-100 overflow-hidden">
          {/* 1. Personal Profile */}
          <button
            onClick={() => setCurrentScreen(2)}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-800">
                {t.profileSettings.menu.personalProfile}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          {/* 2. Health Records */}
          <button
            onClick={() => setCurrentScreen(2)}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                <HeartPulse className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-800">
                {t.profileSettings.menu.healthRecords}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          {/* 3. Emergency Contacts */}
          <button
            onClick={() => setCurrentScreen(4)}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                <PhoneCall className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-800">
                {t.profileSettings.menu.emergencyContacts}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          {/* 4. Notification Settings */}
          <button
            onClick={() => setCurrentScreen(5)}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <BellRing className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-800">
                {t.profileSettings.menu.notificationSettings}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          {/* 5. App Language (Interactive Selector) */}
          <button
            onClick={() => setShowLanguageModal(true)}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <Globe className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-800">
                {t.profileSettings.menu.appLanguage}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                {language === 'en' ? 'English' : 'தமிழ்'}
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
          </button>

          {/* 6. Help & Support */}
          <button
            onClick={() => setCurrentScreen(6)}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <HelpCircle className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-800">
                {t.profileSettings.menu.helpSupport}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          {/* 7. About SeniorSphere */}
          <button
            onClick={() => setShowAboutModal(true)}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
                <Info className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-800">
                {t.profileSettings.menu.about}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Log Out Button */}
        <div className="pt-2">
          <button
            onClick={() => setCurrentScreen(1)}
            className="w-full py-3 px-4 rounded-xl bg-slate-200/70 hover:bg-slate-300 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>{language === 'ta' ? 'வெளியேறு (Onboarding)' : 'Log Out (Onboarding)'}</span>
          </button>
        </div>
      </div>

      {/* Language Selection Modal */}
      {showLanguageModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm p-5 space-y-4 shadow-2xl">
            <h3 className="text-sm font-bold text-slate-800 text-center">
              Select Language / மொழியை தேர்ந்தெடுக்கவும்
            </h3>

            <div className="space-y-2">
              <button
                onClick={() => {
                  setLanguage('en');
                  setShowLanguageModal(false);
                }}
                className={`w-full p-3.5 rounded-xl border flex items-center justify-between text-left transition-all ${
                  language === 'en'
                    ? 'border-teal-700 bg-teal-50 text-teal-900 font-bold'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div>
                  <p className="text-sm">English</p>
                  <p className="text-[11px] text-slate-500">English application language</p>
                </div>
                {language === 'en' && <Check className="w-5 h-5 text-teal-700" />}
              </button>

              <button
                onClick={() => {
                  setLanguage('ta');
                  setShowLanguageModal(false);
                }}
                className={`w-full p-3.5 rounded-xl border flex items-center justify-between text-left transition-all ${
                  language === 'ta'
                    ? 'border-teal-700 bg-teal-50 text-teal-900 font-bold'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div>
                  <p className="text-sm font-semibold">தமிழ் (Tamil)</p>
                  <p className="text-[11px] text-slate-500">முழுமையான தமிழ் இடைமுகம்</p>
                </div>
                {language === 'ta' && <Check className="w-5 h-5 text-teal-700" />}
              </button>
            </div>

            <button
              onClick={() => setShowLanguageModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* About SeniorSphere Modal */}
      {showAboutModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm p-5 space-y-3.5 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900">
              SeniorSphere
            </h3>
            <p className="text-xs text-teal-700 font-semibold">
              {t.tagline}
            </p>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {t.heroTitle}
            </p>
            <div className="bg-slate-50 rounded-xl p-3 text-[11px] text-slate-600 space-y-1">
              <p><strong>24x7 Helpline:</strong> +91 800-CARE-NOW</p>
              <p><strong>Version:</strong> 1.0.0 Mobile</p>
            </div>
            <button
              onClick={() => setShowAboutModal(false)}
              className="w-full py-2.5 rounded-xl bg-teal-800 text-white text-xs font-bold hover:bg-teal-900"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
