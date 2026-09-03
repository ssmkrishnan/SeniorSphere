import React, { useState, useEffect } from 'react';
import { Gift, Image as ImageIcon, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';

export const MyCommunity: React.FC = () => {
  const { t, language } = useApp();
  const [activeTab, setActiveTab] = useState<'residents' | 'staff' | 'family'>('residents');
  const [birthdays, setBirthdays] = useState(t.community.birthdays);
  const [galleryList, setGalleryList] = useState<Array<{ url: string; title: string }>>([
    {
      url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&auto=format&fit=crop&q=80',
      title: language === 'ta' ? 'காலை நடைப்பயிற்சி' : 'Morning Stroll'
    },
    {
      url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=300&auto=format&fit=crop&q=80',
      title: language === 'ta' ? 'இசை அரங்கம்' : 'Music Afternoon'
    },
    {
      url: 'https://images.unsplash.com/photo-1516726817505-f5ed825624d8?w=300&auto=format&fit=crop&q=80',
      title: language === 'ta' ? 'தோட்டக்கலை' : 'Community Garden'
    },
    {
      url: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=300&auto=format&fit=crop&q=80',
      title: language === 'ta' ? 'பண்டிகை கொண்டாட்டம்' : 'Festival Gathering'
    }
  ]);

  useEffect(() => {
    async function loadCommunityData() {
      const bdays = await api.getBirthdays();
      if (bdays && bdays.length > 0) {
        setBirthdays(bdays.map((b: any) => ({
          name: language === 'ta' ? b.nameTa : b.nameEn,
          date: b.date
        })));
      }

      const gal = await api.getGallery();
      if (gal && gal.length > 0) {
        setGalleryList(gal.map((g: any) => ({
          url: g.photoUrl,
          title: language === 'ta' ? g.titleTa : g.titleEn
        })));
      }
    }
    loadCommunityData();
  }, [language]);

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-4 py-3 shadow-xs">
        <h2 className="text-base font-bold text-slate-800 tracking-tight">
          {t.community.title}
        </h2>
      </div>

      {/* Segmented Control Tabs */}
      <div className="p-3 bg-white border-b border-slate-200 flex justify-center">
        <div className="bg-slate-100 p-1 rounded-xl flex w-full max-w-xs">
          <button
            onClick={() => setActiveTab('residents')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'residents'
                ? 'bg-teal-800 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.community.tabs.residents}
          </button>
          <button
            onClick={() => setActiveTab('staff')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'staff'
                ? 'bg-teal-800 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.community.tabs.staff}
          </button>
          <button
            onClick={() => setActiveTab('family')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'family'
                ? 'bg-teal-800 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.community.tabs.family}
          </button>
        </div>
      </div>

      <div className="flex-1 p-4 pb-8 space-y-5 overflow-y-auto">
        {/* Section 1: Birthdays This Month */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {t.community.birthdaysTitle}
            </h3>
            <span className="text-xs text-rose-500 flex items-center gap-1 font-semibold">
              <Heart className="w-3.5 h-3.5 fill-rose-500" />
              May
            </span>
          </div>

          <div className="space-y-2.5">
            {birthdays.map((person, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-3 border border-slate-200 shadow-xs flex items-center justify-between hover:border-teal-300 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-amber-300 shadow-xs flex-shrink-0 bg-slate-100">
                    <img
                      src={
                        idx === 0
                          ? 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
                          : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
                      }
                      alt={person.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                      {person.name}
                    </h4>
                    <p className="text-[11px] font-semibold text-amber-700 mt-0.5">
                      {person.date}
                    </p>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shadow-xs">
                  <Gift className="w-4 h-4 stroke-[2.2]" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Photo Gallery */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {t.community.galleryTitle}
            </h3>
            <button className="text-xs font-bold text-teal-700 hover:text-teal-900">
              {t.community.viewAll}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {galleryList.map((img, i) => (
              <div
                key={i}
                className="group relative aspect-4/3 rounded-2xl overflow-hidden shadow-xs border border-slate-200/80 cursor-pointer"
              >
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-2 left-2 right-2 text-white flex items-center gap-1">
                  <ImageIcon className="w-3 h-3 text-white/80 flex-shrink-0" />
                  <span className="text-[10px] font-semibold truncate">{img.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
