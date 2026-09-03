import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Language, ScreenId, TabId, ResidentProfile, Complaint } from '../types';
import { translations } from '../i18n/translations';
import { api } from '../services/api';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  currentScreen: ScreenId;
  setCurrentScreen: (screen: ScreenId) => void;
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
  profile: ResidentProfile;
  updateProfile: (data: Partial<ResidentProfile>) => void;
  complaints: Complaint[];
  addComplaint: (data: Omit<Complaint, 'id' | 'date' | 'status'>) => void;
  alertActive: boolean;
  alertType: 'sos' | 'medical' | 'staff';
  activeAlertId: string | null;
  triggerEmergencyAlert: (type?: 'sos' | 'medical' | 'staff') => void;
  cancelEmergencyAlert: () => void;
  isMobileFrame: boolean;
  setIsMobileFrame: (val: boolean) => void;
  isBackendConnected: boolean;
  t: typeof translations['en'];
}

const defaultProfileEn: ResidentProfile = {
  name: 'Shanti Devi',
  dob: '15 Aug 1950',
  gender: 'Female',
  bloodGroup: 'B+',
  medicalConditions: 'Hypertension, Arthritis',
  allergies: 'None',
  currentMedications: 'Amlodipine 5mg (Morning), Calcium Tablet (Night)',
  room: 'Room 203',
  block: 'Lotus Block',
  avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
};

const defaultProfileTa: ResidentProfile = {
  name: 'சண்முகம்',
  dob: '15 ஆக., 1950',
  gender: 'ஆண்',
  bloodGroup: 'B+',
  medicalConditions: 'உயர் இரத்த அழுத்தம், சர்க்கரை',
  allergies: 'எதுவும் இல்லை',
  currentMedications: 'Amlodipine 5mg (காலை), Metformin 500mg (இரவு)',
  room: 'அறை 203',
  block: 'தாமரை மாடி',
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
};

const initialComplaints: Complaint[] = [
  {
    id: 'C-101',
    categoryKey: 'room',
    titleEn: 'Bathroom tap leaking',
    titleTa: 'கழிவறை தண்ணீர் கசிகிறது',
    date: '20 May 2024, 09:15 AM',
    status: 'in_progress',
    descriptionEn: 'The bathroom tap is leaking since yesterday.',
    descriptionTa: 'கழிவறை தண்ணீர் கசிகிறது.',
    photoUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'C-102',
    categoryKey: 'maintenance',
    titleEn: 'Fan not working',
    titleTa: 'ஃபேன் இயங்கவில்லை',
    date: '18 May 2024, 11:30 AM',
    status: 'resolved',
    descriptionEn: 'Ceiling fan makes noise and does not rotate.',
    descriptionTa: 'ஃபேன் சுற்றவில்லை மற்றும் சத்தம் வருகிறது.'
  },
  {
    id: 'C-103',
    categoryKey: 'food',
    titleEn: 'Food is too salty',
    titleTa: 'உணவு உப்பு அதிகம்',
    date: '15 May 2024, 01:45 PM',
    status: 'resolved',
    descriptionEn: 'Lunch sambar had excess salt.',
    descriptionTa: 'மதிய உணவில் உப்பு அதிகமாக இருந்தது.'
  },
  {
    id: 'C-104',
    categoryKey: 'room',
    titleEn: 'Bed side light not working',
    titleTa: 'படுக்கை விளக்கு எரியவில்லை',
    date: '10 May 2024, 04:20 PM',
    status: 'resolved',
    descriptionEn: 'Reading light bulb needs replacement.',
    descriptionTa: 'படுக்கை அருகில் உள்ள விளக்கு எரியவில்லை.'
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [currentScreen, setCurrentScreen] = useState<ScreenId>(1);
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(true);
  const [alertActive, setAlertActive] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<'sos' | 'medical' | 'staff'>('sos');
  const [activeAlertId, setActiveAlertId] = useState<string | null>(null);
  const [complaints, setComplaints] = useState<Complaint[]>(initialComplaints);
  const [profile, setProfile] = useState<ResidentProfile>(defaultProfileEn);
  const [isBackendConnected, setIsBackendConnected] = useState<boolean>(false);

  // Sync with PostgreSQL backend on mount
  useEffect(() => {
    let mounted = true;

    async function syncBackend() {
      const isHealthy = await api.checkHealth();
      if (!mounted) return;
      setIsBackendConnected(isHealthy);

      if (isHealthy) {
        console.log('[SeniorSphere] PostgreSQL backend detected on port 5001. Syncing state...');
        // 1. Fetch profile from PostgreSQL
        const backendProfile = await api.getProfile();
        if (backendProfile && mounted) {
          if (language === 'ta') {
            setProfile({
              name: backendProfile.nameTa || defaultProfileTa.name,
              dob: backendProfile.dob,
              gender: backendProfile.gender,
              bloodGroup: backendProfile.bloodGroup,
              medicalConditions: backendProfile.medicalConditions,
              allergies: backendProfile.allergies,
              currentMedications: backendProfile.currentMedications,
              room: backendProfile.room,
              block: backendProfile.block,
              avatarUrl: backendProfile.avatarUrl || defaultProfileTa.avatarUrl
            });
          } else {
            setProfile({
              name: backendProfile.nameEn || defaultProfileEn.name,
              dob: backendProfile.dob,
              gender: backendProfile.gender,
              bloodGroup: backendProfile.bloodGroup,
              medicalConditions: backendProfile.medicalConditions,
              allergies: backendProfile.allergies,
              currentMedications: backendProfile.currentMedications,
              room: backendProfile.room,
              block: backendProfile.block,
              avatarUrl: backendProfile.avatarUrl || defaultProfileEn.avatarUrl
            });
          }
        }

        // 2. Fetch complaints from PostgreSQL
        const backendComplaints = await api.getComplaints();
        if (backendComplaints && backendComplaints.length > 0 && mounted) {
          const mapped: Complaint[] = backendComplaints.map((c: any) => ({
            id: c.id,
            categoryKey: c.categoryKey,
            titleEn: c.titleEn,
            titleTa: c.titleTa,
            date: new Date(c.createdAt).toLocaleString(language === 'ta' ? 'ta-IN' : 'en-US', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            }),
            status: c.status,
            descriptionEn: c.descriptionEn,
            descriptionTa: c.descriptionTa,
            photoUrl: c.photoUrl
          }));
          setComplaints(mapped);
        }
      }
    }

    syncBackend();

    // Connect WebSocket
    const ws = api.connectEmergencySocket((data) => {
      console.log('[WebSocket Message Received]:', data);
      if (data.event === 'EMERGENCY_ALERT_TRIGGERED') {
        setAlertActive(true);
      } else if (data.event === 'EMERGENCY_ALERT_CANCELLED') {
        setAlertActive(false);
      }
    });

    return () => {
      mounted = false;
      if (ws) ws.close();
    };
  }, [language]);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    if (lang === 'ta') {
      setProfile(prev => ({
        ...defaultProfileTa,
        avatarUrl: prev.avatarUrl
      }));
    } else {
      setProfile(prev => ({
        ...defaultProfileEn,
        avatarUrl: prev.avatarUrl
      }));
    }
  };

  const toggleLanguage = () => {
    handleSetLanguage(language === 'en' ? 'ta' : 'en');
  };

  const updateProfile = async (data: Partial<ResidentProfile>) => {
    setProfile(prev => ({ ...prev, ...data }));
    // Persist to PostgreSQL backend
    await api.updateProfile({
      ...(language === 'ta' ? { nameTa: data.name } : { nameEn: data.name }),
      dob: data.dob,
      gender: data.gender,
      bloodGroup: data.bloodGroup,
      medicalConditions: data.medicalConditions,
      allergies: data.allergies,
      currentMedications: data.currentMedications,
      room: data.room,
      block: data.block
    });
  };

  const addComplaint = async (data: Omit<Complaint, 'id' | 'date' | 'status'>) => {
    const tempId = `C-${Date.now().toString().slice(-3)}`;
    const newComplaint: Complaint = {
      ...data,
      id: tempId,
      date: new Date().toLocaleString(language === 'ta' ? 'ta-IN' : 'en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      status: 'in_progress'
    };
    setComplaints(prev => [newComplaint, ...prev]);

    // Persist to PostgreSQL backend
    const saved = await api.createComplaint(data);
    if (saved) {
      setComplaints(prev => prev.map(c => c.id === tempId ? { ...c, id: saved.id } : c));
    }
  };

  const triggerEmergencyAlert = async (type: 'sos' | 'medical' | 'staff' = 'sos') => {
    setAlertType(type);
    setAlertActive(true);
    setCurrentScreen(4); // Move directly to Screen 4 (Alert in Progress)

    // Trigger backend PostgreSQL & WebSocket SOS
    const response = await api.triggerAlert(type);
    if (response && response.data) {
      setActiveAlertId(response.data.id);
    }
  };

  const cancelEmergencyAlert = async () => {
    setAlertActive(false);
    setCurrentScreen(3); // Return to Emergency Alert screen

    // Cancel in PostgreSQL backend
    if (activeAlertId) {
      await api.cancelAlert(activeAlertId);
      setActiveAlertId(null);
    }
  };

  const t = translations[language];

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        toggleLanguage,
        currentScreen,
        setCurrentScreen,
        activeTab,
        setActiveTab,
        profile,
        updateProfile,
        complaints,
        addComplaint,
        alertActive,
        alertType,
        activeAlertId,
        triggerEmergencyAlert,
        cancelEmergencyAlert,
        isMobileFrame,
        setIsMobileFrame,
        isBackendConnected,
        t
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
