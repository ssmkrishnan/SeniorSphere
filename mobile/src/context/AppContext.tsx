import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Language, ScreenId, TabId, ResidentProfile, Complaint, ComplaintStatus } from '../types';
import { translations } from '../i18n/translations';
import { api } from '../services/api';

export interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: typeof translations['en'];
  currentScreen: ScreenId;
  setCurrentScreen: (screen: ScreenId) => void;
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
  profile: ResidentProfile;
  setProfile: React.Dispatch<React.SetStateAction<ResidentProfile>>;
  updateProfileLocal: (data: Partial<ResidentProfile>) => void;
  updateProfile: (data: Partial<ResidentProfile>) => Promise<void>;
  complaints: Complaint[];
  setComplaints: React.Dispatch<React.SetStateAction<Complaint[]>>;
  addComplaint: (data: Omit<Complaint, 'id' | 'date' | 'status'>) => Promise<void>;
  updateComplaintStatusLocal: (id: string, status: ComplaintStatus) => void;
  updateComplaintStatus: (id: string, status: ComplaintStatus) => Promise<void>;
  alertActive: boolean;
  setAlertActive: React.Dispatch<React.SetStateAction<boolean>>;
  alertType: 'sos' | 'medical' | 'staff';
  setAlertType: React.Dispatch<React.SetStateAction<'sos' | 'medical' | 'staff'>>;
  activeAlertId: string | null;
  setActiveAlertId: React.Dispatch<React.SetStateAction<string | null>>;
  triggerEmergencyAlert: (type?: 'sos' | 'medical' | 'staff') => Promise<void>;
  cancelEmergencyAlert: () => Promise<void>;
  isBackendConnected: boolean;
  refreshBackendState: () => Promise<void>;
}

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
  const [profile, setProfile] = useState<ResidentProfile>(emptyProfile);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [alertActive, setAlertActive] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<'sos' | 'medical' | 'staff'>('sos');
  const [activeAlertId, setActiveAlertId] = useState<string | null>(null);
  const [isBackendConnected, setIsBackendConnected] = useState<boolean>(false);

  const syncBackend = async () => {
    try {
      const isHealthy = await api.checkHealth();
      setIsBackendConnected(isHealthy);

      if (isHealthy) {
        console.log('[SeniorSphere Mobile] Backend detected. Syncing state...');

        // 1. Fetch Profile
        const backendProfile = await api.getProfile();
        if (backendProfile && backendProfile.nameEn) {
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

        // 2. Fetch Complaints
        const backendComplaints = await api.getComplaints();
        if (backendComplaints) {
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

        // 3. Check Active Alert
        const activeAlert = await api.getActiveAlert();
        if (activeAlert) {
          setActiveAlertId(activeAlert.id);
          setAlertActive(true);
          setAlertType(activeAlert.type || 'sos');
        }
      }
    } catch (err) {
      console.warn('[SeniorSphere Mobile] Backend sync failed, running in offline mode.', err);
    }
  };

  useEffect(() => {
    let mounted = true;

    syncBackend();

    // Connect WebSocket for real-time SOS broadcasts
    const ws = api.connectEmergencySocket((data) => {
      if (!mounted) return;
      console.log('[WebSocket Event]:', data);
      if (data.event === 'EMERGENCY_ALERT_TRIGGERED') {
        setAlertActive(true);
        if (data.alert?.id) {
          setActiveAlertId(data.alert.id);
        }
        if (data.alert?.type) {
          setAlertType(data.alert.type);
        }
      } else if (data.event === 'EMERGENCY_ALERT_CANCELLED') {
        setAlertActive(false);
        setActiveAlertId(null);
      } else if (data.event === 'EMERGENCY_ALERT_ACKNOWLEDGED') {
        console.log('[WebSocket Alert Acknowledged]:', data.staff);
      }
    });

    return () => {
      mounted = false;
      if (ws) {
        ws.close();
      }
    };
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'ta' : 'en'));
  };

  const updateProfileLocal = (data: Partial<ResidentProfile>) => {
    setProfile(prev => ({ ...prev, ...data }));
  };

  const updateProfile = async (data: Partial<ResidentProfile>) => {
    updateProfileLocal(data);
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

  const addComplaint = async (data: Omit<Complaint, 'id' | 'date' | 'status'>) => {
    const tempId = `C-${Date.now().toString().slice(-4)}`;
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

    const saved = await api.createComplaint(data);
    if (saved && saved.id) {
      setComplaints(prev => prev.map(c => (c.id === tempId ? { ...c, id: saved.id } : c)));
    }
  };

  const updateComplaintStatusLocal = (id: string, status: ComplaintStatus) => {
    setComplaints(prev => prev.map(c => (c.id === id ? { ...c, status } : c)));
  };

  const updateComplaintStatus = async (id: string, status: ComplaintStatus) => {
    updateComplaintStatusLocal(id, status);
    await api.updateComplaintStatus(id, status);
  };

  const triggerEmergencyAlert = async (type: 'sos' | 'medical' | 'staff' = 'sos') => {
    setAlertType(type);
    setAlertActive(true);
    setCurrentScreen(4); // Move to Alert in Progress

    const response = await api.triggerAlert(type);
    if (response && response.data) {
      setActiveAlertId(response.data.id);
    }
  };

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
        setLanguage,
        toggleLanguage,
        t,
        currentScreen,
        setCurrentScreen,
        activeTab,
        setActiveTab,
        profile,
        setProfile,
        updateProfileLocal,
        updateProfile,
        complaints,
        setComplaints,
        addComplaint,
        updateComplaintStatusLocal,
        updateComplaintStatus,
        alertActive,
        setAlertActive,
        alertType,
        setAlertType,
        activeAlertId,
        setActiveAlertId,
        triggerEmergencyAlert,
        cancelEmergencyAlert,
        isBackendConnected,
        refreshBackendState: syncBackend
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
