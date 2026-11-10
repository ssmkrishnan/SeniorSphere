import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Platform
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';
import { triggerHaptic } from '../../services/haptics';

export const RaiseComplaint: React.FC = () => {
  const { t, language, addComplaint, setCurrentScreen } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('room');
  const [description, setDescription] = useState<string>(
    language === 'ta' ? 'கழிவறை தண்ணீர் கசிகிறது.' : 'The bathroom tap is leaking since yesterday.'
  );
  const [hasPhoto, setHasPhoto] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const categories = [
    { id: 'room', label: t.complaint.categories.room, icon: 'home-outline' as const },
    { id: 'food', label: t.complaint.categories.food, icon: 'restaurant-outline' as const },
    { id: 'maintenance', label: t.complaint.categories.maintenance, icon: 'construct-outline' as const },
    { id: 'staff', label: t.complaint.categories.staff, icon: 'people-outline' as const },
    { id: 'health', label: t.complaint.categories.health, icon: 'medkit-outline' as const },
    { id: 'other', label: t.complaint.categories.other, icon: 'help-circle-outline' as const },
  ];

  const handleSubmit = async () => {
    if (!description.trim()) {
      Alert.alert(
        language === 'ta' ? 'விளக்கம் தேவை' : 'Description required',
        language === 'ta' ? 'தயவுசெய்து புகாரின் விவரங்களை எழுதவும்' : 'Please provide details of your complaint.'
      );
      return;
    }

    triggerHaptic('medium');
    setIsSubmitting(true);
    const cat = categories.find(c => c.id === selectedCategory);

    try {
      await addComplaint({
        categoryKey: selectedCategory,
        titleEn: selectedCategory === 'room' ? 'Bathroom tap leaking' : `${cat?.label} Issue`,
        titleTa: selectedCategory === 'room' ? 'கழிவறை தண்ணீர் கசிகிறது' : `${cat?.label} பிரச்சனை`,
        descriptionEn: description,
        descriptionTa: description,
        photoUrl: hasPhoto
          ? 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=200&auto=format&fit=crop&q=80'
          : undefined
      });

      Alert.alert(
        language === 'ta' ? 'புகார் பெறப்பட்டது' : 'Complaint Registered',
        language === 'ta' ? 'எங்கள் பராமரிப்பு குழு விரைவில் நடவடிக்கை எடுக்கும்.' : 'Ticket dispatched to facility staff.',
        [
          {
            text: 'OK',
            onPress: () => setCurrentScreen(7) // Navigate to Complaint Status
          }
        ]
      );
    } catch {
      Alert.alert('Error', 'Could not register ticket. Please retry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.headerTitleBox}>
        <Text style={styles.subtitle}>{t.complaint.subtitle}</Text>
      </View>

      {/* Category Picker Chips Grid */}
      <View style={styles.chipsGrid}>
        {categories.map(cat => {
          const isSelected = selectedCategory === cat.id;
          return (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryChip,
                isSelected ? styles.categoryChipSelected : null
              ]}
              onPress={() => {
                triggerHaptic('selection');
                setSelectedCategory(cat.id);
              }}
              accessibilityRole="button"
              accessibilityLabel={cat.label}
            >
              <View
                style={[
                  styles.iconWrap,
                  isSelected ? styles.iconWrapSelected : null
                ]}
              >
                <Ionicons
                  name={cat.icon}
                  size={24}
                  color={isSelected ? '#FFFFFF' : '#0F766E'}
                />
              </View>
              <Text
                style={[
                  styles.categoryLabel,
                  isSelected ? styles.categoryLabelSelected : null
                ]}
                numberOfLines={1}
              >
                {cat.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Description Text Input */}
      <View style={styles.inputCard}>
        <Text style={styles.inputLabel}>
          {language === 'ta' ? 'புகார் விவரங்கள்' : 'Complaint Details & Issue'} *
        </Text>
        <TextInput
          style={styles.textArea}
          value={description}
          onChangeText={setDescription}
          placeholder={language === 'ta' ? 'உங்கள் பிரச்சனையை விரிவாக விவரிக்கவும்...' : 'Describe the issue clearly...'}
          placeholderTextColor="#94A3B8"
          multiline
          numberOfLines={4}
        />
      </View>

      {/* Photo Attachment Placeholder */}
      <View style={styles.photoCard}>
        <Text style={styles.inputLabel}>
          {language === 'ta' ? 'புகைப்படம் இணைக்கவும்' : 'Attach Photo (Optional)'}
        </Text>
        <TouchableOpacity
          style={styles.photoUploadBox}
          onPress={() => {
            triggerHaptic('light');
            setHasPhoto(!hasPhoto);
          }}
        >
          <Ionicons
            name={hasPhoto ? 'image' : 'camera-outline'}
            size={32}
            color={hasPhoto ? '#0F766E' : '#64748B'}
          />
          <Text style={styles.photoUploadText}>
            {hasPhoto
              ? (language === 'ta' ? 'புகைப்படம் இணைக்கப்பட்டுள்ளது (1 படம்)' : '1 Photo Attached (Tap to remove)')
              : (language === 'ta' ? 'புகைப்படம் எடுக்க அல்லது பதிவேற்ற தட்டவும்' : 'Tap to take picture or select from gallery')}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Submit Ticket Button (min 50px touch target) */}
      <TouchableOpacity
        style={styles.submitBtn}
        onPress={handleSubmit}
        disabled={isSubmitting}
        accessibilityRole="button"
        accessibilityLabel={t.complaint.submit}
      >
        <Ionicons name="send" size={20} color="#FFFFFF" />
        <Text style={styles.submitBtnText}>
          {isSubmitting
            ? (language === 'ta' ? 'பதிவாகிறது...' : 'Submitting...')
            : t.complaint.submit}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F8FAFC',
    padding: 16,
    paddingBottom: 36,
    gap: 16
  },
  headerTitleBox: {
    paddingVertical: 4
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase'
  },
  chipsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10
  },
  categoryChip: {
    width: '31%',
    minHeight: 88,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    gap: 6,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2
      },
      android: {
        elevation: 1
      }
    })
  },
  categoryChipSelected: {
    backgroundColor: '#F0FDFA',
    borderColor: '#0F766E',
    borderWidth: 2
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#CCFBF1',
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconWrapSelected: {
    backgroundColor: '#0F766E'
  },
  categoryLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155',
    textAlign: 'center'
  },
  categoryLabelSelected: {
    color: '#0F766E',
    fontWeight: '800'
  },
  inputCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 8
  },
  textArea: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    color: '#0F172A',
    minHeight: 100,
    textAlignVertical: 'top'
  },
  photoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  photoUploadBox: {
    backgroundColor: '#F8FAFC',
    borderWidth: 2,
    borderColor: '#CBD5E1',
    borderStyle: 'dashed',
    borderRadius: 14,
    minHeight: 88,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    gap: 6
  },
  photoUploadText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
    textAlign: 'center'
  },
  submitBtn: {
    backgroundColor: '#0F766E',
    minHeight: 54,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
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
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800'
  }
});
