import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { AppProvider, useApp } from './src/context/AppContext';
import { MobileHeader } from './src/components/layout/MobileHeader';
import { BottomNav } from './src/components/layout/BottomNav';

// 13 Native Screens
import { Onboarding } from './src/components/screens/Onboarding';
import { AddResidentProfile } from './src/components/screens/AddResidentProfile';
import { EmergencyAlert } from './src/components/screens/EmergencyAlert';
import { CancelAlert } from './src/components/screens/CancelAlert';
import { NotificationSent } from './src/components/screens/NotificationSent';
import { RaiseComplaint } from './src/components/screens/RaiseComplaint';
import { ComplaintStatus } from './src/components/screens/ComplaintStatus';
import { EntertainmentHub } from './src/components/screens/EntertainmentHub';
import { DailyActivities } from './src/components/screens/DailyActivities';
import { CertificationCounselling } from './src/components/screens/CertificationCounselling';
import { Services } from './src/components/screens/Services';
import { ProfileSettings } from './src/components/screens/ProfileSettings';
import { MyCommunity } from './src/components/screens/MyCommunity';

const MainNavigator: React.FC = () => {
  const { currentScreen } = useApp();

  const renderScreen = () => {
    switch (currentScreen) {
      case 1:
        return <Onboarding />;
      case 2:
        return <AddResidentProfile />;
      case 3:
        return <EmergencyAlert />;
      case 4:
        return <CancelAlert />;
      case 5:
        return <NotificationSent />;
      case 6:
        return <RaiseComplaint />;
      case 7:
        return <ComplaintStatus />;
      case 8:
        return <EntertainmentHub />;
      case 9:
        return <DailyActivities />;
      case 10:
        return <CertificationCounselling />;
      case 11:
        return <Services />;
      case 12:
        return <ProfileSettings />;
      case 13:
        return <MyCommunity />;
      default:
        return <DailyActivities />;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
      {/* Top Header Bar */}
      <MobileHeader />

      {/* Dynamic Screen View */}
      <View style={styles.content}>{renderScreen()}</View>

      {/* Bottom Navigation Tab Bar (Hidden on Screen 1) */}
      <BottomNav />
    </SafeAreaView>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <StatusBar style="dark" backgroundColor="#FFFFFF" />
        <MainNavigator />
      </AppProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  content: {
    flex: 1,
    backgroundColor: '#F8FAFC'
  }
});
