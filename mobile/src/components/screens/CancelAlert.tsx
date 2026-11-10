import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Platform
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';
import { triggerHaptic } from '../../services/haptics';

export const CancelAlert: React.FC = () => {
  const { t, language, profile, cancelEmergencyAlert, setCurrentScreen } = useApp();
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  const handleConfirmCancel = async () => {
    triggerHaptic('medium');
    setConfirmModalVisible(false);
    await cancelEmergencyAlert();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Amber Active Status Banner */}
      <View style={styles.statusBar}>
        <View style={styles.bellBadge}>
          <MaterialCommunityIcons name="bell-ring" size={32} color="#D97706" />
        </View>
        <Text style={styles.statusTitle}>{t.alertProgress.title}</Text>
        <Text style={styles.statusSubtitle}>{t.alertProgress.notifiedTeam}</Text>
      </View>

      <View style={styles.content}>
        {/* Incident Summary Card */}
        <View style={styles.detailsCard}>
          {/* Location */}
          <View style={styles.detailRow}>
            <View style={styles.iconBoxTeal}>
              <Ionicons name="location" size={20} color="#0F766E" />
            </View>
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailLabel}>{t.alertProgress.locationLabel}</Text>
              <Text style={styles.detailValue}>
                {profile.room ? `${profile.room}, ${profile.block}` : 'Room 204, Block B'}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Medical Summary */}
          <View style={styles.detailRow}>
            <View style={styles.iconBoxRed}>
              <Ionicons name="heart" size={20} color="#DC2626" />
            </View>
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailLabel}>{t.alertProgress.medicalLabel}</Text>
              <Text style={styles.detailValue}>
                {profile.medicalConditions || 'Blood Group: B+ • Diabetic / BP'}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Shared Notified Staff (3/5) */}
          <View style={styles.detailRow}>
            <View style={styles.iconBoxGreen}>
              <Ionicons name="people" size={20} color="#059669" />
            </View>
            <View style={styles.detailTextContainer}>
              <View style={styles.sharedHeaderRow}>
                <Text style={styles.detailLabel}>{t.alertProgress.sharedLabel}</Text>
                <View style={styles.badgePill}>
                  <Text style={styles.badgePillText}>{t.alertProgress.sharedFraction}</Text>
                </View>
              </View>
              <Text style={styles.detailValue}>{t.alertProgress.sharedVal}</Text>
            </View>
          </View>
        </View>

        {/* Preview Notification Dispatch Button (Screen 5 trigger) */}
        <TouchableOpacity
          style={styles.previewButton}
          activeOpacity={0.8}
          onPress={() => {
            triggerHaptic('selection');
            setCurrentScreen(5); // Go to Screen 5: Notification Sent
          }}
          accessibilityRole="button"
          accessibilityLabel="Preview Notifications"
        >
          <MaterialCommunityIcons name="whatsapp" size={22} color="#047857" />
          <Text style={styles.previewButtonText}>
            {t.notification.title} (WhatsApp & SMS)
          </Text>
          <Ionicons name="arrow-forward" size={18} color="#047857" />
        </TouchableOpacity>

        {/* Cancellation Section Card */}
        <View style={styles.cancelCard}>
          <Text style={styles.cancelCardTitle}>{t.alertProgress.cancelPromptTitle}</Text>
          <Text style={styles.cancelCardDesc}>{t.alertProgress.cancelPromptDesc}</Text>

          <TouchableOpacity
            style={styles.cancelAlertButton}
            activeOpacity={0.8}
            onPress={() => {
              triggerHaptic('heavy');
              setConfirmModalVisible(true);
            }}
            accessibilityRole="button"
            accessibilityLabel={t.alertProgress.cancelButton}
          >
            <Ionicons name="close-circle" size={22} color="#FFFFFF" />
            <Text style={styles.cancelAlertButtonText}>
              {t.alertProgress.cancelButton}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Confirmation Modal */}
      <Modal
        visible={confirmModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setConfirmModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalBox}>
            <Ionicons name="alert-circle" size={48} color="#DC2626" />
            <Text style={styles.modalTitle}>
              {language === 'ta' ? 'அலர்ட்டை ரத்து செய்யவா?' : 'Cancel Active Alert?'}
            </Text>
            <Text style={styles.modalMessage}>
              {language === 'ta'
                ? 'அவசர உதவி அலர்ட் நிறுத்தப்பட்டு மருத்துவ பணியாளர்களுக்கு தகவல் அனுப்பப்படும்.'
                : 'This will notify duty nurses and control room that the emergency alert has been resolved.'}
            </Text>

            <View style={styles.modalActionsRow}>
              <TouchableOpacity
                style={styles.modalBackBtn}
                onPress={() => setConfirmModalVisible(false)}
              >
                <Text style={styles.modalBackBtnText}>
                  {language === 'ta' ? 'இல்லை' : 'Keep Active'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalConfirmBtn}
                onPress={handleConfirmCancel}
              >
                <Text style={styles.modalConfirmBtnText}>
                  {language === 'ta' ? 'ஆம், ரத்து செய்' : 'Yes, Cancel'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F8FAFC'
  },
  statusBar: {
    backgroundColor: '#D97706',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 28,
    paddingHorizontal: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#D97706',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8
      },
      android: {
        elevation: 6
      }
    })
  },
  bellBadge: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12
  },
  statusTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFFFF'
  },
  statusSubtitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FEF3C7',
    marginTop: 4
  },
  content: {
    padding: 16,
    gap: 16
  },
  detailsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4
      },
      android: {
        elevation: 2
      }
    })
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 4
  },
  iconBoxTeal: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#CCFBF1',
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconBoxRed: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconBoxGreen: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center'
  },
  detailTextContainer: {
    flex: 1
  },
  detailLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase'
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 2
  },
  sharedHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  badgePill: {
    backgroundColor: '#D1FAE5',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 10
  },
  badgePillText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#065F46'
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 10
  },
  previewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderWidth: 1.5,
    borderColor: '#A7F3D0',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    minHeight: 54,
    gap: 10
  },
  previewButtonText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '800',
    color: '#065F46'
  },
  cancelCard: {
    backgroundColor: '#FFFBEB',
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center'
  },
  cancelCardTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#92400E'
  },
  cancelCardDesc: {
    fontSize: 12,
    color: '#B45309',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 16
  },
  cancelAlertButton: {
    backgroundColor: '#DC2626',
    borderRadius: 14,
    minHeight: 52,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: '100%',
    marginTop: 14
  },
  cancelAlertButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800'
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24
  },
  modalBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    width: '100%',
    maxWidth: 320
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 12,
    textAlign: 'center'
  },
  modalMessage: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 18
  },
  modalActionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
    width: '100%'
  },
  modalBackBtn: {
    flex: 1,
    minHeight: 48,
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalBackBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#475569'
  },
  modalConfirmBtn: {
    flex: 1,
    minHeight: 48,
    backgroundColor: '#DC2626',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalConfirmBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF'
  }
});
