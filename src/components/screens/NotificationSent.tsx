import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check, CheckCheck, Clock, MapPin, HeartPulse, Users, ShieldCheck, MessageCircle, Smartphone } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';

export const NotificationSent: React.FC = () => {
  const { t, language, profile, setCurrentScreen } = useApp();
  const [activeChannel, setActiveChannel] = useState<'whatsapp' | 'sms'>('whatsapp');
  const [activeAlert, setActiveAlert] = useState<any>(null);

  useEffect(() => {
    async function loadAlert() {
      const data = await api.getActiveAlert();
      if (data) {
        setActiveAlert(data);
      }
    }
    loadAlert();
  }, []);

  return (
    <div className="flex flex-col min-h-full bg-slate-100">
      {/* Top Header with Back */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-4 py-2.5 flex items-center justify-between shadow-xs">
        <button
          onClick={() => setCurrentScreen(4)}
          className="p-1 -ml-1 text-slate-700 hover:text-slate-900 rounded-lg"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-sm font-bold text-slate-800 tracking-tight">
          {t.notification.title}
        </h2>
        <div className="w-5" />
      </div>

      {/* WhatsApp vs SMS Segmented Control Tabs */}
      <div className="p-3 bg-white border-b border-slate-200 flex justify-center">
        <div className="bg-slate-100 p-1 rounded-xl flex w-full max-w-xs">
          <button
            onClick={() => setActiveChannel('whatsapp')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeChannel === 'whatsapp'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>{t.notification.tabWhatsapp}</span>
          </button>
          <button
            onClick={() => setActiveChannel('sms')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeChannel === 'sms'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>{t.notification.tabSms}</span>
          </button>
        </div>
      </div>

      {/* Main Preview Container */}
      <div className="flex-1 p-3.5 space-y-3 overflow-y-auto">
        {activeChannel === 'whatsapp' ? (
          /* WhatsApp Style Mockup View */
          <div className="bg-[#EFEAE2] rounded-2xl p-3 border border-slate-300 shadow-sm relative space-y-2.5">
            {/* WhatsApp App Bar Header */}
            <div className="bg-[#075E54] -mx-3 -mt-3 p-2.5 rounded-t-2xl flex items-center justify-between text-white shadow-xs">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-teal-800 font-bold text-xs">
                  SS
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-xs">{t.appName}</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                  </div>
                  <p className="text-[10px] text-emerald-200">{t.notification.online}</p>
                </div>
              </div>
              <span className="text-[10px] text-white/80">Room 203 Alert</span>
            </div>

            {/* Chat Bubble with Emergency Details */}
            <div className="bg-white rounded-xl p-3.5 shadow-sm text-slate-800 space-y-2 border border-slate-200">
              {/* Emergency Alert Title */}
              <div className="border-b border-red-100 pb-2">
                <h3 className="text-xs sm:text-sm font-extrabold text-red-600 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-ping inline-block" />
                  {t.notification.alertHeadline}
                </h3>
                <p className="text-xs font-semibold text-slate-800 mt-1">
                  {language === 'ta'
                    ? `${profile.name} அவர்களிடமிருந்து அவசர எச்சரிக்கை பெறப்பட்டது.`
                    : `An emergency alert has been sent by ${profile.name}.`}
                </p>
              </div>

              {/* Data Rows */}
              <div className="space-y-1.5 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span>
                    <strong className="text-slate-900">{t.notification.timeLabel}:</strong>{' '}
                    {t.notification.timeVal}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                  <span>
                    <strong className="text-slate-900">{t.notification.locLabel}:</strong>{' '}
                    {profile.room}, {profile.block}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <HeartPulse className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                  <span>
                    <strong className="text-slate-900">{t.notification.medLabel}:</strong>{' '}
                    {profile.medicalConditions}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                  <span>
                    <strong className="text-slate-900">{t.notification.sharedLabel}:</strong>{' '}
                    {t.notification.sharedVal}
                  </span>
                </div>
              </div>

              {/* View On Map Link */}
              <div className="pt-1">
                <button
                  type="button"
                  className="text-xs font-bold text-teal-700 hover:text-teal-900 underline underline-offset-2 flex items-center gap-1"
                >
                  <MapPin className="w-3 h-3" />
                  {t.notification.viewOnMap}
                </button>
              </div>

              {/* Acknowledged By Section */}
              <div className="bg-slate-50 rounded-lg p-2.5 mt-2 border border-slate-200/80 space-y-1.5">
                <p className="text-[11px] font-bold text-slate-700">
                  {t.notification.acknowledgedBy}
                </p>
                <div className="flex items-center justify-between text-xs text-slate-700">
                  <div className="flex items-center gap-1.5">
                    <CheckCheck className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                    <span className="font-semibold">{t.notification.nurse}</span>
                  </div>
                  <span className="text-[11px] text-slate-500">{t.notification.nurseTime}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-700">
                  <div className="flex items-center gap-1.5">
                    <CheckCheck className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                    <span className="font-semibold">{t.notification.doctor}</span>
                  </div>
                  <span className="text-[11px] text-slate-500">{t.notification.doctorTime}</span>
                </div>
              </div>

              {/* Message Time and Read status */}
              <div className="flex items-center justify-end gap-1 text-[10px] text-slate-400 pt-1">
                <span>10:04 AM</span>
                <CheckCheck className="w-3.5 h-3.5 text-blue-500" />
              </div>
            </div>
          </div>
        ) : (
          /* SMS Style View */
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-bold text-slate-700">SMS &bull; SENIOR-SPHERE</span>
              <span className="text-[11px] text-slate-400">10:04 AM</span>
            </div>
            <div className="bg-slate-100 rounded-xl p-3 text-xs text-slate-800 space-y-1.5">
              <p className="font-bold text-red-600">[SOS ALERT - SeniorSphere]</p>
              <p>
                Emergency Alert from {profile.room}, {profile.block} by {profile.name}.
              </p>
              <p>Medical: {profile.medicalConditions}</p>
              <p>Duty Doctor & Nurse notified.</p>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-semibold">
              <Check className="w-4 h-4" />
              <span>{t.notification.sentSuccess}</span>
            </div>
          </div>
        )}

        {/* Info Banner at Bottom */}
        <div className="bg-teal-50 border border-teal-200/80 rounded-xl p-3 flex items-start gap-2 text-teal-900">
          <CheckCheck className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs font-medium">
            {t.notification.smsNote}
          </p>
        </div>

        {/* Action button to return to home/activities */}
        <div className="pt-2">
          <button
            onClick={() => setCurrentScreen(9)}
            className="w-full py-3 px-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-md transition-all"
          >
            {language === 'ta' ? 'இன்றைய நிகழ்வுகளுக்கு செல்க' : 'Proceed to Daily Activities'} &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
