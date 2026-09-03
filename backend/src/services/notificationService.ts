export interface FormattedNotification {
  channel: 'whatsapp' | 'sms';
  sender: string;
  recipient: string;
  room: string;
  residentNameEn: string;
  residentNameTa: string;
  time: string;
  location: string;
  medicalInfo: string;
  sharedWith: string;
  mapLink: string;
  status: string;
}

export class NotificationService {
  public static formatWhatsAppPayload(alert: {
    room: string;
    residentNameEn: string;
    residentNameTa: string;
    medicalInfo: string;
    location: string;
  }): FormattedNotification {
    return {
      channel: 'whatsapp',
      sender: 'SeniorSphere Verified Care System',
      recipient: 'Duty Doctor, Duty Nurse, Emergency Family Contacts',
      room: alert.room,
      residentNameEn: alert.residentNameEn,
      residentNameTa: alert.residentNameTa,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      location: alert.location,
      medicalInfo: alert.medicalInfo,
      sharedWith: 'Staff, Doctor, Family (3/5)',
      mapLink: `https://maps.google.com/?q=${encodeURIComponent(alert.location)}`,
      status: 'SENT'
    };
  }

  public static formatSmsPayload(alert: {
    room: string;
    residentNameEn: string;
  }): FormattedNotification {
    return {
      channel: 'sms',
      sender: 'SENIOR-SPHERE',
      recipient: 'All Registered Emergency Contacts',
      room: alert.room,
      residentNameEn: alert.residentNameEn,
      residentNameTa: '',
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      location: alert.room,
      medicalInfo: '',
      sharedWith: 'Emergency Contacts',
      mapLink: '',
      status: 'DELIVERED'
    };
  }
}
