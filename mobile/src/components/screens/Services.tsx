import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Platform
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import { triggerHaptic } from '../../services/haptics';

export const Services: React.FC = () => {
  const { t, language, setCurrentScreen } = useApp();
  const [activeRequestToast, setActiveRequestToast] = useState<string | null>(null);

  const iconsMap: Record<string, { family: 'ionicons' | 'material'; name: string }> = {
    housekeeping: { family: 'ionicons', name: 'sparkles' },
    laundry: { family: 'material', name: 'tshirt-crew-outline' },
    meal: { family: 'ionicons', name: 'restaurant' },
    transport: { family: 'ionicons', name: 'car' },
    visitor: { family: 'ionicons', name: 'people' },
    general: { family: 'ionicons', name: 'information-circle' }
  };

  const handleServiceClick = async (item: { id: string; title: string }) => {
    triggerHaptic('medium');
    setActiveRequestToast(item.title);

    try {
      await api.requestService(item.id, item.title);
      Alert.alert(
        language === 'ta' ? 'சேவை கோரப்பட்டது' : 'Service Dispatched',
        language === 'ta'
          ? `${item.title} உங்கள் அறைக்கு அனுப்பப்பட்டுள்ளது. பணியாளர்கள் விரைவில் வருவார்கள்.`
          : `${item.title} has been notified to resident helpdesk.`
      );
    } catch {
      Alert.alert('Notice', `Request for ${item.title} logged locally.`);
    }

    setTimeout(() => {
      setActiveRequestToast(null);
    }, 2500);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Toast Notification Banner */}
      {activeRequestToast && (
        <View style={styles.toastCard}>
          <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
          <Text style={styles.toastText}>
            {activeRequestToast} - {language === 'ta' ? 'அனுப்பப்பட்டது' : 'Dispatched'}
          </Text>
        </View>
      )}

      {/* Quick Access Top Cards: Complaint & Counselling */}
      <View style={styles.topCardsRow}>
        {/* Raise Complaint Card */}
        <TouchableOpacity
          style={styles.actionCardAmber}
          activeOpacity={0.8}
          onPress={() => {
            triggerHaptic('light');
            setCurrentScreen(6);
          }}
        >
          <View style={styles.actionIconBadgeAmber}>
            <Ionicons name="warning" size={20} color="#D97706" />
          </View>
          <Text style={styles.actionCardTitle}>{t.complaint.title}</Text>
          <Text style={styles.actionCardSub}>
            {t.complaintStatus.title} &rarr;
          </Text>
        </TouchableOpacity>

        {/* Counselling & Certificates Card */}
        <TouchableOpacity
          style={styles.actionCardTeal}
          activeOpacity={0.8}
          onPress={() => {
            triggerHaptic('light');
            setCurrentScreen(10);
          }}
        >
          <View style={styles.actionIconBadgeTeal}>
            <Ionicons name="document-text" size={20} color="#0F766E" />
          </View>
          <Text style={styles.actionCardTitle}>{t.counselling.title}</Text>
          <Text style={styles.actionCardSub}>
            {language === 'ta' ? 'சான்றிதழ் & உதவி →' : 'Certificates & help →'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Resident Services Directory Section */}
      <View style={styles.servicesContainer}>
        <Text style={styles.sectionHeader}>
          {language === 'ta' ? 'குடியிருப்பாளர் தினசரி சேவைகள்' : 'On-Demand Resident Services'}
        </Text>

        <View style={styles.servicesListCard}>
          {t.services.items.map((item, index) => {
            const iconConfig = iconsMap[item.id] || iconsMap.general;
            const isLast = index === t.services.items.length - 1;

            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.serviceRow, isLast ? null : styles.serviceRowDivider]}
                activeOpacity={0.7}
                onPress={() => handleServiceClick(item)}
                accessibilityRole="button"
                accessibilityLabel={item.title}
              >
                <View style={styles.serviceIconWrap}>
                  {iconConfig.family === 'material' ? (
                    <MaterialCommunityIcons name={iconConfig.name as any} size={22} color="#0F766E" />
                  ) : (
                    <Ionicons name={iconConfig.name as any} size={22} color="#0F766E" />
                  )}
                </View>

                <View style={styles.serviceTextCol}>
                  <Text style={styles.serviceTitle}>{item.title}</Text>
                  <Text style={styles.serviceHint}>
                    {language === 'ta' ? 'ஒரு தட்டலில் பெறுக' : 'One-tap dispatch to room'}
                  </Text>
                </View>

                <View style={styles.arrowWrap}>
                  <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
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
  toastCard: {
    backgroundColor: '#047857',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  toastText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700'
  },
  topCardsRow: {
    flexDirection: 'row',
    gap: 12
  },
  actionCardAmber: {
    flex: 1,
    backgroundColor: '#FFFBEB',
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    borderRadius: 20,
    padding: 14,
    minHeight: 110,
    justifyContent: 'space-between',
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
  actionIconBadgeAmber: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center'
  },
  actionCardTeal: {
    flex: 1,
    backgroundColor: '#F0FDFA',
    borderWidth: 1.5,
    borderColor: '#CCFBF1',
    borderRadius: 20,
    padding: 14,
    minHeight: 110,
    justifyContent: 'space-between',
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
  actionIconBadgeTeal: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#CCFBF1',
    alignItems: 'center',
    justifyContent: 'center'
  },
  actionCardTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 6
  },
  actionCardSub: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B'
  },
  servicesContainer: {
    gap: 10
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: '800',
    color: '#475569',
    textTransform: 'uppercase'
  },
  servicesListCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
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
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    minHeight: 56,
    gap: 14
  },
  serviceRowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9'
  },
  serviceIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#F0FDFA',
    borderWidth: 1,
    borderColor: '#CCFBF1',
    alignItems: 'center',
    justifyContent: 'center'
  },
  serviceTextCol: {
    flex: 1
  },
  serviceTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A'
  },
  serviceHint: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
    fontWeight: '500'
  },
  arrowWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
