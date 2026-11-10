import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

interface BrandLogoProps {
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'vertical' | 'horizontal';
  taglineText?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  showTagline = true,
  size = 'md',
  variant = 'vertical',
  taglineText
}) => {
  const getBadgeDimensions = () => {
    switch (size) {
      case 'sm':
        return { containerSize: 44, iconSize: 22, heartSize: 12 };
      case 'lg':
        return { containerSize: 84, iconSize: 42, heartSize: 22 };
      case 'xl':
        return { containerSize: 104, iconSize: 52, heartSize: 28 };
      case 'md':
      default:
        return { containerSize: 64, iconSize: 32, heartSize: 16 };
    }
  };

  const getTitleSize = () => {
    switch (size) {
      case 'sm':
        return styles.titleSm;
      case 'lg':
        return styles.titleLg;
      case 'xl':
        return styles.titleXl;
      case 'md':
      default:
        return styles.titleMd;
    }
  };

  const dimensions = getBadgeDimensions();
  const isVertical = variant === 'vertical';

  return (
    <View style={[styles.container, isVertical ? styles.vertical : styles.horizontal]}>
      {/* Emblem with Home + Caring Hands + Heart */}
      <View
        style={[
          styles.emblemWrapper,
          {
            width: dimensions.containerSize,
            height: dimensions.containerSize,
            borderRadius: dimensions.containerSize / 2
          }
        ]}
      >
        {/* Protective Arch & Home Symbol */}
        <MaterialCommunityIcons
          name="home-heart"
          size={dimensions.iconSize}
          color="#0D9488"
        />

        {/* Floating Heart Accent */}
        <View style={styles.heartBadge}>
          <Ionicons
            name="heart"
            size={dimensions.heartSize}
            color="#EF4444"
          />
        </View>
      </View>

      <View style={isVertical ? styles.textCenter : styles.textLeft}>
        <Text style={[styles.title, getTitleSize()]}>
          Senior<Text style={styles.titleAccent}>Sphere</Text>
        </Text>
        {showTagline && (
          <Text style={styles.tagline}>
            {taglineText || 'Connected Care. Comfortable Living.\nஇணைந்த பாதுகாப்பு • வசதியான வாழ்வு'}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  vertical: {
    flexDirection: 'column',
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    gap: 12
  },
  emblemWrapper: {
    backgroundColor: '#F0FDFA',
    borderWidth: 2,
    borderColor: '#CCFBF1',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0F766E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
    position: 'relative'
  },
  heartBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2
  },
  textCenter: {
    alignItems: 'center',
    marginTop: 8
  },
  textLeft: {
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  title: {
    fontWeight: '800',
    color: '#042F2E',
    letterSpacing: -0.5
  },
  titleSm: {
    fontSize: 18
  },
  titleMd: {
    fontSize: 24
  },
  titleLg: {
    fontSize: 30
  },
  titleXl: {
    fontSize: 36
  },
  titleAccent: {
    color: '#0F766E'
  },
  tagline: {
    fontSize: 12,
    fontWeight: '600',
    color: '#115E59',
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 17
  }
});
