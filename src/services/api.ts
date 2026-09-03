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
  // Check backend health
  async checkHealth(): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE_URL}/health`);
      return res.ok;
    } catch {
      return false;
    }
  },

  // Resident Profile
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
      console.warn('[API] Could not update profile to backend, updated local state.', e);
      return null;
    }
  },

  // Emergency SOS
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

  // Complaints
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

  // Activities
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

  // WebSocket for real-time SOS
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
