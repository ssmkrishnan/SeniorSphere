import React from 'react';
import { Bell, MapPin, HeartPulse, Users, MessageSquareShare } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CancelAlert: React.FC = () => {
  const { t, profile, cancelEmergencyAlert, setCurrentScreen } = useApp();

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      {/* Amber Header Card: Alert in Progress */}
      <div className="bg-gradient-to-b from-amber-500 to-orange-600 text-white pt-4 pb-7 px-5 rounded-b-[2rem] shadow-lg flex flex-col items-center text-center relative overflow-hidden">
        {/* Animated Bell Indicator */}
        <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center p-2 mb-2 amber-pulse">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-md">
            <Bell className="w-9 h-9 text-orange-600 fill-orange-600 animate-bounce" style={{ animationDuration: '2s' }} />
          </div>
        </div>

        <h2 className="text-xl font-extrabold tracking-tight">
          {t.alertProgress.title}
        </h2>
        <p className="text-xs sm:text-sm text-orange-100 font-medium mt-0.5">
          {t.alertProgress.notifiedTeam}
        </p>
      </div>

      {/* Incident Details Card */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
          {/* Location */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-700 flex-shrink-0 mt-0.5">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                {t.alertProgress.locationLabel}
              </p>
              <p className="text-sm font-bold text-slate-900">
                {profile.room}, {profile.block}
              </p>
            </div>
          </div>

          <div className="h-px bg-slate-100" />

          {/* Medical Info */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-600 flex-shrink-0 mt-0.5">
              <HeartPulse className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                {t.alertProgress.medicalLabel}
              </p>
              <p className="text-sm font-medium text-slate-900">
                {profile.medicalConditions}
              </p>
            </div>
          </div>

          <div className="h-px bg-slate-100" />

          {/* Shared With */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-700 flex-shrink-0 mt-0.5">
              <Users className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                  {t.alertProgress.sharedLabel}
                </p>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                  {t.alertProgress.sharedFraction}
                </span>
              </div>
              <p className="text-sm font-medium text-slate-900 mt-0.5">
                {t.alertProgress.sharedVal}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Link to Preview Screen 5: Notification Sent */}
        <button
          onClick={() => setCurrentScreen(5)}
          className="w-full py-2.5 px-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-center gap-2 hover:bg-emerald-100/80 transition-colors shadow-xs"
        >
          <MessageSquareShare className="w-4 h-4 text-emerald-700" />
          <span>{t.notification.title} (WhatsApp & SMS) &rarr;</span>
        </button>

        {/* Cancellation Box */}
        <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 text-center space-y-3">
          <div>
            <h3 className="text-sm font-bold text-amber-950">
              {t.alertProgress.cancelPromptTitle}
            </h3>
            <p className="text-xs text-amber-800/90 mt-0.5 font-medium">
              {t.alertProgress.cancelPromptDesc}
            </p>
          </div>

          {/* Decision Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              onClick={() => setCurrentScreen(5)}
              className="py-2.5 px-3 rounded-xl bg-white border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 shadow-xs"
            >
              {t.alertProgress.keepAlert}
            </button>
            <button
              onClick={cancelEmergencyAlert}
              className="py-2.5 px-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md shadow-orange-600/20 active:scale-[0.99]"
            >
              {t.alertProgress.yesCancel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
