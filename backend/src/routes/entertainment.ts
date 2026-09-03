import { Router } from 'express';

export const entertainmentRouter = Router();

const modules = [
  { id: 'music', nameEn: 'Music', nameTa: 'பாடல்கள்', icon: 'Music', color: 'text-amber-600' },
  { id: 'movies', nameEn: 'Movies', nameTa: 'திரைப்படங்கள்', icon: 'Film', color: 'text-rose-600' },
  { id: 'audiobooks', nameEn: 'Audiobooks', nameTa: 'ஆடியோபுக்', icon: 'Headphones', color: 'text-purple-600' },
  { id: 'games', nameEn: 'Games', nameTa: 'விளையாட்டுகள்', icon: 'Gamepad2', color: 'text-emerald-600' },
  { id: 'devotional', nameEn: 'Devotional', nameTa: 'ஆன்மீகம்', icon: 'Sparkles', color: 'text-orange-600' },
  { id: 'news', nameEn: 'News', nameTa: 'செய்திகள்', icon: 'Newspaper', color: 'text-sky-600' },
  { id: 'brainGames', nameEn: 'Brain Games', nameTa: 'மூளைப்பயிற்சி', icon: 'Brain', color: 'text-indigo-600' },
  { id: 'liveTv', nameEn: 'Live TV', nameTa: 'நேரலை டிவி', icon: 'Tv', color: 'text-cyan-600' },
  { id: 'activities', nameEn: 'Activities', nameTa: 'நிகழ்வுகள்', icon: 'CalendarCheck', color: 'text-teal-600' }
];

// GET /api/entertainment/modules
entertainmentRouter.get('/modules', (req, res) => {
  return res.json({ success: true, data: modules });
});
