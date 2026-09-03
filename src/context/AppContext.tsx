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
  updateProfile: (data: Partial<ResidentProfile>) => Promise<void>;
  complaints: Complaint[];
  addComplaint: (data: Omit<Complaint, 'id' | 'date' | 'status'>) => Promise<void>;
  updateComplaintStatus: (id: string, status: 'open' | 'in_progress' | 'resolved') => Promise<void>;
  alertActive: boolean;
  alertType: 'sos' | 'medical' | 'staff';
  activeAlertId: string | null;
  triggerEmergencyAlert: (type?: 'sos' | 'medical' | 'staff') => Promise<void>;
  cancelEmergencyAlert: () => Promise<void>;
  isMobileFrame: boolean;
  setIsMobileFrame: (val: boolean) => void;
  isBackendConnected: boolean;
  t: typeof translations['en'];
}

// Clean empty profile - everything works based on user input
const emptyProfile: ResidentProfile = {
  name: '',
  dob: '',
  gender: 'Female',
  bloodGroup: 'B+',
  medicalConditions: '',
  allergies: '',
  currentMedications: '',
  room: '',
  block: '',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [currentScreen, setCurrentScreen] = useState<ScreenId>(1);
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(true);
  const [alertActive, setAlertActive] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<'sos' | 'medical' | 'staff'>('sos');
  const [activeAlertId, setActiveAlertId] = useState<string | null>(null);
  
  // Clean initial state - strictly driven by user input
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [profile, setProfile] = useState<ResidentProfile>(emptyProfile);
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
        
        // 1. Fetch user-entered profile from PostgreSQL
        const backendProfile = await api.getProfile();
        if (backendProfile && backendProfile.nameEn && mounted) {
          setProfile({
            name: language === 'ta' && backendProfile.nameTa ? backendProfile.nameTa : backendProfile.nameEn,
            dob: backendProfile.dob || '',
            gender: backendProfile.gender || '',
            bloodGroup: backendProfile.bloodGroup || 'B+',
            medicalConditions: backendProfile.medicalConditions || '',
            allergies: backendProfile.allergies || '',
            currentMedications: backendProfile.currentMedications || '',
            room: backendProfile.room || '',
            block: backendProfile.block || '',
            avatarUrl: backendProfile.avatarUrl || emptyProfile.avatarUrl
          });
        }

        // 2. Fetch user-created complaints from PostgreSQL
        const backendComplaints = await api.getComplaints();
        if (backendComplaints && mounted) {
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
  };

  const toggleLanguage = () => {
    handleSetLanguage(language === 'en' ? 'ta' : 'en');
  };

  // Update profile from user form input and persist to PostgreSQL
  const updateProfile = async (data: Partial<ResidentProfile>) => {
    setProfile(prev => ({ ...prev, ...data }));
    
    await api.updateProfile({
      nameEn: data.name || profile.name,
      nameTa: language === 'ta' ? data.name : profile.name,
      dob: data.dob !== undefined ? data.dob : profile.dob,
      gender: data.gender !== undefined ? data.gender : profile.gender,
      bloodGroup: data.bloodGroup !== undefined ? data.bloodGroup : profile.bloodGroup,
      medicalConditions: data.medicalConditions !== undefined ? data.medicalConditions : profile.medicalConditions,
      allergies: data.allergies !== undefined ? data.allergies : profile.allergies,
      currentMedications: data.currentMedications !== undefined ? data.currentMedications : profile.currentMedications,
      room: data.room !== undefined ? data.room : profile.room,
      block: data.block !== undefined ? data.block : profile.block
    });
  };

  // Add complaint from user form input and persist to PostgreSQL
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

  // Toggle or update complaint status in PostgreSQL
  const updateComplaintStatus = async (id: string, status: 'open' | 'in_progress' | 'resolved') => {
    setComplaints(prev => prev.map(c => c.id === id ? { ...c, status } : c));
    await api.updateComplaintStatus(id, status);
  };

  // Trigger emergency alert with current user details
  const triggerEmergencyAlert = async (type: 'sos' | 'medical' | 'staff' = 'sos') => {
    setAlertType(type);
    setAlertActive(true);
    setCurrentScreen(4); // Move directly to Screen 4 (Alert in Progress)

    const response = await api.triggerAlert(type);
    if (response && response.data) {
      setActiveAlertId(response.data.id);
    }
  };

  // Cancel emergency alert
  const cancelEmergencyAlert = async () => {
    setAlertActive(false);
    setCurrentScreen(3); // Return to Emergency Alert screen

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
        updateComplaintStatus,
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
