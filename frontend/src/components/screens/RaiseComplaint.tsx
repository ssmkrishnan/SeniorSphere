import React, { useState } from 'react';
import { ArrowLeft, Home, Utensils, Wrench, Users, Stethoscope, HelpCircle, Camera, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const RaiseComplaint: React.FC = () => {
  const { t, language, addComplaint, setCurrentScreen } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('room');
  const [description, setDescription] = useState<string>(
    language === 'ta' ? 'கழிவறை தண்ணீர் கசிகிறது.' : 'The bathroom tap is leaking since yesterday.'
  );
  const [hasPhoto, setHasPhoto] = useState<boolean>(true);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const categories = [
    { id: 'room', label: t.complaint.categories.room, icon: Home, color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
    { id: 'food', label: t.complaint.categories.food, icon: Utensils, color: 'text-amber-600 bg-amber-50 border-amber-200' },
    { id: 'maintenance', label: t.complaint.categories.maintenance, icon: Wrench, color: 'text-sky-600 bg-sky-50 border-sky-200' },
    { id: 'staff', label: t.complaint.categories.staff, icon: Users, color: 'text-purple-600 bg-purple-50 border-purple-200' },
    { id: 'health', label: t.complaint.categories.health, icon: Stethoscope, color: 'text-rose-600 bg-rose-50 border-rose-200' },
    { id: 'other', label: t.complaint.categories.other, icon: HelpCircle, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentCat = categories.find(c => c.id === selectedCategory);
    addComplaint({
      categoryKey: selectedCategory,
      titleEn: selectedCategory === 'room' ? 'Bathroom tap leaking' : `${currentCat?.label} Issue`,
      titleTa: selectedCategory === 'room' ? 'கழிவறை தண்ணீர் கசிகிறது' : `${currentCat?.label} பிரச்சனை`,
      descriptionEn: description,
      descriptionTa: description,
      photoUrl: hasPhoto
        ? 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=200&auto=format&fit=crop&q=80'
        : undefined
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setCurrentScreen(7); // Navigate to Complaint Status
    }, 900);
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-xs">
        <button
          onClick={() => setCurrentScreen(11)}
          className="p-1 -ml-1 text-slate-700 hover:text-slate-900 rounded-lg"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-base font-bold text-slate-800 tracking-tight">
          {t.complaint.title}
        </h2>
        <div className="w-5" />
      </div>

      <form onSubmit={handleSubmit} className="flex-1 p-4 pb-8 space-y-4 overflow-y-auto">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            {t.complaint.subtitle}
          </p>
        </div>

        {/* Category Selector Grid */}
        <div className="grid grid-cols-3 gap-2.5">
          {categories.map(cat => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`p-2.5 rounded-xl border flex flex-col items-center text-center transition-all ${
                  isSelected
                    ? 'border-teal-600 bg-teal-50/80 ring-2 ring-teal-600/20 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center mb-1.5 ${
                    isSelected ? 'bg-teal-600 text-white' : cat.color
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className={`text-[11px] font-semibold leading-tight line-clamp-1 ${
                    isSelected ? 'text-teal-900 font-bold' : 'text-slate-700'
                  }`}
                >
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Description Field */}
        <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-xs space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700">
              {t.complaint.descLabel}
            </label>
            <span className="text-[10px] text-slate-400 font-mono">
              {description.length}/250
            </span>
          </div>
          <textarea
            rows={3}
            maxLength={250}
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder={t.complaint.descPlaceholder}
            className="w-full text-xs font-medium text-slate-900 border-none p-0 focus:outline-none focus:ring-0 resize-none"
            required
          />
        </div>

        {/* Add Photo Attachment */}
        <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-xs space-y-2">
          <label className="block text-xs font-bold text-slate-700">
            {t.complaint.addPhoto}
          </label>
          <div className="flex items-center gap-3">
            {hasPhoto ? (
              <div className="relative w-16 h-16 rounded-xl overflow-hidden border-2 border-teal-600 shadow-xs group">
                <img
                  src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=150&auto=format&fit=crop&q=80"
                  alt="Attachment preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setHasPhoto(false)}
                  className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-red-600 text-white text-[10px] flex items-center justify-center font-bold"
                  title="Remove"
                >
                  &times;
                </button>
              </div>
            ) : null}

            <button
              type="button"
              onClick={() => setHasPhoto(true)}
              className="w-16 h-16 rounded-xl border-2 border-dashed border-slate-300 hover:border-teal-600 flex flex-col items-center justify-center text-slate-400 hover:text-teal-600 transition-colors bg-slate-50"
            >
              <Camera className="w-5 h-5 mb-0.5" />
              <span className="text-[9px] font-bold">Photo</span>
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-xl bg-teal-800 hover:bg-teal-900 active:scale-[0.99] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            {submitted ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                <span>{t.complaint.submittedToast}</span>
              </>
            ) : (
              <span>{t.complaint.submit}</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
