import React from 'react';
import { Home, Users, Bell, LayoutGrid, Menu } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { ScreenId, TabId } from '../../types';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, currentScreen, setCurrentScreen, alertActive, t } = useApp();

  // Don't show bottom nav on Screen 1 (Onboarding)
  if (currentScreen === 1) {
    return null;
  }

  const handleTabClick = (tab: TabId) => {
    setActiveTab(tab);
    switch (tab) {
      case 'home':
        setCurrentScreen(9); // Screen 9: Daily Activities / Today at SeniorSphere
        break;
      case 'community':
        setCurrentScreen(13); // Screen 13: My Community
        break;
      case 'alert':
        if (alertActive) {
          setCurrentScreen(4); // Screen 4: Alert in Progress
        } else {
          setCurrentScreen(3); // Screen 3: Emergency Alert
        }
        break;
      case 'services':
        setCurrentScreen(11); // Screen 11: Services Directory
        break;
      case 'more':
        setCurrentScreen(12); // Screen 12: Profile & Settings
        break;
    }
  };

  const isAlertActive = currentScreen === 3 || currentScreen === 4 || currentScreen === 5;

  return (
    <nav aria-label="Bottom Navigation" className="sticky bottom-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-1.5 flex items-center justify-around shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      {/* 1. Home */}
      <button
        onClick={() => handleTabClick('home')}
        className={`flex flex-col items-center justify-center min-w-[56px] py-1 transition-all ${
          activeTab === 'home' && currentScreen === 9
            ? 'text-teal-700 font-semibold'
            : 'text-slate-500 hover:text-slate-700'
        }`}
      >
        <Home className={`w-5 h-5 ${activeTab === 'home' && currentScreen === 9 ? 'stroke-[2.5]' : 'stroke-2'}`} />
        <span className="text-[11px] mt-1 tracking-tight">{t.nav.home}</span>
      </button>

      {/* 2. Community */}
      <button
        onClick={() => handleTabClick('community')}
        className={`flex flex-col items-center justify-center min-w-[56px] py-1 transition-all ${
          currentScreen === 13
            ? 'text-teal-700 font-semibold'
            : 'text-slate-500 hover:text-slate-700'
        }`}
      >
        <Users className={`w-5 h-5 ${currentScreen === 13 ? 'stroke-[2.5]' : 'stroke-2'}`} />
        <span className="text-[11px] mt-1 tracking-tight">{t.nav.community}</span>
      </button>

      {/* 3. Central Prominent Alert Button */}
      <button
        onClick={() => handleTabClick('alert')}
        className="relative -top-3 flex flex-col items-center justify-center group focus:outline-none"
      >
        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 ${
            isAlertActive || alertActive
              ? 'bg-gradient-to-tr from-red-600 to-rose-500 text-white sos-pulse shadow-red-500/40 ring-4 ring-red-100'
              : 'bg-red-600 text-white hover:bg-red-700 shadow-red-600/30'
          }`}
        >
          <Bell className="w-7 h-7 stroke-[2.5] animate-bounce" style={{ animationDuration: '3s' }} />
        </div>
        <span
          className={`text-[11px] font-bold mt-0.5 tracking-tight ${
            isAlertActive || alertActive ? 'text-red-600' : 'text-slate-600'
          }`}
        >
          {t.nav.alert}
        </span>
      </button>

      {/* 4. Services */}
      <button
        onClick={() => handleTabClick('services')}
        className={`flex flex-col items-center justify-center min-w-[56px] py-1 transition-all ${
          currentScreen === 11 || currentScreen === 6 || currentScreen === 7 || currentScreen === 10
            ? 'text-teal-700 font-semibold'
            : 'text-slate-500 hover:text-slate-700'
        }`}
      >
        <LayoutGrid
          className={`w-5 h-5 ${
            currentScreen === 11 || currentScreen === 6 || currentScreen === 7 || currentScreen === 10
              ? 'stroke-[2.5]'
              : 'stroke-2'
          }`}
        />
        <span className="text-[11px] mt-1 tracking-tight">{t.nav.services}</span>
      </button>

      {/* 5. More */}
      <button
        onClick={() => handleTabClick('more')}
        className={`flex flex-col items-center justify-center min-w-[56px] py-1 transition-all ${
          currentScreen === 12 || currentScreen === 8
            ? 'text-teal-700 font-semibold'
            : 'text-slate-500 hover:text-slate-700'
        }`}
      >
        <Menu
          className={`w-5 h-5 ${currentScreen === 12 || currentScreen === 8 ? 'stroke-[2.5]' : 'stroke-2'}`}
        />
        <span className="text-[11px] mt-1 tracking-tight">{t.nav.more}</span>
      </button>
    </nav>
  );
};
