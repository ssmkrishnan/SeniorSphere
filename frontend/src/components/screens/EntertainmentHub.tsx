import React from 'react';
import {
  Music,
  Film,
  Headphones,
  Gamepad2,
  Sparkles,
  Newspaper,
  Brain,
  Tv,
  CalendarCheck,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const EntertainmentHub: React.FC = () => {
  const { t, setCurrentScreen } = useApp();

  const modules = [
    {
      id: 'music',
      name: t.entertainment.modules.music,
      icon: Music,
      color: 'text-amber-600',
      bg: 'bg-amber-50 border-amber-200 hover:bg-amber-100'
    },
    {
      id: 'movies',
      name: t.entertainment.modules.movies,
      icon: Film,
      color: 'text-rose-600',
      bg: 'bg-rose-50 border-rose-200 hover:bg-rose-100'
    },
    {
      id: 'audiobooks',
      name: t.entertainment.modules.audiobooks,
      icon: Headphones,
      color: 'text-purple-600',
      bg: 'bg-purple-50 border-purple-200 hover:bg-purple-100'
    },
    {
      id: 'games',
      name: t.entertainment.modules.games,
      icon: Gamepad2,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50 border-emerald-200 hover:bg-emerald-100'
    },
    {
      id: 'devotional',
      name: t.entertainment.modules.devotional,
      icon: Sparkles,
      color: 'text-orange-600',
      bg: 'bg-orange-50 border-orange-200 hover:bg-orange-100'
    },
    {
      id: 'news',
      name: t.entertainment.modules.news,
      icon: Newspaper,
      color: 'text-sky-600',
      bg: 'bg-sky-50 border-sky-200 hover:bg-sky-100'
    },
    {
      id: 'brainGames',
      name: t.entertainment.modules.brainGames,
      icon: Brain,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50 border-indigo-200 hover:bg-indigo-100'
    },
    {
      id: 'liveTv',
      name: t.entertainment.modules.liveTv,
      icon: Tv,
      color: 'text-cyan-600',
      bg: 'bg-cyan-50 border-cyan-200 hover:bg-cyan-100'
    },
    {
      id: 'activities',
      name: t.entertainment.modules.activities,
      icon: CalendarCheck,
      color: 'text-teal-600',
      bg: 'bg-teal-50 border-teal-200 hover:bg-teal-100'
    }
  ];

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-1.5 cursor-pointer">
          <h2 className="text-base font-bold text-slate-800 tracking-tight">
            {t.entertainment.title}
          </h2>
          <ChevronDown className="w-4 h-4 text-slate-500" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 pb-8 space-y-4 overflow-y-auto">
        {/* Hero Banner with Guitar Elder Graphic */}
        <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-800 rounded-2xl p-4 text-white shadow-md relative overflow-hidden flex items-center justify-between">
          <div className="relative z-10 max-w-[62%]">
            <span className="text-[11px] font-bold text-indigo-200 uppercase tracking-wider block">
              {t.entertainment.heroTitle}
            </span>
            <p className="text-sm font-semibold leading-snug text-white mt-1">
              {t.entertainment.heroSubtitle}
            </p>
          </div>

          {/* Elder Playing Guitar illustration / badge */}
          <div className="relative z-10 w-20 h-20 rounded-full bg-white/10 backdrop-blur-xs flex items-center justify-center border-2 border-white/20 flex-shrink-0">
            <span className="text-3xl">🎸</span>
          </div>

          {/* Decorative shapes */}
          <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-white/5 rounded-full blur-xl pointer-events-none" />
        </div>

        {/* Explore Section */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            {t.entertainment.explore}
          </h3>

          {/* 3x3 Grid */}
          <div className="grid grid-cols-3 gap-3">
            {modules.map(mod => {
              const Icon = mod.icon;
              return (
                <button
                  key={mod.id}
                  onClick={() => {
                    if (mod.id === 'activities') {
                      setCurrentScreen(9); // Navigate to daily activities
                    }
                  }}
                  className={`p-3 rounded-2xl border flex flex-col items-center justify-center text-center transition-all active:scale-95 shadow-xs ${mod.bg}`}
                >
                  <div className={`w-11 h-11 rounded-xl bg-white flex items-center justify-center shadow-xs mb-2 ${mod.color}`}>
                    <Icon className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 leading-tight">
                    {mod.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
