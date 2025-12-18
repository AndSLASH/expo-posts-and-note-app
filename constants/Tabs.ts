import { Ionicons } from '@expo/vector-icons';

type IconName = keyof typeof Ionicons.glyphMap;

export const TABS_CONFIG = [
  {
    name: 'index',
    title: 'Пости',
    icon: 'newspaper-outline' as IconName,
  },
  {
    name: 'notes',
    title: 'Нотатки',
    icon: 'document-text-outline' as IconName,
  },
];
