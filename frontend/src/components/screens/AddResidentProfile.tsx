import React, { useState, useEffect } from 'react';
import { ArrowLeft, FileText, Info, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AddResidentProfile: React.FC = () => {
  const { t, language, profile, updateProfile, setCurrentScreen } = useApp();
  const [formData, setFormData] = useState(profile);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setCurrentScreen(3); // Navigate to Emergency SOS screen next in flow
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      {/* Top Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-xs">
        <button
          onClick={() => setCurrentScreen(1)}
          className="p-1 -ml-1 text-slate-700 hover:text-slate-900 rounded-lg"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-base font-bold text-slate-800 tracking-tight">
          {t.profileForm.title}
        </h2>
        <div className="p-1 -mr-1 text-teal-700">
          <FileText className="w-5 h-5" />
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="flex-1 p-4 pb-8 space-y-4 overflow-y-auto">
        {/* Info Banner Card */}
        <div className="bg-indigo-50/80 border border-indigo-100 rounded-xl p-3.5 flex items-start gap-3 text-indigo-900">
          <Info className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs font-medium leading-relaxed">
            {t.profileForm.infoBanner}
          </p>
        </div>

        {/* Section 1: Personal Information */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-1.5">
            {t.profileForm.personalInfo}
          </h3>

          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t.profileForm.fullName}
            </label>
            <input
              type="text"
              placeholder={language === 'ta' ? 'உதாரணம்: சாந்தா / ராமசாமி' : 'e.g., Sundaram R / Shanti Devi'}
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600 bg-white"
              required
            />
          </div>

          {/* DOB & Gender Row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.profileForm.dob}
              </label>
              <input
                type="text"
                placeholder="e.g. 15 Aug 1950"
                value={formData.dob}
                onChange={e => setFormData({ ...formData, dob: e.target.value })}
                className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600 bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.profileForm.gender}
              </label>
              <select
                value={formData.gender}
                onChange={e => setFormData({ ...formData, gender: e.target.value })}
                className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600 bg-white"
              >
                <option value={language === 'ta' ? 'பெண்' : 'Female'}>
                  {t.profileForm.genderFemale}
                </option>
                <option value={language === 'ta' ? 'ஆண்' : 'Male'}>
                  {t.profileForm.genderMale}
                </option>
              </select>
            </div>
          </div>

          {/* Blood Group */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t.profileForm.bloodGroup}
            </label>
            <select
              value={formData.bloodGroup}
              onChange={e => setFormData({ ...formData, bloodGroup: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600 bg-white"
            >
              <option value="B+">B+</option>
              <option value="O+">O+</option>
              <option value="A+">A+</option>
              <option value="AB+">AB+</option>
              <option value="B-">B-</option>
              <option value="O-">O-</option>
              <option value="A-">A-</option>
              <option value="AB-">AB-</option>
            </select>
          </div>

          {/* Room & Block Row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {language === 'ta' ? 'அறை எண்' : 'Room Number'}
              </label>
              <input
                type="text"
                placeholder="e.g. Room 203"
                value={formData.room}
                onChange={e => setFormData({ ...formData, room: e.target.value })}
                className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600 bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {language === 'ta' ? 'வளாகம் / பிரிவு' : 'Block / Wing'}
              </label>
              <input
                type="text"
                placeholder="e.g. Lotus Block"
                value={formData.block}
                onChange={e => setFormData({ ...formData, block: e.target.value })}
                className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600 bg-white"
                required
              />
            </div>
          </div>
        </div>

        {/* Section 2: Medical Information */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-1.5">
            {t.profileForm.medicalInfo}
          </h3>

          {/* Medical Conditions */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t.profileForm.medicalConditions}
            </label>
            <input
              type="text"
              placeholder={language === 'ta' ? 'உயர் இரத்த அழுத்தம், மூட்டு வலி...' : 'e.g. Hypertension, Arthritis'}
              value={formData.medicalConditions}
              onChange={e => setFormData({ ...formData, medicalConditions: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600 bg-white"
            />
          </div>

          {/* Allergies */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t.profileForm.allergies}
            </label>
            <input
              type="text"
              placeholder={language === 'ta' ? 'எதுவும் இல்லை / பென்சிலின்' : 'e.g. None, Penicillin, Peanuts'}
              value={formData.allergies}
              onChange={e => setFormData({ ...formData, allergies: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600 bg-white"
            />
          </div>

          {/* Current Medications */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t.profileForm.currentMedications}
            </label>
            <textarea
              rows={2}
              placeholder={language === 'ta' ? 'Amlodipine 5mg (காலை)...' : 'e.g. Amlodipine 5mg morning, Calcium at night'}
              value={formData.currentMedications}
              onChange={e => setFormData({ ...formData, currentMedications: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600 bg-white"
            />
          </div>
        </div>

        {/* Submit Action */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-sm shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2"
          >
            {savedSuccess ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                <span>Saved!</span>
              </>
            ) : (
              <span>{t.profileForm.saveProfile}</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
