import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { BrandLogo } from '../common/BrandLogo';
import { useApp } from '../../context/AppContext';
import { triggerHaptic } from '../../services/haptics';

export const Onboarding: React.FC = () => {
  const { t, language, toggleLanguage, setCurrentScreen, profile, updateProfile } = useApp();
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [roomInput, setRoomInput] = useState<string>('');
  const [phoneInput, setPhoneInput] = useState<string>('');
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLoginSubmit = async () => {
    triggerHaptic('medium');
    if (!roomInput.trim()) {
      setLoginError(language === 'ta' ? 'அறை எண்ணை உள்ளிடவும்' : 'Please enter your Room Number');
      return;
    }

    if (!profile.room) {
      await updateProfile({
        room: roomInput.trim(),
        name: profile.name || (language === 'ta' ? 'குடியிருப்பாளர்' : 'Resident')
      });
    }

    setShowLoginModal(false);
    setCurrentScreen(9); // Navigate to Daily Activities (Home)
  };

  const handleQuickDemoLogin = async () => {
    triggerHaptic('light');
    setShowLoginModal(false);
    setCurrentScreen(9);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} bounces={false}>
      {/* Top Bar with Language Toggle */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.langPill}
          onPress={() => {
            triggerHaptic('selection');
            toggleLanguage();
          }}
          accessibilityRole="button"
          accessibilityLabel="Change Language"
        >
          <Ionicons name="globe-outline" size={16} color="#0F766E" />
          <Text style={styles.langPillText}>
            {language === 'en' ? 'தமிழ்' : 'English'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Hero Section */}
      <View style={styles.heroSection}>
        <BrandLogo
          size="lg"
          variant="vertical"
          taglineText={t.onboarding.subtitle}
        />

        {/* Serene Senior Living Image Card */}
        <View style={styles.imageCard}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&auto=format&fit=crop&q=80'
            }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.imageOverlayBadge}>
            <Ionicons name="shield-checkmark" size={14} color="#10B981" />
            <Text style={styles.imageOverlayText}>
              {language === 'ta' ? 'பாதுகாப்பான, அமைதியான அன்பு இல்லம்' : 'Safe, Serene & Caring Community'}
            </Text>
          </View>
        </View>

        {/* Value Highlights for Elders */}
        <View style={styles.highlightsRow}>
          <View style={styles.highlightBadge}>
            <MaterialCommunityIcons name="heart-pulse" size={18} color="#0D9488" />
            <Text style={styles.highlightText}>
              {language === 'ta' ? '24/7 மருத்துவ கவனிப்பு' : '24/7 Medical Care'}
            </Text>
          </View>
          <View style={styles.highlightBadge}>
            <MaterialCommunityIcons name="shield-check" size={18} color="#0D9488" />
            <Text style={styles.highlightText}>
              {language === 'ta' ? 'அவசர உதவி அலர்ட்' : 'Instant SOS Assist'}
            </Text>
          </View>
        </View>
      </View>

      {/* Action Buttons Section */}
      <View style={styles.actionsSection}>
        {/* Main Get Started Button (min 50px touch target) */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => {
            triggerHaptic('heavy');
            setCurrentScreen(2); // Go to Add Resident Profile
          }}
          accessibilityRole="button"
          accessibilityLabel={t.onboarding.getStarted}
        >
          <Text style={styles.primaryButtonText}>{t.onboarding.getStarted}</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
        </TouchableOpacity>

        {/* Existing Resident Login trigger */}
        <View style={styles.loginPromptContainer}>
          <Text style={styles.loginPromptLabel}>{t.onboarding.alreadyAccount}</Text>
          <TouchableOpacity
            style={styles.loginLinkButton}
            onPress={() => {
              triggerHaptic('light');
              setShowLoginModal(true);
            }}
          >
            <Text style={styles.loginLinkText}>{t.onboarding.login}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Login Dialog Modal */}
      <Modal
        visible={showLoginModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowLoginModal(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalBackdrop}
        >
          <View style={styles.modalBox}>
            <View style={styles.modalHeader}>
              <View style={styles.modalTitleRow}>
                <Ionicons name="log-in-outline" size={24} color="#0F766E" />
                <Text style={styles.modalTitle}>{t.onboarding.login}</Text>
              </View>
              <TouchableOpacity
                onPress={() => setShowLoginModal(false)}
                style={styles.modalCloseButton}
              >
                <Ionicons name="close" size={22} color="#64748B" />
              </TouchableOpacity>
            </View>

            {loginError && (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>{loginError}</Text>
              </View>
            )}

            {/* Room Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                {language === 'ta' ? 'அறை எண் (Room No)' : 'Room Number'} *
              </Text>
              <View style={styles.inputFieldWrapper}>
                <MaterialCommunityIcons name="door" size={20} color="#0F766E" />
                <TextInput
                  style={styles.textInput}
                  placeholder="e.g. 204 or B-12"
                  value={roomInput}
                  onChangeText={txt => {
                    setRoomInput(txt);
                    setLoginError(null);
                  }}
                  autoCapitalize="characters"
                />
              </View>
            </View>

            {/* Phone Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                {language === 'ta' ? 'மொபைல் எண் (Mobile No)' : 'Registered Mobile Number'}
              </Text>
              <View style={styles.inputFieldWrapper}>
                <Ionicons name="call-outline" size={20} color="#0F766E" />
                <TextInput
                  style={styles.textInput}
                  placeholder="e.g. 9876543210"
                  keyboardType="phone-pad"
                  value={phoneInput}
                  onChangeText={setPhoneInput}
                />
              </View>
            </View>

            {/* Submit Login Button */}
            <TouchableOpacity
              style={styles.modalSubmitButton}
              onPress={handleLoginSubmit}
            >
              <Text style={styles.modalSubmitText}>
                {language === 'ta' ? 'உள்நுழைக (Enter)' : 'Enter Community'}
              </Text>
            </TouchableOpacity>

            {/* Quick Demo Bypass */}
            <TouchableOpacity
              style={styles.demoBypassButton}
              onPress={handleQuickDemoLogin}
            >
              <Text style={styles.demoBypassText}>
                {language === 'ta' ? 'டெமோ நேரடி பார்வை' : 'Quick Demo Resident Access'}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#F8FAFC',
    justifyContent: 'space-between',
    padding: 20,
    paddingBottom: 36
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 8
  },
  langPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDFA',
    borderWidth: 1,
    borderColor: '#CCFBF1',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    gap: 6
  },
  langPillText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F766E'
  },
  heroSection: {
    alignItems: 'center',
    marginVertical: 'auto',
    paddingVertical: 10
  },
  imageCard: {
    width: '100%',
    maxWidth: 320,
    height: 190,
    borderRadius: 24,
    overflow: 'hidden',
    marginTop: 20,
    position: 'relative',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8
      },
      android: {
        elevation: 4
      }
    })
  },
  heroImage: {
    width: '100%',
    height: '100%'
  },
  imageOverlayBadge: {
    position: 'absolute',
    bottom: 10,
    left: 12,
    right: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  imageOverlayText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    flex: 1
  },
  highlightsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 18,
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  highlightBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDFA',
    borderWidth: 1,
    borderColor: '#CCFBF1',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    gap: 6
  },
  highlightText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F766E'
  },
  actionsSection: {
    width: '100%',
    marginTop: 24,
    gap: 12
  },
  primaryButton: {
    backgroundColor: '#0F766E',
    minHeight: 54,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    gap: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#0F766E',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 6
      },
      android: {
        elevation: 4
      }
    })
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800'
  },
  loginPromptContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 4
  },
  loginPromptLabel: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600'
  },
  loginLinkButton: {
    paddingVertical: 4,
    paddingHorizontal: 6
  },
  loginLinkText: {
    fontSize: 14,
    color: '#0F766E',
    fontWeight: '800',
    textDecorationLine: 'underline'
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
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 10
      },
      android: {
        elevation: 8
      }
    })
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 12,
    marginBottom: 16
  },
  modalTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A'
  },
  modalCloseButton: {
    padding: 4
  },
  errorBox: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FEE2E2',
    padding: 10,
    borderRadius: 12,
    marginBottom: 12
  },
  errorText: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '700'
  },
  inputGroup: {
    marginBottom: 14
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 6
  },
  inputFieldWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    paddingHorizontal: 12,
    minHeight: 50,
    gap: 8
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#0F172A'
  },
  modalSubmitButton: {
    backgroundColor: '#0F766E',
    minHeight: 50,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8
  },
  modalSubmitText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800'
  },
  demoBypassButton: {
    marginTop: 10,
    alignItems: 'center',
    paddingVertical: 8
  },
  demoBypassText: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '700'
  }
});
