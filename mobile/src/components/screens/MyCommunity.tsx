import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
  Platform
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import { triggerHaptic } from '../../services/haptics';

export const MyCommunity: React.FC = () => {
  const { t, language } = useApp();
  const [activeTab, setActiveTab] = useState<'residents' | 'staff' | 'family'>('residents');
  const [birthdays, setBirthdays] = useState(t.community.birthdays);
  const [wishedMap, setWishedMap] = useState<Record<number, boolean>>({});

  const [galleryList, setGalleryList] = useState<Array<{ url: string; title: string }>>([
    {
      url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&auto=format&fit=crop&q=80',
      title: language === 'ta' ? 'காலை நடைப்பயிற்சி' : 'Morning Stroll'
    },
    {
      url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop&q=80',
      title: language === 'ta' ? 'இசை அரங்கம்' : 'Music Afternoon'
    },
    {
      url: 'https://images.unsplash.com/photo-1516726817505-f5ed825624d8?w=400&auto=format&fit=crop&q=80',
      title: language === 'ta' ? 'தோட்டக்கலை நேரம்' : 'Community Garden'
    },
    {
      url: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=400&auto=format&fit=crop&q=80',
      title: language === 'ta' ? 'பண்டிகை கொண்டாட்டம்' : 'Festival Gathering'
    }
  ]);

  useEffect(() => {
    async function loadCommunityData() {
      const bdays = await api.getBirthdays();
      if (bdays && bdays.length > 0) {
        setBirthdays(
          bdays.map((b: any) => ({
            name: language === 'ta' ? b.nameTa : b.nameEn,
            date: b.date
          }))
        );
      }

      const gal = await api.getGallery();
      if (gal && gal.length > 0) {
        setGalleryList(
          gal.map((g: any) => ({
            url: g.photoUrl,
            title: language === 'ta' ? g.titleTa : g.titleEn
          }))
        );
      }
    }
    loadCommunityData();
  }, [language]);

  const handleSendWish = (index: number, name: string) => {
    triggerHaptic('medium');
    setWishedMap(prev => ({ ...prev, [index]: true }));
    Alert.alert(
      language === 'ta' ? 'பிறந்தநாள் வாழ்த்து அனுப்பப்பட்டது!' : 'Birthday Wish Sent!',
      language === 'ta'
        ? `${name} அவர்களுக்கு உங்கள் அன்பான வாழ்த்துக்கள் தெரிவிக்கப்பட்டது.`
        : `Warm greetings and flower bouquet badge delivered to ${name}.`
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Category Segment Tabs */}
      <View style={styles.segmentContainer}>
        {(['residents', 'staff', 'family'] as const).map(tabKey => {
          const isSelected = activeTab === tabKey;
          let label = t.community.tabs.residents;
          if (tabKey === 'staff') label = t.community.tabs.staff;
          if (tabKey === 'family') label = t.community.tabs.family;

          return (
            <TouchableOpacity
              key={tabKey}
              style={[styles.segmentTab, isSelected ? styles.segmentTabActive : null]}
              onPress={() => {
                triggerHaptic('selection');
                setActiveTab(tabKey);
              }}
            >
              <Text style={[styles.segmentLabel, isSelected ? styles.segmentLabelActive : null]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Section 1: Birthdays This Month */}
      <View style={styles.section}>
        <View style={styles.sectionHeaderRow}>
          <MaterialCommunityIcons name="cake-variant" size={20} color="#DC2626" />
          <Text style={styles.sectionTitle}>{t.community.birthdaysTitle}</Text>
        </View>

        <View style={styles.birthdaysList}>
          {birthdays.map((item, index) => {
            const isWished = !!wishedMap[index];
            return (
              <View key={index} style={styles.birthdayCard}>
                <View style={styles.bdayIconBox}>
                  <MaterialCommunityIcons name="gift-outline" size={24} color="#0D9488" />
                </View>

                <View style={styles.bdayInfoCol}>
                  <Text style={styles.bdayName}>{item.name}</Text>
                  <Text style={styles.bdayDate}>{item.date}</Text>
                </View>

                {/* Send Wish Button (min 44px touch target) */}
                <TouchableOpacity
                  style={[styles.wishButton, isWished ? styles.wishButtonDone : styles.wishButtonReady]}
                  onPress={() => handleSendWish(index, item.name)}
                  disabled={isWished}
                >
                  <Ionicons
                    name={isWished ? 'heart' : 'heart-outline'}
                    size={18}
                    color={isWished ? '#FFFFFF' : '#DC2626'}
                  />
                  <Text style={[styles.wishButtonText, isWished ? styles.wishButtonTextDone : styles.wishButtonTextReady]}>
                    {isWished
                      ? (language === 'ta' ? 'வாழ்த்தப்பட்டது' : 'Wished')
                      : (language === 'ta' ? 'வாழ்த்து' : 'Wish')}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>

      {/* Section 2: Photo Gallery Grid */}
      <View style={styles.section}>
        <View style={styles.sectionHeaderRow}>
          <Ionicons name="images-outline" size={20} color="#0F766E" />
          <Text style={styles.sectionTitle}>
            {language === 'ta' ? 'சமூக புகைப்பட தொகுப்பு' : 'Community Photo Gallery'}
          </Text>
        </View>

        <View style={styles.galleryGrid}>
          {galleryList.map((item, idx) => (
            <View key={idx} style={styles.galleryCard}>
              <Image
                source={{ uri: item.url }}
                style={styles.galleryImage}
                resizeMode="cover"
              />
              <View style={styles.galleryLabelBar}>
                <Text style={styles.galleryLabelText} numberOfLines={1}>
                  {item.title}
                </Text>
              </View>
            </View>
          ))}
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
    gap: 20
  },
  segmentContainer: {
    flexDirection: 'row',
    backgroundColor: '#E2E8F0',
    borderRadius: 16,
    padding: 4
  },
  segmentTab: {
    flex: 1,
    minHeight: 46,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  segmentTabActive: {
    backgroundColor: '#0F766E',
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
  segmentLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#334155'
  },
  segmentLabelActive: {
    color: '#FFFFFF'
  },
  section: {
    gap: 12
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#334155',
    textTransform: 'uppercase'
  },
  birthdaysList: {
    gap: 10
  },
  birthdayCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
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
  bdayIconBox: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#CCFBF1',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bdayInfoCol: {
    flex: 1
  },
  bdayName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A'
  },
  bdayDate: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
    fontWeight: '500'
  },
  wishButton: {
    minHeight: 44,
    paddingHorizontal: 14,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1.5
  },
  wishButtonReady: {
    backgroundColor: '#FFF1F2',
    borderColor: '#FECDD3'
  },
  wishButtonDone: {
    backgroundColor: '#DC2626',
    borderColor: '#DC2626'
  },
  wishButtonText: {
    fontSize: 12,
    fontWeight: '800'
  },
  wishButtonTextReady: {
    color: '#DC2626'
  },
  wishButtonTextDone: {
    color: '#FFFFFF'
  },
  galleryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between'
  },
  galleryCard: {
    width: '48%',
    height: 150,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#E2E8F0',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#CBD5E1'
  },
  galleryImage: {
    width: '100%',
    height: '100%'
  },
  galleryLabelBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    paddingVertical: 6,
    paddingHorizontal: 10
  },
  galleryLabelText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700'
  }
});
