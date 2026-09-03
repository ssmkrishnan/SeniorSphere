import React from 'react';
import { Calendar, MapPin, Sparkles, HeartPulse, Trophy, Film, Activity as YogaIcon } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DailyActivities: React.FC = () => {
  const { t, language } = useApp();

  const activityIcons = [
    { icon: YogaIcon, color: 'text-teal-600 bg-teal-50 border-teal-200' },
    { icon: Sparkles, color: 'text-amber-600 bg-amber-50 border-amber-200' },
    { icon: HeartPulse, color: 'text-rose-600 bg-rose-50 border-rose-200' },
    { icon: Trophy, color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
    { icon: Film, color: 'text-purple-600 bg-purple-50 border-purple-200' }
  ];

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-4 py-3 shadow-xs">
        <h2 className="text-base font-bold text-slate-800 tracking-tight">
          {t.activities.title}
        </h2>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-teal-700 mt-0.5">
          <Calendar className="w-3.5 h-3.5" />
          <span>{t.activities.date}</span>
        </div>
      </div>

      {/* Activities Timeline */}
      <div className="flex-1 p-4 pb-8 space-y-3 overflow-y-auto">
        {t.activities.items.map((item, index) => {
          const iconMeta = activityIcons[index % activityIcons.length];
          const Icon = iconMeta.icon;

          return (
            <div
              key={index}
              className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-start gap-3.5 transition-all hover:border-teal-300"
            >
              {/* Icon Circle */}
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 border ${iconMeta.color}`}>
                <Icon className="w-5 h-5 stroke-[2.2]" />
              </div>

              {/* Activity Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[11px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-100">
                    {item.time}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {item.category}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  {item.title}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span className="truncate">{item.location}</span>
                </div>
              </div>
            </div>
          );
        })}

        {/* Informative Note for Elders */}
        <div className="bg-teal-50/70 border border-teal-200/80 rounded-xl p-3 text-center text-xs text-teal-900 font-medium">
          {language === 'ta'
            ? 'அனைத்து நிகழ்வுகளிலும் ஊழியர்கள் உதவிக்கு இருப்பார்கள்.'
            : 'Care staff and volunteers are available at all sessions.'}
        </div>
      </div>
    </div>
  );
};
