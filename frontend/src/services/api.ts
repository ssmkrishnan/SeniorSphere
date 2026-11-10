const API_BASE_URL = 'http://localhost:5001/api';
const WS_BASE_URL = 'ws://localhost:5001/ws';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  notifications?: {
    whatsapp: any;
    sms: any;
  };
}

export const api = {
  // 1. Health Check
  async checkHealth(): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE_URL}/health`);
      return res.ok;
    } catch {
      return false;
    }
  },

  // 2. Resident Profile (Screens 2 & 12)
  async getProfile(): Promise<any | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/resident/profile`);
      if (!res.ok) return null;
      const json: ApiResponse<any> = await res.json();
      return json.data;
    } catch (e) {
      console.warn('[API] Could not fetch profile from backend, using local state.', e);
      return null;
    }
  },

  async updateProfile(updates: any): Promise<any | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/resident/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      if (!res.ok) return null;
      const json: ApiResponse<any> = await res.json();
      return json.data;
    } catch (e) {
      console.warn('[API] Could not update profile on backend.', e);
      return null;
    }
  },

  // 3. Emergency SOS (Screens 3, 4, 5)
  async triggerAlert(type: 'sos' | 'medical' | 'staff' = 'sos'): Promise<any | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/emergency/alert`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type })
      });
      if (!res.ok) return null;
      const json: ApiResponse<any> = await res.json();
      return json;
    } catch (e) {
      console.warn('[API] Could not trigger backend alert, using local dispatcher.', e);
      return null;
    }
  },

  async getActiveAlert(): Promise<any | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/emergency/active`);
      if (!res.ok) return null;
      const json: ApiResponse<any> = await res.json();
      return json.data;
    } catch (e) {
      console.warn('[API] Could not fetch active alert from backend.', e);
      return null;
    }
  },

  async cancelAlert(alertId: string): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE_URL}/emergency/${alertId}/cancel`, {
        method: 'POST'
      });
      return res.ok;
    } catch (e) {
      console.warn('[API] Could not cancel alert on backend.', e);
      return false;
    }
  },

  async acknowledgeAlert(alertId: string, staffData: { staffNameEn?: string; staffNameTa?: string; roleEn?: string; roleTa?: string }): Promise<any | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/emergency/${alertId}/acknowledge`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(staffData)
      });
      if (!res.ok) return null;
      const json: ApiResponse<any> = await res.json();
      return json.data;
    } catch (e) {
      console.warn('[API] Could not acknowledge alert on backend.', e);
      return null;
    }
  },

  // 4. Complaints & Requests (Screens 6 & 7)
  async getComplaints(status?: string): Promise<any[] | null> {
    try {
      const url = status && status !== 'all' ? `${API_BASE_URL}/complaints?status=${status}` : `${API_BASE_URL}/complaints`;
      const res = await fetch(url);
      if (!res.ok) return null;
      const json: ApiResponse<any[]> = await res.json();
      return json.data;
    } catch (e) {
      console.warn('[API] Could not fetch complaints from backend.', e);
      return null;
    }
  },

  async createComplaint(data: any): Promise<any | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/complaints`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) return null;
      const json: ApiResponse<any> = await res.json();
      return json.data;
    } catch (e) {
      console.warn('[API] Could not save complaint to backend.', e);
      return null;
    }
  },

  async updateComplaintStatus(id: string, status: string): Promise<any | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/complaints/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (!res.ok) return null;
      const json: ApiResponse<any> = await res.json();
      return json.data;
    } catch (e) {
      console.warn('[API] Could not update complaint status on backend.', e);
      return null;
    }
  },

  // 5. Daily Activities (Screen 9)
  async getTodayActivities(): Promise<any[] | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/activities/today`);
      if (!res.ok) return null;
      const json: ApiResponse<any[]> = await res.json();
      return json.data;
    } catch (e) {
      console.warn('[API] Could not fetch activities from backend.', e);
      return null;
    }
  },

  // 6. Services & Counselling (Screens 10 & 11)
  async requestService(serviceType: string, notes?: string): Promise<any | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/services/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serviceType, notes })
      });
      if (!res.ok) return null;
      const json: ApiResponse<any> = await res.json();
      return json.data;
    } catch (e) {
      console.warn('[API] Could not submit service request to backend.', e);
      return null;
    }
  },

  async requestCounselling(categoryKey: string, notes?: string): Promise<any | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/services/counselling/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categoryKey, notes })
      });
      if (!res.ok) return null;
      const json: ApiResponse<any> = await res.json();
      return json.data;
    } catch (e) {
      console.warn('[API] Could not submit counselling request to backend.', e);
      return null;
    }
  },

  // 7. Entertainment (Screen 8)
  async getEntertainmentModules(): Promise<any[] | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/entertainment/modules`);
      if (!res.ok) return null;
      const json: ApiResponse<any[]> = await res.json();
      return json.data;
    } catch (e) {
      console.warn('[API] Could not fetch entertainment modules.', e);
      return null;
    }
  },

  // 8. Community (Screen 13)
  async getBirthdays(): Promise<any[] | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/community/birthdays`);
      if (!res.ok) return null;
      const json: ApiResponse<any[]> = await res.json();
      return json.data;
    } catch (e) {
      console.warn('[API] Could not fetch birthdays from backend.', e);
      return null;
    }
  },

  async getGallery(): Promise<any[] | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/community/gallery`);
      if (!res.ok) return null;
      const json: ApiResponse<any[]> = await res.json();
      return json.data;
    } catch (e) {
      console.warn('[API] Could not fetch gallery from backend.', e);
      return null;
    }
  },

  // 9. WebSocket for real-time SOS
  connectEmergencySocket(onMessage: (data: any) => void): WebSocket | null {
    try {
      const ws = new WebSocket(WS_BASE_URL);
      ws.onmessage = (event) => {
        try {
          const parsed = JSON.parse(event.data);
          onMessage(parsed);
        } catch {
          // ignore parsing error
        }
      };
      return ws;
    } catch {
      return null;
    }
  }
};
