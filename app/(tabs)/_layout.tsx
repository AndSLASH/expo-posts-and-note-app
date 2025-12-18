import { TABS_CONFIG } from '@/constants/Tabs';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';

import CustomHeader from '@/components/ui/CustomHeader';
import CustomTabBar from '@/components/ui/CustomTabBar';

const TabLayout = () => {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} colorScheme={colorScheme ?? 'light'} />}
      screenOptions={{
        header: ({ route, options }) => (
          <CustomHeader title={options.title || route.name} colorScheme={colorScheme ?? 'light'} />
        ),
      }}
    >
      {TABS_CONFIG.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabLayout;
