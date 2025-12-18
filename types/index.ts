export interface Post {
  id: string;
  userId: string;
  username: string;
  content: string;
  createdAt: string; // ISO date string
  updatedAt?: string; // ISO date string
}

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string; // ISO date string
  updatedAt?: string; // ISO date string
}

export type Theme = 'light' | 'dark';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

export type TextVariant = 'default' | 'title' | 'subtitle' | 'caption' | 'bold';

export interface AlertButton {
  text: string;
  style?: 'default' | 'cancel' | 'destructive';
  onPress?: () => void;
}

export interface AlertConfig {
  title: string;
  message?: string;
  buttons?: AlertButton[];
}
