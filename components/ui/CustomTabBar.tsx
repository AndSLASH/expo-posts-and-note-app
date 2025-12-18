import { Colors } from '@/constants/Colors';
import { TABS_CONFIG } from '@/constants/Tabs';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import ThemedText from './ThemedText';

interface CustomTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
  colorScheme: 'light' | 'dark';
}

const CustomTabBar: React.FC<CustomTabBarProps> = ({
  state,
  descriptors,
  navigation,
  colorScheme,
}) => {
  const theme = Colors[colorScheme];
  return (
    <View
      style={[styles.tabBar, { backgroundColor: theme.secondaryBg, shadowColor: theme.shadow }]}
    >
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;
        const isFocused = state.index === index;
        const tabConfig = TABS_CONFIG.find((t) => t.name === route.name);
        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={() => navigation.navigate(route.name)}
            style={styles.tab}
            activeOpacity={0.7}
          >
            <Ionicons
              name={tabConfig?.icon || 'ellipse'}
              size={26}
              color={isFocused ? theme.tint : theme.tabIconDefault}
            />
            <ThemedText
              style={{
                color: isFocused ? theme.tint : theme.tabIconDefault,
                fontSize: 13,
                marginTop: 2,
              }}
            >
              {label}
            </ThemedText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
    paddingTop: 8,
    elevation: 8,
    zIndex: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
});

export default CustomTabBar;
