import React from 'react';
import {
  Wifi,
  Battery,
  Signal,
  Globe,
  Smartphone,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BottomNav } from './BottomNav';
import type { ScreenId } from '../../types';

// Clean screen imports with real names
import { Onboarding } from '../screens/Onboarding';
import { AddResidentProfile } from '../screens/AddResidentProfile';
import { EmergencyAlert } from '../screens/EmergencyAlert';
import { CancelAlert } from '../screens/CancelAlert';
import { NotificationSent } from '../screens/NotificationSent';
import { RaiseComplaint } from '../screens/RaiseComplaint';
import { ComplaintStatus } from '../screens/ComplaintStatus';
import { EntertainmentHub } from '../screens/EntertainmentHub';
import { DailyActivities } from '../screens/DailyActivities';
import { CertificationCounselling } from '../screens/CertificationCounselling';
import { Services } from '../screens/Services';
import { ProfileSettings } from '../screens/ProfileSettings';
import { MyCommunity } from '../screens/MyCommunity';

export const MobileShell: React.FC = () => {
  const {
    currentScreen,
    setCurrentScreen,
    language,
    toggleLanguage,
    isMobileFrame,
    setIsMobileFrame
  } = useApp();

  const screensMeta: Array<{ id: ScreenId; en: string; ta: string }> = [
    { id: 1, en: 'Onboarding', ta: 'வரவேற்பு' },
    { id: 2, en: 'Add Resident Profile', ta: 'குடியிருப்பாளர் விவரம்' },
    { id: 3, en: 'Emergency Alert', ta: 'அவசர எச்சரிக்கை' },
    { id: 4, en: 'Alert in Progress', ta: 'அலர்ட் செயல்பாட்டில்' },
    { id: 5, en: 'Notification Sent', ta: 'அறிவிப்பு அனுப்பப்பட்டது' },
    { id: 6, en: 'Raise Complaint', ta: 'புகார் பதிவு' },
    { id: 7, en: 'Complaint Status', ta: 'புகார் நிலை' },
    { id: 8, en: 'Entertainment Hub', ta: 'பொழுதுபோக்கு மையம்' },
    { id: 9, en: 'Daily Activities', ta: 'தினசரி செயல்பாடுகள்' },
    { id: 10, en: 'Certification Counselling', ta: 'சான்றிதழ் ஆலோசனை' },
    { id: 11, en: 'Services', ta: 'சேவைகள்' },
    { id: 12, en: 'Profile & Settings', ta: 'சுயவிவரம் & அமைப்புகள்' },
    { id: 13, en: 'My Community', ta: 'என் சமூகம்' },
  ];

  const handlePrev = () => {
    if (currentScreen > 1) {
      setCurrentScreen((currentScreen - 1) as ScreenId);
    }
  };

  const handleNext = () => {
    if (currentScreen < 13) {
      setCurrentScreen((currentScreen + 1) as ScreenId);
    }
  };

  const renderActiveScreen = () => {
    switch (currentScreen) {
      case 1:
        return <Onboarding />;
      case 2:
        return <AddResidentProfile />;
      case 3:
        return <EmergencyAlert />;
      case 4:
        return <CancelAlert />;
      case 5:
        return <NotificationSent />;
      case 6:
        return <RaiseComplaint />;
      case 7:
        return <ComplaintStatus />;
      case 8:
        return <EntertainmentHub />;
      case 9:
        return <DailyActivities />;
      case 10:
        return <CertificationCounselling />;
      case 11:
        return <Services />;
      case 12:
        return <ProfileSettings />;
      case 13:
        return <MyCommunity />;
      default:
        return <DailyActivities />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-start selection:bg-teal-700 selection:text-white">
      {/* Top Presentation Bar */}
      <header className="w-full bg-slate-950/90 border-b border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-50 backdrop-blur-md">
        {/* Brand & Project Name */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white font-black text-sm shadow-xs">
            SS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-white tracking-tight">SeniorSphere Mobile</span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-950 text-teal-300 border border-teal-800/80">
                Bilingual (EN + தமிழ்)
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              {language === 'ta' ? 'இணைந்த பராமரிப்பு. இனிய வாழ்வு.' : 'Connected Care. Comfortable Living.'}
            </p>
          </div>
        </div>

        {/* Screen Selector & Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Quick Stepper */}
          <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
            <button
              onClick={handlePrev}
              disabled={currentScreen === 1}
              className="p-1.5 text-slate-300 hover:text-white disabled:opacity-30 disabled:hover:text-slate-300 transition-colors"
              title="Previous Screen"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono font-bold px-2 text-teal-400">
              {currentScreen} / 13
            </span>
            <button
              onClick={handleNext}
              disabled={currentScreen === 13}
              className="p-1.5 text-slate-300 hover:text-white disabled:opacity-30 disabled:hover:text-slate-300 transition-colors"
              title="Next Screen"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Screen Dropdown */}
          <select
            value={currentScreen}
            onChange={e => setCurrentScreen(Number(e.target.value) as ScreenId)}
            className="bg-slate-800 text-white text-xs font-medium rounded-lg border border-slate-700 px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-teal-500 max-w-[170px] sm:max-w-[210px] truncate"
          >
            {screensMeta.map(s => (
              <option key={s.id} value={s.id}>
                {language === 'ta' ? `${s.id}. ${s.ta}` : `${s.id}. ${s.en}`}
              </option>
            ))}
          </select>

          {/* Language Switcher Pill */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-xs transition-colors"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'தமிழ் (Tamil)' : 'English'}</span>
          </button>

          {/* Device Frame / Fullscreen Toggle */}
          <button
            onClick={() => setIsMobileFrame(!isMobileFrame)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors hidden md:flex items-center gap-1 text-xs"
            title="Toggle Simulator Frame"
          >
            {isMobileFrame ? <Maximize2 className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
            <span className="hidden lg:inline">{isMobileFrame ? 'Full Screen' : 'Simulator'}</span>
          </button>

          {/* Reset Demo */}
          <button
            onClick={() => setCurrentScreen(1)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700 transition-colors"
            title="Reset to Screen 1 (Onboarding)"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full flex items-center justify-center p-2 sm:p-6 md:p-8">
        {isMobileFrame ? (
          /* Realistic Smartphone Bezel Mockup */
          <div className="relative w-full max-w-[390px] h-[780px] max-h-[92vh] bg-black rounded-[48px] p-3 ring-12 ring-slate-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] border-4 border-slate-700/80 flex flex-col overflow-hidden">
            {/* Phone Speaker / Dynamic Island Top Notch */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-50 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-slate-900 border border-slate-800/80 mr-3" />
              <div className="w-2.5 h-2.5 rounded-full bg-slate-900/60" />
            </div>

            {/* Inner Phone Screen */}
            <div className="relative w-full h-full bg-white rounded-[38px] overflow-hidden flex flex-col text-slate-800 select-none">
              {/* Mobile Status Bar */}
              <div className="h-10 bg-white/95 backdrop-blur-xs flex items-center justify-between px-6 text-slate-800 text-xs font-semibold select-none flex-shrink-0 z-40 border-b border-transparent">
                <span>9:41</span>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <Signal className="w-3.5 h-3.5 stroke-[2.5]" />
                  <Wifi className="w-3.5 h-3.5 stroke-[2.5]" />
                  <Battery className="w-4 h-4 stroke-[2.5] fill-slate-700" />
                </div>
              </div>

              {/* Active Screen Content */}
              <div className="flex-1 overflow-y-auto no-scrollbar relative flex flex-col bg-slate-50">
                {renderActiveScreen()}
              </div>

              {/* Bottom Navigation */}
              <BottomNav />

              {/* iOS Home Indicator Bar */}
              <div className="h-4 bg-white pointer-events-none flex items-center justify-center flex-shrink-0 z-10">
                <div className="w-28 h-1 bg-slate-300 rounded-full" />
              </div>
            </div>
          </div>
        ) : (
          /* Full Width Responsive Container */
          <div className="w-full max-w-md h-[820px] max-h-[92vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-800">
            {/* Status Bar */}
            <div className="h-9 bg-white/95 backdrop-blur-xs flex items-center justify-between px-5 text-slate-800 text-xs font-semibold select-none flex-shrink-0 z-40 border-b border-slate-100">
              <span>9:41</span>
              <div className="flex items-center gap-1.5 text-slate-700">
                <Signal className="w-3.5 h-3.5" />
                <Wifi className="w-3.5 h-3.5" />
                <Battery className="w-4 h-4 fill-slate-700" />
              </div>
            </div>

            {/* Content View */}
            <div className="flex-1 overflow-y-auto no-scrollbar relative flex flex-col bg-slate-50">
              {renderActiveScreen()}
            </div>

            {/* Bottom Nav */}
            <BottomNav />
          </div>
        )}
      </main>

      {/* Quick Screen Index Bar at bottom of page for client review */}
      <footer className="w-full bg-slate-950/80 border-t border-slate-800/80 px-4 py-2 flex items-center justify-center gap-1 overflow-x-auto no-scrollbar">
        {screensMeta.map(s => (
          <button
            key={s.id}
            onClick={() => setCurrentScreen(s.id)}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold whitespace-nowrap transition-colors ${
              currentScreen === s.id
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            {language === 'ta' ? s.ta : s.en}
          </button>
        ))}
      </footer>
    </div>
  );
};
