import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';
import { triggerHaptic } from '../../services/haptics';
import type { ScreenId } from '../../types';

export const MobileHeader: React.FC = () => {
  const {
    currentScreen,
    setCurrentScreen,
    language,
    toggleLanguage,
    isBackendConnected
  } = useApp();

  const [screenModalVisible, setScreenModalVisible] = useState(false);

  const screensMeta: Array<{ id: ScreenId; en: string; ta: string }> = [
    { id: 1, en: '1. Onboarding', ta: '1. வரவேற்பு' },
    { id: 2, en: '2. Add Resident Profile', ta: '2. குடியிருப்பு சுயவிவரம்' },
    { id: 3, en: '3. Emergency Alert', ta: '3. அவசர எச்சரிக்கை' },
    { id: 4, en: '4. Alert in Progress', ta: '4. அலர்ட் செயல்பாட்டில்' },
    { id: 5, en: '5. Notification Sent', ta: '5. அறிவிப்பு அனுப்பப்பட்டது' },
    { id: 6, en: '6. Raise Complaint', ta: '6. புகார் பதிவு' },
    { id: 7, en: '7. Complaint Status', ta: '7. புகார் நிலை' },
    { id: 8, en: '8. Entertainment Hub', ta: '8. பொழுதுபோக்கு மையம்' },
    { id: 9, en: '9. Daily Activities', ta: '9. தினசரி செயல்பாடுகள்' },
    { id: 10, en: '10. Certification & Counselling', ta: '10. சான்றிதழ் ஆலோசனை' },
    { id: 11, en: '11. Services Directory', ta: '11. சேவைகள் பட்டியல்' },
    { id: 12, en: '12. Profile & Settings', ta: '12. சுயவிவரம் & அமைப்புகள்' },
    { id: 13, en: '13. My Community', ta: '13. என் சமூகம்' },
  ];

  const currentScreenMeta = screensMeta.find(s => s.id === currentScreen) || screensMeta[0];

  const handleSelectScreen = (id: ScreenId) => {
    triggerHaptic('selection');
    setCurrentScreen(id);
    setScreenModalVisible(false);
  };

  const handleBack = () => {
    triggerHaptic('light');
    if (currentScreen === 2 || currentScreen === 3 || currentScreen === 9) {
      setCurrentScreen(1);
    } else if (currentScreen === 4 || currentScreen === 5) {
      setCurrentScreen(3);
    } else if (currentScreen === 6 || currentScreen === 7 || currentScreen === 10) {
      setCurrentScreen(11);
    } else {
      setCurrentScreen(9);
    }
  };

  const handleLanguageToggle = () => {
    triggerHaptic('selection');
    toggleLanguage();
  };

  return (
    <>
      <View style={styles.headerContainer}>
        {/* Left: Back Button (if not on Screen 1) */}
        <View style={styles.leftContainer}>
          {currentScreen !== 1 ? (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={handleBack}
              accessibilityRole="button"
              accessibilityLabel="Back"
            >
              <Ionicons name="chevron-back" size={24} color="#0F766E" />
            </TouchableOpacity>
          ) : (
            <View style={styles.iconButtonPlaceholder}>
              <Ionicons name="shield-checkmark" size={22} color="#0D9488" />
            </View>
          )}

          {/* Quick Screen Drawer Trigger */}
          <TouchableOpacity
            style={styles.screenSelectorPill}
            onPress={() => {
              triggerHaptic('selection');
              setScreenModalVisible(true);
            }}
            accessibilityRole="button"
            accessibilityLabel="Screen switcher"
          >
            <Text style={styles.screenTitleText} numberOfLines={1}>
              {language === 'ta' ? currentScreenMeta.ta : currentScreenMeta.en}
            </Text>
            <Ionicons name="chevron-down" size={14} color="#64748B" />
          </TouchableOpacity>
        </View>

        {/* Right: Backend connectivity pill & Language Toggle */}
        <View style={styles.rightContainer}>
          {/* Connectivity Pill */}
          <View
            style={[
              styles.connectionPill,
              isBackendConnected ? styles.connectedPill : styles.disconnectedPill
            ]}
          >
            <View
              style={[
                styles.statusDot,
                isBackendConnected ? styles.connectedDot : styles.disconnectedDot
              ]}
            />
            <Text
              style={[
                styles.statusText,
                isBackendConnected ? styles.connectedText : styles.disconnectedText
              ]}
            >
              {isBackendConnected ? 'Online' : 'Offline'}
            </Text>
          </View>

          {/* Language Switcher */}
          <TouchableOpacity
            style={styles.langButton}
            onPress={handleLanguageToggle}
            accessibilityRole="button"
            accessibilityLabel="Toggle Language"
          >
            <Ionicons name="globe-outline" size={15} color="#0F766E" />
            <Text style={styles.langText}>
              {language === 'en' ? 'தமிழ்' : 'EN'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Screen Selection Modal */}
      <Modal
        visible={screenModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setScreenModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setScreenModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {language === 'ta' ? 'திரை வழிசெலுத்தல்' : 'Navigate Screens'}
              </Text>
              <TouchableOpacity
                onPress={() => setScreenModalVisible(false)}
                style={styles.closeModalButton}
              >
                <Ionicons name="close" size={20} color="#64748B" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={screensMeta}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => {
                const isSelected = item.id === currentScreen;
                return (
                  <TouchableOpacity
                    style={[
                      styles.screenItem,
                      isSelected ? styles.screenItemSelected : null
                    ]}
                    onPress={() => handleSelectScreen(item.id)}
                  >
                    <Text
                      style={[
                        styles.screenItemText,
                        isSelected ? styles.screenItemTextSelected : null
                      ]}
                    >
                      {language === 'ta' ? item.ta : item.en}
                    </Text>
                    {isSelected && (
                      <Ionicons name="checkmark-circle" size={18} color="#0F766E" />
                    )}
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    paddingHorizontal: 12,
    paddingVertical: 10,
    minHeight: 56,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3
      },
      android: {
        elevation: 2
      }
    })
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 6
  },
  iconButton: {
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#F1F5F9'
  },
  iconButtonPlaceholder: {
    minWidth: 38,
    minHeight: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#F0FDFA'
  },
  screenSelectorPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 16,
    flexShrink: 1,
    gap: 4
  },
  screenTitleText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
    maxWidth: 150
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  connectionPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    gap: 4
  },
  connectedPill: {
    backgroundColor: '#ECFDF5'
  },
  disconnectedPill: {
    backgroundColor: '#FFFBEB'
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3
  },
  connectedDot: {
    backgroundColor: '#10B981'
  },
  disconnectedDot: {
    backgroundColor: '#F59E0B'
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700'
  },
  connectedText: {
    color: '#065F46'
  },
  disconnectedText: {
    color: '#92400E'
  },
  langButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDFA',
    borderWidth: 1,
    borderColor: '#CCFBF1',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 14,
    minHeight: 36,
    gap: 4
  },
  langText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F766E'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: 20
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    maxHeight: '75%',
    padding: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 12,
    marginBottom: 8
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A'
  },
  closeModalButton: {
    padding: 4
  },
  screenItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
    borderRadius: 8
  },
  screenItemSelected: {
    backgroundColor: '#F0FDFA'
  },
  screenItemText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155'
  },
  screenItemTextSelected: {
    fontWeight: '800',
    color: '#0F766E'
  }
});
