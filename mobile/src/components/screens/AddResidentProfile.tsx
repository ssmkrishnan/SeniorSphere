import React, { useState, useEffect } from 'react';
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

export const AddResidentProfile: React.FC = () => {
  const { t, language, profile, updateProfile, setCurrentScreen } = useApp();
  const [formData, setFormData] = useState(profile);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      Alert.alert(
        language === 'ta' ? 'தேவையான தகவல்' : 'Required Information',
        language === 'ta' ? 'தயவுசெய்து உங்கள் பெயரை உள்ளிடவும்' : 'Please enter your full name.'
      );
      return;
    }

    triggerHaptic('medium');
    setIsSubmitting(true);
    try {
      await updateProfile(formData);
      Alert.alert(
        language === 'ta' ? 'வெற்றி' : 'Success',
        language === 'ta' ? 'சுயவிவரம் புதுப்பிக்கப்பட்டது!' : 'Resident profile saved successfully!',
        [
          {
            text: 'OK',
            onPress: () => {
              setCurrentScreen(3); // Navigate to Emergency SOS Screen
            }
          }
        ]
      );
    } catch {
      Alert.alert('Error', 'Could not save profile. Please retry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
      {/* Informative Banner */}
      <View style={styles.infoBanner}>
        <Ionicons name="information-circle" size={24} color="#4F46E5" />
        <Text style={styles.infoBannerText}>{t.profileForm.infoBanner}</Text>
      </View>

      {/* Card 1: Personal Details */}
      <View style={styles.formCard}>
        <View style={styles.cardHeader}>
          <MaterialCommunityIcons name="account" size={20} color="#0F766E" />
          <Text style={styles.cardHeaderTitle}>{t.profileForm.personalInfo}</Text>
        </View>

        {/* Full Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>{t.profileForm.fullName} *</Text>
          <TextInput
            style={styles.input}
            value={formData.name}
            onChangeText={txt => setFormData(prev => ({ ...prev, name: txt }))}
            placeholder={language === 'ta' ? 'உதாரணம்: ராமசாமி / சாந்தா' : 'e.g., Sundaram R / Shanti Devi'}
            placeholderTextColor="#94A3B8"
          />
        </View>

        {/* DOB & Gender Row */}
        <View style={styles.row}>
          <View style={[styles.inputGroup, styles.flex1]}>
            <Text style={styles.label}>{t.profileForm.dob}</Text>
            <TextInput
              style={styles.input}
              value={formData.dob}
              onChangeText={txt => setFormData(prev => ({ ...prev, dob: txt }))}
              placeholder="e.g. 15 Aug 1950"
              placeholderTextColor="#94A3B8"
            />
          </View>

          <View style={[styles.inputGroup, styles.flex1]}>
            <Text style={styles.label}>{t.profileForm.gender}</Text>
            <View style={styles.genderRow}>
              {(['Female', 'Male'] as const).map(g => {
                const isSelected =
                  formData.gender.toLowerCase() === g.toLowerCase() ||
                  (g === 'Female' && formData.gender === t.profileForm.genderFemale) ||
                  (g === 'Male' && formData.gender === t.profileForm.genderMale);

                return (
                  <TouchableOpacity
                    key={g}
                    style={[styles.genderChip, isSelected ? styles.genderChipSelected : null]}
                    onPress={() => {
                      triggerHaptic('selection');
                      setFormData(prev => ({
                        ...prev,
                        gender: language === 'ta' ? (g === 'Female' ? 'பெண்' : 'ஆண்') : g
                      }));
                    }}
                  >
                    <Text
                      style={[
                        styles.genderChipText,
                        isSelected ? styles.genderChipTextSelected : null
                      ]}
                    >
                      {g === 'Female' ? t.profileForm.genderFemale : t.profileForm.genderMale}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>

        {/* Blood Group */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>{t.profileForm.bloodGroup}</Text>
          <View style={styles.bloodGroupRow}>
            {['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-'].map(bg => {
              const isSelected = formData.bloodGroup === bg;
              return (
                <TouchableOpacity
                  key={bg}
                  style={[styles.bloodChip, isSelected ? styles.bloodChipSelected : null]}
                  onPress={() => {
                    triggerHaptic('selection');
                    setFormData(prev => ({ ...prev, bloodGroup: bg }));
                  }}
                >
                  <Text style={[styles.bloodChipText, isSelected ? styles.bloodChipTextSelected : null]}>
                    {bg}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>

      {/* Card 2: Residence Details */}
      <View style={styles.formCard}>
        <View style={styles.cardHeader}>
          <MaterialCommunityIcons name="office-building" size={20} color="#0F766E" />
          <Text style={styles.cardHeaderTitle}>
            {language === 'ta' ? 'குடியிருப்பு அமைவிடம்' : 'Residence Location'}
          </Text>
        </View>

        <View style={styles.row}>
          <View style={[styles.inputGroup, styles.flex1]}>
            <Text style={styles.label}>{t.profileForm.room} *</Text>
            <TextInput
              style={styles.input}
              value={formData.room}
              onChangeText={txt => setFormData(prev => ({ ...prev, room: txt }))}
              placeholder="e.g. 204"
              placeholderTextColor="#94A3B8"
            />
          </View>
          <View style={[styles.inputGroup, styles.flex1]}>
            <Text style={styles.label}>{t.profileForm.block} *</Text>
            <TextInput
              style={styles.input}
              value={formData.block}
              onChangeText={txt => setFormData(prev => ({ ...prev, block: txt }))}
              placeholder="e.g. Block B"
              placeholderTextColor="#94A3B8"
            />
          </View>
        </View>
      </View>

      {/* Card 3: Medical & Health Conditions */}
      <View style={styles.formCard}>
        <View style={styles.cardHeader}>
          <MaterialCommunityIcons name="heart-pulse" size={20} color="#DC2626" />
          <Text style={styles.cardHeaderTitle}>{t.profileForm.medicalInfo}</Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>{t.profileForm.conditions}</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.medicalConditions}
            onChangeText={txt => setFormData(prev => ({ ...prev, medicalConditions: txt }))}
            placeholder={language === 'ta' ? 'உதாரணம்: நீரிழிவு, உயர் ரத்த அழுத்தம்' : 'e.g. Hypertension, Type 2 Diabetes'}
            placeholderTextColor="#94A3B8"
            multiline
            numberOfLines={2}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>{t.profileForm.allergies}</Text>
          <TextInput
            style={styles.input}
            value={formData.allergies}
            onChangeText={txt => setFormData(prev => ({ ...prev, allergies: txt }))}
            placeholder={language === 'ta' ? 'உதாரணம்: வேர்க்கடலை, பென்சிலின்' : 'e.g. Penicillin, Peanuts, None'}
            placeholderTextColor="#94A3B8"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>{t.profileForm.medications}</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.currentMedications}
            onChangeText={txt => setFormData(prev => ({ ...prev, currentMedications: txt }))}
            placeholder={language === 'ta' ? 'உதாரணம்: Metformin 500mg, Amlodipine 5mg' : 'e.g. Metformin 500mg (Morning), Amlodipine 5mg'}
            placeholderTextColor="#94A3B8"
            multiline
            numberOfLines={2}
          />
        </View>
      </View>

      {/* Save Button (min 50px height) */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
        disabled={isSubmitting}
        accessibilityRole="button"
        accessibilityLabel={t.profileForm.save}
      >
        <Ionicons name="checkmark-circle" size={22} color="#FFFFFF" />
        <Text style={styles.submitButtonText}>
          {isSubmitting
            ? (language === 'ta' ? 'சேமிக்கிறது...' : 'Saving...')
            : t.profileForm.save}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
    paddingBottom: 32,
    backgroundColor: '#F8FAFC'
  },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    borderWidth: 1,
    borderColor: '#C7D2FE',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    gap: 10
  },
  infoBannerText: {
    flex: 1,
    fontSize: 12,
    color: '#312E81',
    fontWeight: '600',
    lineHeight: 18
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4
      },
      android: {
        elevation: 2
      }
    })
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 10,
    marginBottom: 12
  },
  cardHeaderTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B'
  },
  inputGroup: {
    marginBottom: 12
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 6
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 14,
    color: '#0F172A',
    fontWeight: '600',
    minHeight: 50
  },
  textArea: {
    minHeight: 70,
    textAlignVertical: 'top',
    paddingVertical: 10
  },
  row: {
    flexDirection: 'row',
    gap: 12
  },
  flex1: {
    flex: 1
  },
  genderRow: {
    flexDirection: 'row',
    gap: 6
  },
  genderChip: {
    flex: 1,
    minHeight: 48,
    backgroundColor: '#F1F5F9',
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  genderChipSelected: {
    backgroundColor: '#0F766E',
    borderColor: '#0F766E'
  },
  genderChipText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569'
  },
  genderChipTextSelected: {
    color: '#FFFFFF'
  },
  bloodGroupRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  bloodChip: {
    minWidth: 48,
    height: 42,
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8
  },
  bloodChipSelected: {
    backgroundColor: '#DC2626',
    borderColor: '#DC2626'
  },
  bloodChipText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569'
  },
  bloodChipTextSelected: {
    color: '#FFFFFF'
  },
  submitButton: {
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
        shadowOpacity: 0.3,
        shadowRadius: 6
      },
      android: {
        elevation: 4
      }
    })
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800'
  }
});
