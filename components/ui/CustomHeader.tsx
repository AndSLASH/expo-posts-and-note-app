import { Colors } from '@/constants/Colors';
import React from 'react';
import { Image, Platform, StyleSheet, View } from 'react-native';
import ThemedText from './ThemedText';

interface CustomHeaderProps {
  title: string;
  colorScheme: 'light' | 'dark';
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ title, colorScheme }) => {
  const theme = Colors[colorScheme];

  return (
    <View
      style={[styles.header, { backgroundColor: theme.secondaryBg, shadowColor: theme.shadow }]}
    >
      <View style={styles.leftContent}>
        <Image source={require('@/assets/images/icon.png')} style={styles.logo} />
        <ThemedText variant="bold" style={[styles.title, { color: theme.text }]}>
          {title}
        </ThemedText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: Platform.OS === 'ios' ? 64 : 36,
    paddingBottom: 16,
    paddingHorizontal: 20,
    elevation: 4,
    zIndex: 10,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 12,
  },
  logo: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default CustomHeader;
