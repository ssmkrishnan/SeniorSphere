import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ScrollView,
  Platform
} from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';
import { triggerHaptic } from '../../services/haptics';

export const EmergencyAlert: React.FC = () => {
  const { t, setCurrentScreen, triggerEmergencyAlert } = useApp();

  const pulseScale = useRef(new Animated.Value(1)).current;
  const pulseOpacity = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    const pulseAnim = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(pulseScale, {
            toValue: 1.25,
            duration: 1000,
            useNativeDriver: true
          }),
          Animated.timing(pulseOpacity, {
            toValue: 0.1,
            duration: 1000,
            useNativeDriver: true
          })
        ]),
        Animated.parallel([
          Animated.timing(pulseScale, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
          }),
          Animated.timing(pulseOpacity, {
            toValue: 0.6,
            duration: 1000,
            useNativeDriver: true
          })
        ])
      ])
    );
    pulseAnim.start();

    return () => pulseAnim.stop();
  }, [pulseScale, pulseOpacity]);

  const handleAlert = (type: 'sos' | 'medical' | 'staff') => {
    triggerHaptic('heavy');
    triggerEmergencyAlert(type);
  };

  return (
    <ScrollView contentContainerStyle={styles.container} bounces={false}>
      {/* Top Prominent Red Card */}
      <View style={styles.topCard}>
        {/* Pulsing Outer Rings */}
        <Animated.View
          style={[
            styles.animatedRing,
            {
              transform: [{ scale: pulseScale }],
              opacity: pulseOpacity
            }
          ]}
        />

        {/* Large SOS Button with Elder Ergonomics (140px diameter) */}
        <TouchableOpacity
          style={styles.sosButton}
          activeOpacity={0.8}
          onPress={() => handleAlert('sos')}
          accessibilityRole="button"
          accessibilityLabel="SOS Emergency Trigger"
        >
          <MaterialCommunityIcons name="bell-ring" size={68} color="#DC2626" />
          <Text style={styles.sosButtonText}>SOS</Text>
        </TouchableOpacity>

        <Text style={styles.needHelpTitle}>{t.sos.needHelp}</Text>
        <Text style={styles.instructionText}>{t.sos.instruction}</Text>
      </View>

      {/* Quick Action Assistance Options */}
      <View style={styles.actionsContainer}>
        {/* Medical Emergency Button (min 50px touch target) */}
        <TouchableOpacity
          style={styles.medicalButton}
          activeOpacity={0.8}
          onPress={() => handleAlert('medical')}
          accessibilityRole="button"
          accessibilityLabel={t.sos.medicalEmergency}
        >
          <View style={styles.actionIconBadgeRed}>
            <Ionicons name="medical" size={24} color="#DC2626" />
          </View>
          <Text style={styles.medicalButtonText}>{t.sos.medicalEmergency}</Text>
          <Ionicons name="chevron-forward" size={20} color="#DC2626" />
        </TouchableOpacity>

        {/* Call Staff Button (min 50px touch target) */}
        <TouchableOpacity
          style={styles.staffButton}
          activeOpacity={0.8}
          onPress={() => handleAlert('staff')}
          accessibilityRole="button"
          accessibilityLabel={t.sos.callStaff}
        >
          <View style={styles.actionIconBadgeAmber}>
            <Ionicons name="call" size={24} color="#D97706" />
          </View>
          <Text style={styles.staffButtonText}>{t.sos.callStaff}</Text>
          <Ionicons name="chevron-forward" size={20} color="#D97706" />
        </TouchableOpacity>

        {/* Cancel / Return Back */}
        <TouchableOpacity
          style={styles.cancelLink}
          onPress={() => {
            triggerHaptic('light');
            setCurrentScreen(9);
          }}
        >
          <Ionicons name="close-circle-outline" size={20} color="#64748B" />
          <Text style={styles.cancelLinkText}>{t.sos.cancelAlert}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F8FAFC',
    justifyContent: 'space-between'
  },
  topCard: {
    backgroundColor: '#DC2626',
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 36,
    paddingHorizontal: 20,
    position: 'relative',
    ...Platform.select({
      ios: {
        shadowColor: '#DC2626',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 10
      },
      android: {
        elevation: 8
      }
    })
  },
  animatedRing: {
    position: 'absolute',
    top: 25,
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: 'rgba(255, 255, 255, 0.4)'
  },
  sosButton: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#FEE2E2',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 10
      },
      android: {
        elevation: 10
      }
    })
  },
  sosButtonText: {
    fontSize: 22,
    fontWeight: '900',
    color: '#DC2626',
    marginTop: -4
  },
  needHelpTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 20,
    textAlign: 'center'
  },
  instructionText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FEE2E2',
    marginTop: 6,
    textAlign: 'center',
    lineHeight: 18,
    maxWidth: 280
  },
  actionsContainer: {
    padding: 20,
    gap: 14,
    marginBottom: 20
  },
  medicalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#FCA5A5',
    borderRadius: 18,
    paddingHorizontal: 16,
    minHeight: 64,
    gap: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#DC2626',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4
      },
      android: {
        elevation: 2
      }
    })
  },
  actionIconBadgeRed: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#FEF2F2',
    alignItems: 'center',
    justifyContent: 'center'
  },
  medicalButtonText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '800',
    color: '#DC2626'
  },
  staffButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#FCD34D',
    borderRadius: 18,
    paddingHorizontal: 16,
    minHeight: 64,
    gap: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#D97706',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4
      },
      android: {
        elevation: 2
      }
    })
  },
  actionIconBadgeAmber: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#FFFBEB',
    alignItems: 'center',
    justifyContent: 'center'
  },
  staffButtonText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '800',
    color: '#B45309'
  },
  cancelLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 6
  },
  cancelLinkText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748B'
  }
});
