export type Language = 'en' | 'ta';

export type ScreenId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;

export type TabId = 'home' | 'community' | 'alert' | 'services' | 'more';

export interface ResidentProfile {
  name: string;
  dob: string;
  gender: string;
  bloodGroup: string;
  medicalConditions: string;
  allergies: string;
  currentMedications: string;
  room: string;
  block: string;
  avatarUrl: string;
}

export type ComplaintStatus = 'open' | 'in_progress' | 'resolved';

export interface Complaint {
  id: string;
  categoryKey: string;
  titleEn: string;
  titleTa: string;
  date: string;
  status: ComplaintStatus;
  descriptionEn: string;
  descriptionTa: string;
  photoUrl?: string;
}

export interface Activity {
  id: string;
  time: string;
  titleEn: string;
  titleTa: string;
  locationEn: string;
  locationTa: string;
  category: string;
}

export interface CounsellingService {
  id: string;
  titleEn: string;
  titleTa: string;
  descEn: string;
  descTa: string;
  iconName: string;
}

export interface ServiceItem {
  id: string;
  titleEn: string;
  titleTa: string;
  iconName: string;
}

export interface EntertainmentModule {
  id: string;
  nameEn: string;
  nameTa: string;
  iconName: string;
  colorClass: string;
  bgClass: string;
}

export interface StaffAcknowledgement {
  nameEn: string;
  nameTa: string;
  roleEn: string;
  roleTa: string;
  time: string;
}

export interface EmergencyNotification {
  room: string;
  block: string;
  residentNameEn: string;
  residentNameTa: string;
  time: string;
  medicalInfoEn: string;
  medicalInfoTa: string;
  sharedWithEn: string;
  sharedWithTa: string;
  sharedCount: string;
  acknowledgedStaff: StaffAcknowledgement[];
}
