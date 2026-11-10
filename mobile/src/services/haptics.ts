import * as Haptics from 'expo-haptics';

export const triggerHaptic = async (
  type: 'light' | 'medium' | 'heavy' | 'selection' = 'light'
) => {
  try {
    switch (type) {
      case 'light':
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        break;
      case 'medium':
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        break;
      case 'heavy':
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        break;
      case 'selection':
        await Haptics.selectionAsync();
        break;
    }
  } catch {
    // Ignore haptic failures gracefully on web or unsupported devices
  }
};
