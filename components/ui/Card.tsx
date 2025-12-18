import { Colors } from '@/constants/Colors';
import React from 'react';
import { StyleSheet, useColorScheme, ViewStyle } from 'react-native';
import ThemedView from './ThemedView';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export function Card({ children, style }: CardProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const shadowColor = theme.shadow;

  return (
    <ThemedView
      style={[styles.card, { shadowColor, borderColor: theme.border, borderWidth: 2 }, style]}
    >
      {children}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
