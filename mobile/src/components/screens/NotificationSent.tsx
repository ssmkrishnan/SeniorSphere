import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import { triggerHaptic } from '../../services/haptics';

export const NotificationSent: React.FC = () => {
  const { t, language, profile, setCurrentScreen } = useApp();
  const [activeChannel, setActiveChannel] = useState<'whatsapp' | 'sms'>('whatsapp');
  const [activeAlert, setActiveAlert] = useState<any>(null);

  useEffect(() => {
    async function loadAlert() {
      const data = await api.getActiveAlert();
      if (data) {
        setActiveAlert(data);
      }
    }
    loadAlert();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Segmented Control Toggle (min 50px touch height) */}
      <View style={styles.segmentedContainer}>
        <TouchableOpacity
          style={[
            styles.segmentBtn,
            activeChannel === 'whatsapp' ? styles.segmentBtnActive : null
          ]}
          onPress={() => {
            triggerHaptic('selection');
            setActiveChannel('whatsapp');
          }}
        >
          <MaterialCommunityIcons
            name="whatsapp"
            size={20}
            color={activeChannel === 'whatsapp' ? '#FFFFFF' : '#047857'}
          />
          <Text
            style={[
              styles.segmentText,
              activeChannel === 'whatsapp' ? styles.segmentTextActive : null
            ]}
          >
            {t.notification.tabWhatsapp}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.segmentBtn,
            activeChannel === 'sms' ? styles.segmentBtnActive : null
          ]}
          onPress={() => {
            triggerHaptic('selection');
            setActiveChannel('sms');
          }}
        >
          <Ionicons
            name="chatbubble-ellipses"
            size={18}
            color={activeChannel === 'sms' ? '#FFFFFF' : '#047857'}
          />
          <Text
            style={[
              styles.segmentText,
              activeChannel === 'sms' ? styles.segmentTextActive : null
            ]}
          >
            {t.notification.tabSms}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Main Preview Container */}
      <View style={styles.previewWrapper}>
        {activeChannel === 'whatsapp' ? (
          /* WhatsApp Native Preview Card */
          <View style={styles.whatsappCard}>
            {/* Header */}
            <View style={styles.waHeader}>
              <View style={styles.waAvatar}>
                <Text style={styles.waAvatarText}>SS</Text>
              </View>
              <View style={styles.waHeaderInfo}>
                <View style={styles.waTitleRow}>
                  <Text style={styles.waTitle}>{t.appName}</Text>
                  <MaterialCommunityIcons name="check-decagram" size={16} color="#34D399" />
                </View>
                <Text style={styles.waSubtitle}>{t.notification.online}</Text>
              </View>
              <View style={styles.roomTag}>
                <Text style={styles.roomTagText}>
                  {profile.room ? `Room ${profile.room}` : 'Room 204'}
                </Text>
              </View>
            </View>

            {/* Bubble */}
            <View style={styles.waBubble}>
              <View style={styles.waAlertHead}>
                <View style={styles.pingDot} />
                <Text style={styles.waAlertTitle}>{t.notification.alertHeadline}</Text>
              </View>

              <Text style={styles.waAlertDesc}>
                {language === 'ta'
                  ? `${profile.name || 'குடியிருப்பாளர்'} அவர்களிடமிருந்து அவசர எச்சரிக்கை பெறப்பட்டது.`
                  : `An emergency alert has been sent by ${profile.name || 'Resident'}.`}
              </Text>

              {/* Data Rows */}
              <View style={styles.waInfoBox}>
                <Text style={styles.waInfoLine}>
                  <Text style={styles.boldText}>{t.alertProgress.locationLabel}: </Text>
                  {profile.room ? `${profile.room}, ${profile.block}` : 'Room 204, Block B'}
                </Text>
                <Text style={styles.waInfoLine}>
                  <Text style={styles.boldText}>{t.alertProgress.medicalLabel}: </Text>
                  {profile.medicalConditions || 'Blood Group: B+ • Diabetic / BP'}
                </Text>
                <Text style={styles.waInfoLine}>
                  <Text style={styles.boldText}>Timestamp: </Text>
                  {new Date().toLocaleTimeString()}
                </Text>
              </View>

              {/* Geo Location Link */}
              <View style={styles.waMapLink}>
                <Ionicons name="map-outline" size={16} color="#0284C7" />
                <Text style={styles.waMapLinkText}>
                  {language === 'ta' ? 'வரைபடம் / வழித்தடம் பார்க்க' : 'https://maps.seniorsphere.internal/loc'}
                </Text>
              </View>

              {/* Staff Acknowledgment Checklist */}
              <View style={styles.ackSection}>
                <Text style={styles.ackTitle}>
                  {language === 'ta' ? 'அறிவிக்கப்பட்ட பணியாளர்கள் (3/5)' : 'Staff Acknowledgment Status (3/5)'}
                </Text>
                <View style={styles.ackItem}>
                  <Ionicons name="checkmark-done" size={16} color="#059669" />
                  <Text style={styles.ackName}>Dr. Anitha (Resident Medical Officer) - Acknowledged</Text>
                </View>
                <View style={styles.ackItem}>
                  <Ionicons name="checkmark-done" size={16} color="#059669" />
                  <Text style={styles.ackName}>Nurse Priya (Block B In-charge) - Dispatched</Text>
                </View>
                <View style={styles.ackItem}>
                  <Ionicons name="checkmark-done" size={16} color="#059669" />
                  <Text style={styles.ackName}>Security Control Room - Responded</Text>
                </View>
              </View>

              <View style={styles.waFooter}>
                <Text style={styles.waTime}>Just now</Text>
                <Ionicons name="checkmark-done" size={16} color="#38BDF8" />
              </View>
            </View>
          </View>
        ) : (
          /* SMS Preview Card */
          <View style={styles.smsCard}>
            <View style={styles.smsHeader}>
              <Ionicons name="phone-portrait-outline" size={20} color="#047857" />
              <Text style={styles.smsSender}>SENIOR-CARE-ALERT</Text>
              <Text style={styles.smsNetwork}>Priority Dispatch</Text>
            </View>

            <View style={styles.smsBubble}>
              <Text style={styles.smsAlertPrefix}>[CRITICAL SOS DISPATCH]</Text>
              <Text style={styles.smsBody}>
                {language === 'ta'
                  ? `அவசர எச்சரிக்கை! அறை எண் ${profile.room || '204'}, ${profile.block || 'Block B'}. குடியிருப்பாளர்: ${profile.name || 'Resident'}. தயவுசெய்து உடனடியாக வருகை தரவும்.`
                  : `EMERGENCY SOS: Resident ${profile.name || 'Resident'} at Room ${profile.room || '204'}, ${profile.block || 'Block B'} requires urgent assistance. Medical history: ${profile.medicalConditions || 'Blood Group: B+'}.`}
              </Text>
              <Text style={styles.smsTimestamp}>Today • {new Date().toLocaleTimeString()}</Text>
            </View>
          </View>
        )}

        {/* Back to Alert Status Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            triggerHaptic('light');
            setCurrentScreen(4);
          }}
        >
          <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
          <Text style={styles.backButtonText}>
            {language === 'ta' ? 'அலர்ட் நிலைக்கு திரும்புக' : 'Return to Alert Status'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F1F5F9',
    padding: 16,
    paddingBottom: 32
  },
  segmentedContainer: {
    flexDirection: 'row',
    backgroundColor: '#E2E8F0',
    borderRadius: 16,
    padding: 4,
    marginBottom: 16
  },
  segmentBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    borderRadius: 12,
    gap: 8
  },
  segmentBtnActive: {
    backgroundColor: '#047857',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3
      },
      android: {
        elevation: 2
      }
    })
  },
  segmentText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#334155'
  },
  segmentTextActive: {
    color: '#FFFFFF'
  },
  previewWrapper: {
    gap: 16
  },
  whatsappCard: {
    backgroundColor: '#EFEAE2',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    paddingBottom: 12
  },
  waHeader: {
    backgroundColor: '#075E54',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  waAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  waAvatarText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#075E54'
  },
  waHeaderInfo: {
    flex: 1
  },
  waTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  waTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800'
  },
  waSubtitle: {
    color: '#A7F3D0',
    fontSize: 11,
    fontWeight: '500'
  },
  roomTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8
  },
  roomTagText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700'
  },
  waBubble: {
    backgroundColor: '#FFFFFF',
    margin: 12,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 10
  },
  waAlertHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  pingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#DC2626'
  },
  waAlertTitle: {
    color: '#DC2626',
    fontSize: 14,
    fontWeight: '900'
  },
  waAlertDesc: {
    fontSize: 13,
    color: '#0F172A',
    fontWeight: '600',
    lineHeight: 18
  },
  waInfoBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 10,
    gap: 4
  },
  waInfoLine: {
    fontSize: 12,
    color: '#334155'
  },
  boldText: {
    fontWeight: '700'
  },
  waMapLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F0F9FF',
    padding: 8,
    borderRadius: 8
  },
  waMapLinkText: {
    color: '#0284C7',
    fontSize: 12,
    fontWeight: '700',
    textDecorationLine: 'underline'
  },
  ackSection: {
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 8,
    gap: 4
  },
  ackTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#475569',
    marginBottom: 4
  },
  ackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  ackName: {
    fontSize: 11,
    color: '#065F46',
    fontWeight: '600'
  },
  waFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 4
  },
  waTime: {
    fontSize: 10,
    color: '#94A3B8'
  },
  smsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    gap: 12
  },
  smsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 10,
    gap: 8
  },
  smsSender: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
    flex: 1
  },
  smsNetwork: {
    fontSize: 11,
    fontWeight: '700',
    color: '#DC2626'
  },
  smsBubble: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    padding: 14,
    gap: 8
  },
  smsAlertPrefix: {
    fontSize: 13,
    fontWeight: '900',
    color: '#DC2626'
  },
  smsBody: {
    fontSize: 13,
    color: '#1E293B',
    lineHeight: 18,
    fontWeight: '500'
  },
  smsTimestamp: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 4
  },
  backButton: {
    backgroundColor: '#0F766E',
    minHeight: 52,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800'
  }
});
