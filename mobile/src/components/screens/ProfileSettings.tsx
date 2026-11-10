import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Modal,
  Linking,
  Platform,
  Alert
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';
import { triggerHaptic } from '../../services/haptics';

export const ProfileSettings: React.FC = () => {
  const { t, language, setLanguage, profile, setCurrentScreen } = useApp();
  const [showLanguageModal, setShowLanguageModal] = useState<boolean>(false);
  const [showAboutModal, setShowAboutModal] = useState<boolean>(false);

  const handleDialNumber = (phoneNumber: string) => {
    triggerHaptic('heavy');
    Linking.openURL(`tel:${phoneNumber}`).catch(() => {
      Alert.alert('Phone Call', `Dialing ${phoneNumber}`);
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Resident Identity Card (Tap to edit profile Screen 2) */}
      <TouchableOpacity
        style={styles.profileHeroCard}
        activeOpacity={0.85}
        onPress={() => {
          triggerHaptic('medium');
          setCurrentScreen(2);
        }}
      >
        <View style={styles.avatarWrap}>
          <Image
            source={{ uri: profile.avatarUrl }}
            style={styles.avatarImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.profileTextWrap}>
          <Text style={styles.residentName}>
            {profile.name || (language === 'ta' ? 'குடியிருப்பாளர்' : 'Resident Name')}
          </Text>
          <Text style={styles.roomBadge}>
            {profile.room ? `${profile.room}, ${profile.block}` : 'Room 204, Block B'}
          </Text>
          <Text style={styles.editProfilePrompt}>
            {language === 'ta' ? 'விவரங்களைத் தொகுக்க தட்டவும் →' : 'Tap to edit medical profile →'}
          </Text>
        </View>

        <Ionicons name="chevron-forward" size={24} color="#CCFBF1" />
      </TouchableOpacity>

      {/* Settings Navigation List */}
      <View style={styles.menuContainer}>
        {/* Personal Profile */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            triggerHaptic('light');
            setCurrentScreen(2);
          }}
        >
          <View style={[styles.menuIconBox, { backgroundColor: '#F0FDFA' }]}>
            <Ionicons name="person" size={20} color="#0F766E" />
          </View>
          <Text style={styles.menuItemText}>{t.profileSettings.menu.personalProfile}</Text>
          <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
        </TouchableOpacity>

        {/* Health Records */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            triggerHaptic('light');
            setCurrentScreen(2);
          }}
        >
          <View style={[styles.menuIconBox, { backgroundColor: '#FEE2E2' }]}>
            <Ionicons name="heart" size={20} color="#DC2626" />
          </View>
          <Text style={styles.menuItemText}>{t.profileSettings.menu.healthRecords}</Text>
          <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
        </TouchableOpacity>

        {/* Language Selection */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            triggerHaptic('selection');
            setShowLanguageModal(true);
          }}
        >
          <View style={[styles.menuIconBox, { backgroundColor: '#EFF6FF' }]}>
            <Ionicons name="globe" size={20} color="#2563EB" />
          </View>
          <View style={styles.menuTextWithSub}>
            <Text style={styles.menuItemText}>{t.profileSettings.menu.language}</Text>
            <Text style={styles.menuItemSub}>
              {language === 'en' ? 'English (ஆங்கிலம்)' : 'தமிழ் (Tamil)'}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
        </TouchableOpacity>

        {/* Entertainment Hub Shortcut */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            triggerHaptic('light');
            setCurrentScreen(8);
          }}
        >
          <View style={[styles.menuIconBox, { backgroundColor: '#F3E8FF' }]}>
            <Ionicons name="musical-notes" size={20} color="#9333EA" />
          </View>
          <Text style={styles.menuItemText}>{t.entertainment.title}</Text>
          <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
        </TouchableOpacity>

        {/* About App & Version */}
        <TouchableOpacity
          style={[styles.menuItem, styles.noBorder]}
          onPress={() => {
            triggerHaptic('light');
            setShowAboutModal(true);
          }}
        >
          <View style={[styles.menuIconBox, { backgroundColor: '#F1F5F9' }]}>
            <Ionicons name="information-circle" size={20} color="#475569" />
          </View>
          <Text style={styles.menuItemText}>{t.profileSettings.menu.about}</Text>
          <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
        </TouchableOpacity>
      </View>

      {/* Quick Emergency Phone Dialer Buttons */}
      <View style={styles.emergencyDialSection}>
        <Text style={styles.emergencyDialHeader}>
          {language === 'ta' ? 'அவசர தொலைபேசி தொடர்புகள்' : 'Direct Emergency Help Contacts'}
        </Text>

        <View style={styles.dialButtonsRow}>
          {/* Duty Nurse */}
          <TouchableOpacity
            style={styles.dialButtonRed}
            activeOpacity={0.8}
            onPress={() => handleDialNumber('+919876543210')}
          >
            <Ionicons name="call" size={22} color="#FFFFFF" />
            <Text style={styles.dialButtonText}>
              {language === 'ta' ? 'செவிலியர் அழைப்பு' : 'Duty Nurse\n+91 98765 43210'}
            </Text>
          </TouchableOpacity>

          {/* Security Desk */}
          <TouchableOpacity
            style={styles.dialButtonAmber}
            activeOpacity={0.8}
            onPress={() => handleDialNumber('+919876543211')}
          >
            <Ionicons name="shield-checkmark" size={22} color="#FFFFFF" />
            <Text style={styles.dialButtonText}>
              {language === 'ta' ? 'பாதுகாப்பு மையம்' : 'Security Desk\n+91 98765 43211'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Version Card */}
      <View style={styles.versionFooter}>
        <Text style={styles.versionText}>SeniorSphere Mobile Edition v1.0.0</Text>
        <Text style={styles.copyrightText}>
          Connected Care & Elderly Ergonomics • Coimbatore & Chennai
        </Text>
      </View>

      {/* Language Selector Modal */}
      <Modal
        visible={showLanguageModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLanguageModal(false)}
      >
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={() => setShowLanguageModal(false)}
        >
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>
              {language === 'ta' ? 'மொழியைத் தேர்ந்தெடுக்கவும்' : 'Select Preferred Language'}
            </Text>

            <TouchableOpacity
              style={[styles.langOption, language === 'en' ? styles.langOptionSelected : null]}
              onPress={() => {
                triggerHaptic('selection');
                setLanguage('en');
                setShowLanguageModal(false);
              }}
            >
              <Text style={styles.langOptionText}>English (ஆங்கிலம்)</Text>
              {language === 'en' && <Ionicons name="checkmark-circle" size={22} color="#0F766E" />}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.langOption, language === 'ta' ? styles.langOptionSelected : null]}
              onPress={() => {
                triggerHaptic('selection');
                setLanguage('ta');
                setShowLanguageModal(false);
              }}
            >
              <Text style={styles.langOptionText}>தமிழ் (Tamil)</Text>
              {language === 'ta' && <Ionicons name="checkmark-circle" size={22} color="#0F766E" />}
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* About Modal */}
      <Modal
        visible={showAboutModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowAboutModal(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalBox}>
            <Ionicons name="shield-checkmark" size={48} color="#0F766E" />
            <Text style={styles.modalTitle}>SeniorSphere</Text>
            <Text style={styles.aboutVersion}>Version 1.0.0 (Production Build)</Text>
            <Text style={styles.aboutDesc}>
              SeniorSphere is an elder-first digital living platform designed to ensure peace of
              mind, dignity, fast medical emergency dispatch, and joyful living.
            </Text>
            <TouchableOpacity
              style={styles.aboutCloseBtn}
              onPress={() => setShowAboutModal(false)}
            >
              <Text style={styles.aboutCloseBtnText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 36,
    backgroundColor: '#F8FAFC',
    gap: 16
  },
  profileHeroCard: {
    backgroundColor: '#0F766E',
    borderRadius: 24,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    ...Platform.select({
      ios: {
        shadowColor: '#0F766E',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8
      },
      android: {
        elevation: 6
      }
    })
  },
  avatarWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    overflow: 'hidden',
    backgroundColor: '#115E59'
  },
  avatarImage: {
    width: '100%',
    height: '100%'
  },
  profileTextWrap: {
    flex: 1
  },
  residentName: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF'
  },
  roomBadge: {
    fontSize: 13,
    fontWeight: '700',
    color: '#CCFBF1',
    marginTop: 2
  },
  editProfilePrompt: {
    fontSize: 11,
    color: '#99F6E4',
    marginTop: 4,
    fontWeight: '600'
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden'
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    minHeight: 56,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    gap: 14
  },
  noBorder: {
    borderBottomWidth: 0
  },
  menuIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  menuItemText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B'
  },
  menuTextWithSub: {
    flex: 1
  },
  menuItemSub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2
  },
  emergencyDialSection: {
    gap: 10
  },
  emergencyDialHeader: {
    fontSize: 13,
    fontWeight: '800',
    color: '#475569',
    textTransform: 'uppercase'
  },
  dialButtonsRow: {
    flexDirection: 'row',
    gap: 12
  },
  dialButtonRed: {
    flex: 1,
    backgroundColor: '#DC2626',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 12,
    minHeight: 64,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#DC2626',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 6
      },
      android: {
        elevation: 4
      }
    })
  },
  dialButtonAmber: {
    flex: 1,
    backgroundColor: '#D97706',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 12,
    minHeight: 64,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#D97706',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 6
      },
      android: {
        elevation: 4
      }
    })
  },
  dialButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    lineHeight: 16,
    flex: 1
  },
  versionFooter: {
    alignItems: 'center',
    paddingVertical: 16
  },
  versionText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B'
  },
  copyrightText: {
    fontSize: 11,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 4
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20
  },
  modalBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    gap: 12
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center'
  },
  langOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC'
  },
  langOptionSelected: {
    borderColor: '#0F766E',
    backgroundColor: '#F0FDFA'
  },
  langOptionText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B'
  },
  aboutVersion: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600'
  },
  aboutDesc: {
    fontSize: 13,
    color: '#334155',
    textAlign: 'center',
    lineHeight: 19
  },
  aboutCloseBtn: {
    backgroundColor: '#0F766E',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 12,
    marginTop: 8
  },
  aboutCloseBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800'
  }
});
