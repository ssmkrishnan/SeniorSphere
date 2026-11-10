import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Platform } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';
import { triggerHaptic } from '../../services/haptics';
import type { TabId } from '../../types';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, currentScreen, setCurrentScreen, alertActive, t } = useApp();

  // Pulse animation for central SOS button
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(pulseAnim, {
            toValue: 1.15,
            duration: 900,
            useNativeDriver: true
          }),
          Animated.timing(glowAnim, {
            toValue: 0.9,
            duration: 900,
            useNativeDriver: true
          })
        ]),
        Animated.parallel([
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 900,
            useNativeDriver: true
          }),
          Animated.timing(glowAnim, {
            toValue: 0.35,
            duration: 900,
            useNativeDriver: true
          })
        ])
      ])
    );

    pulseLoop.start();

    return () => {
      pulseLoop.stop();
    };
  }, [pulseAnim, glowAnim]);

  // Hide bottom navigation on Screen 1 (Onboarding)
  if (currentScreen === 1) {
    return null;
  }

  const handleTabPress = (tab: TabId) => {
    triggerHaptic(tab === 'alert' ? 'heavy' : 'light');
    setActiveTab(tab);

    switch (tab) {
      case 'home':
        setCurrentScreen(9); // Screen 9: Daily Activities
        break;
      case 'community':
        setCurrentScreen(13); // Screen 13: My Community
        break;
      case 'alert':
        if (alertActive) {
          setCurrentScreen(4); // Screen 4: Alert in Progress
        } else {
          setCurrentScreen(3); // Screen 3: Emergency Alert
        }
        break;
      case 'services':
        setCurrentScreen(11); // Screen 11: Services Directory
        break;
      case 'more':
        setCurrentScreen(12); // Screen 12: Profile & Settings
        break;
    }
  };

  const isAlertActive = currentScreen === 3 || currentScreen === 4 || currentScreen === 5;

  return (
    <View style={styles.container}>
      {/* 1. Home (Screen 9) */}
      <TouchableOpacity
        style={styles.tabButton}
        activeOpacity={0.7}
        onPress={() => handleTabPress('home')}
        accessibilityRole="button"
        accessibilityLabel={t.nav.home}
      >
        <Ionicons
          name={activeTab === 'home' && currentScreen === 9 ? 'home' : 'home-outline'}
          size={24}
          color={activeTab === 'home' && currentScreen === 9 ? '#0F766E' : '#64748B'}
        />
        <Text
          style={[
            styles.tabLabel,
            activeTab === 'home' && currentScreen === 9 ? styles.tabLabelActive : null
          ]}
          numberOfLines={1}
        >
          {t.nav.home}
        </Text>
      </TouchableOpacity>

      {/* 2. Community (Screen 13) */}
      <TouchableOpacity
        style={styles.tabButton}
        activeOpacity={0.7}
        onPress={() => handleTabPress('community')}
        accessibilityRole="button"
        accessibilityLabel={t.nav.community}
      >
        <Ionicons
          name={currentScreen === 13 ? 'people' : 'people-outline'}
          size={24}
          color={currentScreen === 13 ? '#0F766E' : '#64748B'}
        />
        <Text
          style={[
            styles.tabLabel,
            currentScreen === 13 ? styles.tabLabelActive : null
          ]}
          numberOfLines={1}
        >
          {t.nav.community}
        </Text>
      </TouchableOpacity>

      {/* 3. Center SOS Button with Pulsating Ring Animation */}
      <View style={styles.centerButtonWrapper}>
        <Animated.View
          style={[
            styles.pulseRing,
            {
              transform: [{ scale: pulseAnim }],
              opacity: glowAnim
            }
          ]}
        />
        <TouchableOpacity
          style={[
            styles.sosButton,
            (isAlertActive || alertActive) ? styles.sosButtonActive : styles.sosButtonNormal
          ]}
          activeOpacity={0.85}
          onPress={() => handleTabPress('alert')}
          accessibilityRole="button"
          accessibilityLabel={t.nav.alert}
        >
          <MaterialCommunityIcons
            name="bell-ring"
            size={28}
            color="#FFFFFF"
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.centerTabLabel,
            (isAlertActive || alertActive) ? styles.centerTabLabelActive : null
          ]}
        >
          {t.nav.alert}
        </Text>
      </View>

      {/* 4. Services (Screen 11) */}
      <TouchableOpacity
        style={styles.tabButton}
        activeOpacity={0.7}
        onPress={() => handleTabPress('services')}
        accessibilityRole="button"
        accessibilityLabel={t.nav.services}
      >
        <Ionicons
          name={
            currentScreen === 11 || currentScreen === 6 || currentScreen === 7 || currentScreen === 10
              ? 'grid'
              : 'grid-outline'
          }
          size={24}
          color={
            currentScreen === 11 || currentScreen === 6 || currentScreen === 7 || currentScreen === 10
              ? '#0F766E'
              : '#64748B'
          }
        />
        <Text
          style={[
            styles.tabLabel,
            currentScreen === 11 || currentScreen === 6 || currentScreen === 7 || currentScreen === 10
              ? styles.tabLabelActive
              : null
          ]}
          numberOfLines={1}
        >
          {t.nav.services}
        </Text>
      </TouchableOpacity>

      {/* 5. More / Profile (Screen 12) */}
      <TouchableOpacity
        style={styles.tabButton}
        activeOpacity={0.7}
        onPress={() => handleTabPress('more')}
        accessibilityRole="button"
        accessibilityLabel={t.nav.more}
      >
        <Ionicons
          name={currentScreen === 12 || currentScreen === 8 ? 'menu' : 'menu-outline'}
          size={25}
          color={currentScreen === 12 || currentScreen === 8 ? '#0F766E' : '#64748B'}
        />
        <Text
          style={[
            styles.tabLabel,
            currentScreen === 12 || currentScreen === 8 ? styles.tabLabelActive : null
          ]}
          numberOfLines={1}
        >
          {t.nav.more}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingVertical: 6,
    paddingHorizontal: 8,
    minHeight: 64,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.08,
        shadowRadius: 6
      },
      android: {
        elevation: 10
      }
    })
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
    paddingVertical: 4
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 2
  },
  tabLabelActive: {
    color: '#0F766E',
    fontWeight: '800'
  },
  centerButtonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginTop: -22,
    minWidth: 70
  },
  pulseRing: {
    position: 'absolute',
    top: -2,
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: '#FECDD3'
  },
  sosButton: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#DC2626',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 6
      },
      android: {
        elevation: 8
      }
    })
  },
  sosButtonNormal: {
    backgroundColor: '#DC2626'
  },
  sosButtonActive: {
    backgroundColor: '#B91C1C',
    borderWidth: 2,
    borderColor: '#FEE2E2'
  },
  centerTabLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#DC2626',
    marginTop: 3
  },
  centerTabLabelActive: {
    color: '#B91C1C'
  }
});
