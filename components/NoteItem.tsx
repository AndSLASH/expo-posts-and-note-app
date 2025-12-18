import { Colors } from '@/constants/Colors';
import { Note } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { uk } from 'date-fns/locale';
import React from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';
import { Card } from './ui/Card';
import ThemedButton from './ui/ThemedButton';
import ThemedText from './ui/ThemedText';

interface NoteItemProps {
  note: Note;
  onDelete: (id: string) => void;
  onEdit: (note: Note) => void;
}

const NoteItem = (props: NoteItemProps) => {
  const { note, onDelete, onEdit } = props;
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const timeAgo = formatDistanceToNow(new Date(note.createdAt), {
    addSuffix: true,
    locale: uk,
  });

  return (
    <Card>
      <View style={styles.header}>
        <ThemedText variant="subtitle" style={styles.title} numberOfLines={1}>
          {note.title}
        </ThemedText>
        <ThemedText variant="caption">{timeAgo}</ThemedText>
      </View>

      <ThemedText style={styles.content} numberOfLines={3}>
        {note.content}
      </ThemedText>

      <View style={[styles.actions, { borderTopColor: theme.border }]}>
        <ThemedButton variant="ghost" icon="create-outline" onPress={() => onEdit(note)} />
        <ThemedButton
          variant="ghost"
          icon="trash-outline"
          onPress={() => onDelete(note.id)}
          style={{ marginLeft: 8 }}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    flex: 1,
    marginRight: 8,
  },
  content: {
    marginBottom: 12,
    lineHeight: 22,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 8,
    borderTopWidth: 1,
  },
});

export default NoteItem;
