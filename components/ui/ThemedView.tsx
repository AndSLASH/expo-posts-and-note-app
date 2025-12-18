import { Colors } from '@/constants/Colors';
import React from 'react';
import { useColorScheme, View, ViewProps } from 'react-native';

interface ThemedViewProps extends ViewProps {
  transparent?: boolean;
}

const ThemedView = (props: ThemedViewProps) => {
  const { style, transparent = false, ...rest } = props;

  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const backgroundColor = transparent ? 'transparent' : theme.background;

  return <View style={[{ backgroundColor }, style]} {...rest} />;
};

export default ThemedView;
