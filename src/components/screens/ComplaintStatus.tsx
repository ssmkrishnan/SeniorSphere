import React, { useState } from 'react';
import { ArrowLeft, Clock, CheckCircle2, AlertCircle, Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { ComplaintStatus as ComplaintStatusType } from '../../types';

export const ComplaintStatus: React.FC = () => {
  const { t, language, complaints, updateComplaintStatus, setCurrentScreen } = useApp();
  const [filter, setFilter] = useState<'all' | ComplaintStatusType>('all');

  const filteredComplaints = complaints.filter(item => {
    if (filter === 'all') return true;
    return item.status === filter;
  });

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-xs">
        <button
          onClick={() => setCurrentScreen(6)}
          className="p-1 -ml-1 text-slate-700 hover:text-slate-900 rounded-lg"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-base font-bold text-slate-800 tracking-tight">
          {t.complaintStatus.title}
        </h2>
        <button
          onClick={() => setCurrentScreen(6)}
          className="p-1 -mr-1 text-teal-700 hover:text-teal-900"
          title="New Complaint"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="p-3 bg-white border-b border-slate-200 flex items-center justify-between gap-1.5 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
            filter === 'all'
              ? 'bg-teal-800 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          {t.complaintStatus.tabs.all}
        </button>
        <button
          onClick={() => setFilter('open')}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
            filter === 'open'
              ? 'bg-teal-800 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          {t.complaintStatus.tabs.open}
        </button>
        <button
          onClick={() => setFilter('in_progress')}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
            filter === 'in_progress'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          {t.complaintStatus.tabs.inProgress}
        </button>
        <button
          onClick={() => setFilter('resolved')}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
            filter === 'resolved'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          {t.complaintStatus.tabs.resolved}
        </button>
      </div>

      {/* Complaints List */}
      <div className="flex-1 p-3.5 space-y-3 overflow-y-auto">
        {filteredComplaints.length === 0 ? (
          <div className="text-center py-14 px-4 space-y-3">
            <div className="w-12 h-12 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center mx-auto text-teal-700">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-slate-700">
              {language === 'ta' ? 'புகார்கள் எதுவும் இல்லை' : 'No complaints registered'}
            </p>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              {language === 'ta'
                ? 'புதிய புகாரை பதிவு செய்ய கீழே உள்ள பொத்தானை அழுத்தவும்.'
                : 'All clear! Tap below if you need any facility, meal, or maintenance assistance.'}
            </p>
            <button
              onClick={() => setCurrentScreen(6)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-xs font-bold shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>{language === 'ta' ? 'புதிய புகார் பதிவு' : 'Raise New Complaint'}</span>
            </button>
          </div>
        ) : (
          filteredComplaints.map(item => {
            const isResolved = item.status === 'resolved';
            const isInProgress = item.status === 'in_progress';
            const title = language === 'ta' ? item.titleTa : item.titleEn;

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-2.5 transition-all hover:border-teal-200"
              >
                {/* Title & Badge */}
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    {title}
                  </h3>
                  {isInProgress && (
                    <button
                      onClick={() => updateComplaintStatus(item.id, 'resolved')}
                      title="Click to mark as resolved"
                      className="flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-100 hover:bg-amber-200 px-2 py-0.5 rounded-md flex-shrink-0 transition-colors"
                    >
                      <Clock className="w-3 h-3 text-amber-600" />
                      {t.complaintStatus.statusText.inProgress}
                    </button>
                  )}
                  {isResolved && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md flex-shrink-0">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {t.complaintStatus.statusText.resolved}
                    </span>
                  )}
                  {item.status === 'open' && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-sky-800 bg-sky-100 px-2 py-0.5 rounded-md flex-shrink-0">
                      <AlertCircle className="w-3 h-3 text-sky-600" />
                      {t.complaintStatus.statusText.open}
                    </span>
                  )}
                </div>

                {/* Date */}
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{item.date}</span>
                </div>

                {/* Description snippet */}
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {language === 'ta' ? item.descriptionTa : item.descriptionEn}
                </p>

                {/* Attached Photo Thumbnail if present */}
                {item.photoUrl && (
                  <div className="pt-1">
                    <img
                      src={item.photoUrl}
                      alt="Complaint attachment"
                      className="w-12 h-12 rounded-lg object-cover border border-slate-200 shadow-xs"
                    />
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
