import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  Alert,
  Platform
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import { triggerHaptic } from '../../services/haptics';

export const CertificationCounselling: React.FC = () => {
  const { t, language, setCurrentScreen } = useApp();
  const [selectedItem, setSelectedItem] = useState<string>('pension');
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const iconsMap: Record<string, any> = {
    pension: { name: 'cash-outline', bg: '#FFE4E6', color: '#E11D48' },
    legal: { name: 'scale-outline', bg: '#E0E7FF', color: '#4338CA' },
    schemes: { name: 'heart-outline', bg: '#D1FAE5', color: '#059669' },
    medical: { name: 'document-text-outline', bg: '#FEF3C7', color: '#D97706' }
  };

  const handleRequestBooking = async () => {
    triggerHaptic('medium');
    setIsSubmitting(true);
    try {
      await api.requestCounselling(selectedItem);
      Alert.alert(
        language === 'ta' ? 'முன்பதிவு வெற்றிகரமாக முடிந்தது' : 'Consultation Requested',
        language === 'ta'
          ? 'எங்கள் சட்ட/நலத்துறை ஆலோசகர் உங்கள் அறைக்கு நேரில் வந்து உதவுவார்.'
          : 'Our counselor will visit your room with the required documentation guidance.',
        [
          {
            text: 'OK',
            onPress: () => setCurrentScreen(11) // Return to Services
          }
        ]
      );
    } catch {
      Alert.alert('Error', 'Could not request counselling. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.subtitle}>{t.counselling.subtitle}</Text>

      {/* Counselling Categories */}
      <View style={styles.cardsList}>
        {t.counselling.items.map(item => {
          const isSelected = selectedItem === item.id;
          const meta = iconsMap[item.id] || iconsMap.pension;

          return (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.categoryCard,
                isSelected ? styles.categoryCardSelected : null
              ]}
              activeOpacity={0.7}
              onPress={() => {
                triggerHaptic('selection');
                setSelectedItem(item.id);
              }}
              accessibilityRole="button"
              accessibilityLabel={item.title}
            >
              <View style={[styles.iconBox, { backgroundColor: meta.bg }]}>
                <Ionicons name={meta.name} size={24} color={meta.color} />
              </View>

              <View style={styles.cardContent}>
                <View style={styles.cardTitleRow}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <View
                    style={[
                      styles.radioCircle,
                      isSelected ? styles.radioCircleSelected : null
                    ]}
                  >
                    {isSelected && <View style={styles.radioInner} />}
                  </View>
                </View>
                <Text style={styles.cardDesc}>{item.desc}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Specific Notes Input */}
      <View style={styles.notesCard}>
        <Text style={styles.notesLabel}>
          {language === 'ta' ? 'கூடுதல் குறிப்புகள் (தேவைப்பட்டால்)' : 'Specific Notes / Requests (Optional)'}
        </Text>
        <TextInput
          style={styles.notesInput}
          value={notes}
          onChangeText={setNotes}
          placeholder={
            language === 'ta'
              ? 'உதாரணம்: ஓய்வூதிய சான்றிதழ் படிவம் தேவை...'
              : 'e.g. Need assistance with digital life certificate submission...'
          }
          placeholderTextColor="#94A3B8"
          multiline
          numberOfLines={3}
        />
      </View>

      {/* Submit Button (min 50px touch height) */}
      <TouchableOpacity
        style={styles.bookButton}
        onPress={handleRequestBooking}
        disabled={isSubmitting}
        accessibilityRole="button"
        accessibilityLabel={t.counselling.requestHelp}
      >
        <Ionicons name="calendar" size={20} color="#FFFFFF" />
        <Text style={styles.bookButtonText}>
          {isSubmitting
            ? (language === 'ta' ? 'பதிவாகிறது...' : 'Booking...')
            : t.counselling.requestHelp}
        </Text>
      </TouchableOpacity>
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
  subtitle: {
    fontSize: 13,
    color: '#475569',
    fontWeight: '600',
    lineHeight: 19
  },
  cardsList: {
    gap: 12
  },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1.5,
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
  categoryCardSelected: {
    borderColor: '#0F766E',
    backgroundColor: '#F0FDFA',
    borderWidth: 2
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2
  },
  cardContent: {
    flex: 1,
    gap: 4
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A'
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center'
  },
  radioCircleSelected: {
    borderColor: '#0F766E'
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0F766E'
  },
  cardDesc: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 17,
    fontWeight: '500'
  },
  notesCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  notesLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 8
  },
  notesInput: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    color: '#0F172A',
    minHeight: 80,
    textAlignVertical: 'top'
  },
  bookButton: {
    backgroundColor: '#0F766E',
    minHeight: 54,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 4,
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
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800'
  }
});
