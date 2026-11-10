export const colors = {
  // Brand Teal Palette
  primary: '#0d9488',       // Teal 600
  primaryDark: '#0f766e',   // Teal 700
  primaryLight: '#ccfbf1',  // Teal 100
  primaryMuted: '#f0fdfa',  // Teal 50

  // Emergency / Danger Palette
  danger: '#ef4444',        // Red 500
  dangerDark: '#b91c1c',    // Red 700
  dangerLight: '#fee2e2',   // Red 100
  dangerMuted: '#fef2f2',   // Red 50

  // Warning / Attention Palette
  warning: '#f59e0b',       // Amber 500
  warningDark: '#d97706',   // Amber 600
  warningLight: '#fef3c7',  // Amber 100

  // Success Palette
  success: '#10b981',       // Emerald 500
  successLight: '#d1fae5',  // Emerald 100

  // Backgrounds & Surfaces
  bgDark: '#0f172a',        // Slate 900
  bgCard: '#ffffff',        // White
  bgPage: '#f8fafc',        // Slate 50
  bgSubtle: '#f1f5f9',      // Slate 100

  // Typography
  textPrimary: '#0f172a',   // Slate 900
  textSecondary: '#64748b', // Slate 500
  textMuted: '#94a3b8',     // Slate 400
  textLight: '#ffffff',     // White

  // Borders & Dividers
  border: '#e2e8f0',        // Slate 200
  borderDark: '#cbd5e1',    // Slate 300
} as const;

export type Colors = typeof colors;
export default colors;
