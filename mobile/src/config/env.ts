import { Platform } from 'react-native';

// Default host determination based on platform / emulator
const getInitialHost = (): string => {
  if (Platform.OS === 'android') {
    // Android emulator loops back to host machine via 10.0.2.2
    return '10.0.2.2:5001';
  }
  // iOS simulator connects directly via localhost
  return 'localhost:5001';
};

class EnvironmentConfig {
  private customHost: string | null = null;

  /**
   * Set custom host (e.g. '192.168.1.100:5001') for physical device testing
   */
  setHost(host: string | null) {
    this.customHost = host;
  }

  getHost(): string {
    return this.customHost || getInitialHost();
  }

  get API_BASE_URL(): string {
    return `http://${this.getHost()}/api`;
  }

  get WS_BASE_URL(): string {
    return `ws://${this.getHost()}/ws`;
  }
}

export const env = new EnvironmentConfig();
export default env;
