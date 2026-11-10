import React from 'react';
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
import { triggerHaptic } from '../../services/haptics';

export const EntertainmentHub: React.FC = () => {
  const { t, language, setCurrentScreen } = useApp();

  const modules = [
    {
      id: 'music',
      name: t.entertainment.modules.music,
      iconFamily: 'ionicons' as const,
      iconName: 'musical-notes',
      bgColor: '#FEF3C7',
      iconColor: '#D97706'
    },
    {
      id: 'movies',
      name: t.entertainment.modules.movies,
      iconFamily: 'ionicons' as const,
      iconName: 'film',
      bgColor: '#FFE4E6',
      iconColor: '#E11D48'
    },
    {
      id: 'audiobooks',
      name: t.entertainment.modules.audiobooks,
      iconFamily: 'ionicons' as const,
      iconName: 'headset',
      bgColor: '#F3E8FF',
      iconColor: '#9333EA'
    },
    {
      id: 'games',
      name: t.entertainment.modules.games,
      iconFamily: 'ionicons' as const,
      iconName: 'game-controller',
      bgColor: '#D1FAE5',
      iconColor: '#059669'
    },
    {
      id: 'devotional',
      name: t.entertainment.modules.devotional,
      iconFamily: 'material' as const,
      iconName: 'hands-pray',
      bgColor: '#FFEDD5',
      iconColor: '#EA580C'
    },
    {
      id: 'news',
      name: t.entertainment.modules.news,
      iconFamily: 'ionicons' as const,
      iconName: 'newspaper',
      bgColor: '#E0F2FE',
      iconColor: '#0284C7'
    },
    {
      id: 'brainGames',
      name: t.entertainment.modules.brainGames,
      iconFamily: 'material' as const,
      iconName: 'brain',
      bgColor: '#E0E7FF',
      iconColor: '#4F46E5'
    },
    {
      id: 'liveTv',
      name: t.entertainment.modules.liveTv,
      iconFamily: 'ionicons' as const,
      iconName: 'tv',
      bgColor: '#CFFAFE',
      iconColor: '#0891B2'
    },
    {
      id: 'activities',
      name: t.entertainment.modules.activities,
      iconFamily: 'ionicons' as const,
      iconName: 'calendar',
      bgColor: '#CCFBF1',
      iconColor: '#0D9488'
    }
  ];

  const handleModuleClick = (mod: typeof modules[0]) => {
    triggerHaptic('medium');
    if (mod.id === 'activities') {
      setCurrentScreen(9); // Navigate to Daily Activities
    } else {
      Alert.alert(
        mod.name,
        language === 'ta'
          ? `${mod.name} பகுதி திறக்கப்படுகிறது... தயவுசெய்து காத்திருக்கவும்.`
          : `Launching ${mod.name} player for seniors.`
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Hero Banner with Friendly Atmosphere */}
      <View style={styles.heroBanner}>
        <View style={styles.heroTextContainer}>
          <Text style={styles.heroTitle}>
            {language === 'ta' ? 'இசை & பொழுதுபோக்கு' : 'Joy & Leisure Hub'}
          </Text>
          <Text style={styles.heroSubtitle}>
            {language === 'ta'
              ? 'உங்கள் மனதை உற்சாகப்படுத்த பாடல்கள், பக்தி மற்றும் விளையாட்டுகள்'
              : 'Relaxing songs, classical movies, devotional chants & puzzles designed for elders.'}
          </Text>
        </View>
        <View style={styles.heroIconBadge}>
          <MaterialCommunityIcons name="music-clef-treble" size={36} color="#FFFFFF" />
        </View>
      </View>

      {/* Grid of 9 Entertainment Cards */}
      <View style={styles.grid}>
        {modules.map(mod => (
          <TouchableOpacity
            key={mod.id}
            style={styles.card}
            activeOpacity={0.7}
            onPress={() => handleModuleClick(mod)}
            accessibilityRole="button"
            accessibilityLabel={mod.name}
          >
            <View style={[styles.iconContainer, { backgroundColor: mod.bgColor }]}>
              {mod.iconFamily === 'ionicons' ? (
                <Ionicons name={mod.iconName as any} size={28} color={mod.iconColor} />
              ) : (
                <MaterialCommunityIcons name={mod.iconName as any} size={28} color={mod.iconColor} />
              )}
            </View>
            <Text style={styles.cardTitle} numberOfLines={2}>
              {mod.name}
            </Text>
          </TouchableOpacity>
        ))}
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
  heroBanner: {
    backgroundColor: '#4338CA',
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...Platform.select({
      ios: {
        shadowColor: '#4338CA',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8
      },
      android: {
        elevation: 4
      }
    })
  },
  heroTextContainer: {
    flex: 1,
    paddingRight: 12
  },
  heroTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF'
  },
  heroSubtitle: {
    fontSize: 12,
    color: '#E0E7FF',
    fontWeight: '600',
    marginTop: 6,
    lineHeight: 17
  },
  heroIconBadge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between'
  },
  card: {
    width: '31%',
    minHeight: 104,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    gap: 8,
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
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1E293B',
    textAlign: 'center',
    lineHeight: 16
  }
});
