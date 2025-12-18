import { Colors } from '@/constants/Colors';
import { TextVariant } from '@/types';
import React from 'react';
import { StyleSheet, Text, TextProps, useColorScheme } from 'react-native';

interface ThemedTextProps extends TextProps {
  variant?: TextVariant;
}

const ThemedText = (props: ThemedTextProps) => {
  const { variant = 'default', style, ...rest } = props;

  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <Text
      style={[
        { color: theme.text },
        styles.base,
        variant === 'title' && styles.title,
        variant === 'subtitle' && styles.subtitle,
        variant === 'caption' && [styles.caption, { color: theme.icon }],
        variant === 'bold' && styles.bold,
        style,
      ]}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  base: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
  },
  title: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 24,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 20,
    marginBottom: 4,
  },
  caption: {
    fontSize: 12,
  },
  bold: {
    fontFamily: 'Roboto_700Bold',
  },
});

export default ThemedText;
