import React, { useState, useEffect } from 'react';
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

export const DailyActivities: React.FC = () => {
  const { t, language } = useApp();
  const [activitiesList, setActivitiesList] = useState(t.activities.items);
  const [joinedMap, setJoinedMap] = useState<Record<number, boolean>>({});

  useEffect(() => {
    async function loadActivities() {
      const data = await api.getTodayActivities();
      if (data && data.length > 0) {
        setActivitiesList(
          data.map((item: any) => ({
            time: item.time,
            title: language === 'ta' ? item.titleTa : item.titleEn,
            location: language === 'ta' ? item.locationTa : item.locationEn,
            category: item.category
          }))
        );
      } else {
        setActivitiesList(t.activities.items);
      }
    }
    loadActivities();
  }, [language]);

  const activityIcons = [
    { name: 'fitness', color: '#0F766E', bg: '#CCFBF1' },
    { name: 'sparkles', color: '#D97706', bg: '#FEF3C7' },
    { name: 'heart', color: '#DC2626', bg: '#FEE2E2' },
    { name: 'trophy', color: '#4338CA', bg: '#E0E7FF' },
    { name: 'film', color: '#7C3AED', bg: '#F3E8FF' }
  ];

  const handleToggleJoin = (index: number, title: string) => {
    triggerHaptic('medium');
    const newState = !joinedMap[index];
    setJoinedMap(prev => ({ ...prev, [index]: newState }));

    Alert.alert(
      newState ? (language === 'ta' ? 'பதிவு செய்யப்பட்டது' : 'Attending Activity') : (language === 'ta' ? 'ரத்து செய்யப்பட்டது' : 'Attendance Cancelled'),
      newState
        ? (language === 'ta' ? `${title} நிகழ்வில் உங்கள் பெயர் சேர்க்கப்பட்டுள்ளது.` : `You are registered for ${title}. Staff will assist if needed.`)
        : (language === 'ta' ? 'உங்கள் பதிவு நீக்கப்பட்டது.' : `Registration removed for ${title}.`)
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Date Header Sub-card */}
      <View style={styles.dateCard}>
        <View style={styles.dateRow}>
          <Ionicons name="calendar-outline" size={18} color="#0F766E" />
          <Text style={styles.dateText}>{t.activities.date}</Text>
        </View>
        <Text style={styles.welcomeQuote}>
          {language === 'ta'
            ? 'இனிய காலை வணக்கம்! இன்றைய பொழுது ஆரோக்கியமாகவும் மகிழ்ச்சியாகவும் அமையட்டும்.'
            : 'Good day! Stay active, connect with friends, and enjoy community sessions.'}
        </Text>
      </View>

      {/* Daily Timeline Activities */}
      <View style={styles.timelineList}>
        {activitiesList.map((item, index) => {
          const meta = activityIcons[index % activityIcons.length];
          const isJoined = !!joinedMap[index];

          return (
            <View key={index} style={styles.activityCard}>
              <View style={[styles.iconWrap, { backgroundColor: meta.bg }]}>
                <Ionicons name={meta.name as any} size={24} color={meta.color} />
              </View>

              <View style={styles.infoCol}>
                <View style={styles.badgeRow}>
                  <View style={styles.timeBadge}>
                    <Text style={styles.timeBadgeText}>{item.time}</Text>
                  </View>
                  <Text style={styles.categoryTag}>{item.category}</Text>
                </View>

                <Text style={styles.activityTitle}>{item.title}</Text>

                <View style={styles.locationRow}>
                  <Ionicons name="location-outline" size={14} color="#64748B" />
                  <Text style={styles.locationText}>{item.location}</Text>
                </View>

                {/* Join Status Button (min 44px touch target) */}
                <TouchableOpacity
                  style={[
                    styles.joinBtn,
                    isJoined ? styles.joinBtnActive : styles.joinBtnNormal
                  ]}
                  onPress={() => handleToggleJoin(index, item.title)}
                >
                  <Ionicons
                    name={isJoined ? 'checkmark-circle' : 'add-circle-outline'}
                    size={16}
                    color={isJoined ? '#047857' : '#0F766E'}
                  />
                  <Text
                    style={[
                      styles.joinBtnText,
                      isJoined ? styles.joinBtnTextActive : styles.joinBtnTextNormal
                    ]}
                  >
                    {isJoined
                      ? (language === 'ta' ? 'பங்கேற்கிறேன் (Joined)' : 'Joined')
                      : (language === 'ta' ? 'பங்கேற்க தட்டவும்' : 'I will attend')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </View>

      {/* Reassurance Banner for Elders */}
      <View style={styles.staffNoticeCard}>
        <MaterialCommunityIcons name="hand-heart" size={24} color="#0F766E" />
        <Text style={styles.staffNoticeText}>
          {language === 'ta'
            ? 'அனைத்து நிகழ்வுகளிலும் ஊழியர்கள் மற்றும் செவிலியர்கள் உதவிக்கு இருப்பார்கள்.'
            : 'Care staff and helpers are present at all sessions for wheelchair and movement assistance.'}
        </Text>
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
  dateCard: {
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
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  dateText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F766E'
  },
  welcomeQuote: {
    fontSize: 12,
    color: '#475569',
    marginTop: 6,
    lineHeight: 18,
    fontWeight: '500'
  },
  timelineList: {
    gap: 12
  },
  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    gap: 14,
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
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2
  },
  infoCol: {
    flex: 1,
    gap: 4
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  timeBadge: {
    backgroundColor: '#F0FDFA',
    borderWidth: 1,
    borderColor: '#CCFBF1',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 8
  },
  timeBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0F766E'
  },
  categoryTag: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '600'
  },
  activityTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 2
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2
  },
  locationText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500'
  },
  joinBtn: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    minHeight: 44,
    gap: 6
  },
  joinBtnNormal: {
    backgroundColor: '#F0FDFA',
    borderWidth: 1,
    borderColor: '#99F6E4'
  },
  joinBtnActive: {
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0'
  },
  joinBtnText: {
    fontSize: 12,
    fontWeight: '700'
  },
  joinBtnTextNormal: {
    color: '#0F766E'
  },
  joinBtnTextActive: {
    color: '#047857'
  },
  staffNoticeCard: {
    backgroundColor: '#F0FDFA',
    borderWidth: 1,
    borderColor: '#CCFBF1',
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  staffNoticeText: {
    flex: 1,
    fontSize: 12,
    color: '#115E59',
    fontWeight: '600',
    lineHeight: 18
  }
});
