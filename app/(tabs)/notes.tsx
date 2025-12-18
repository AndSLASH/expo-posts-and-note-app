import NoteFormModal from '@/components/NoteFormModal';
import NoteItem from '@/components/NoteItem';
import CustomAlert from '@/components/ui/CustomAlert';
import ThemedButton from '@/components/ui/ThemedButton';
import ThemedText from '@/components/ui/ThemedText';
import ThemedView from '@/components/ui/ThemedView';
import { Colors } from '@/constants/Colors';
import { deleteNote, getNotes, saveNote } from '@/services/storage';
import { AlertConfig, Note } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, useColorScheme, View } from 'react-native';

const NotesScreen = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const queryClient = useQueryClient();
  const [isModalVisible, setModalVisible] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertConfig, setAlertConfig] = useState<AlertConfig>({
    title: '',
    message: '',
    buttons: [],
  });

  const {
    data: notes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const saveMutation = useMutation({
    mutationFn: saveNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      setModalVisible(false);
      setEditingNote(null);
    },
  });

  const handleDeleteNote = (id: string) => {
    setAlertConfig({
      title: 'Видалити нотатку?',
      message: 'Цю дію неможливо скасувати.',
      buttons: [
        {
          text: 'Скасувати',
          style: 'cancel',
          onPress: () => setAlertVisible(false),
        },
        {
          text: 'Видалити',
          style: 'destructive',
          onPress: () => {
            deleteMutation.mutate(id);
            setAlertVisible(false);
          },
        },
      ],
    });
    setAlertVisible(true);
  };

  const handleCreate = () => {
    setEditingNote(null);
    setModalVisible(true);
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setModalVisible(true);
  };

  const handleSave = (data: { title: string; content: string }) => {
    const newNote: Note = {
      id: editingNote ? editingNote.id : Date.now().toString(),
      title: data.title,
      content: data.content,
      createdAt: editingNote ? editingNote.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    saveMutation.mutate(newNote);
  };

  const sortedNotes = [...(notes || [])].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
  });

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'));
  };

  if (isLoading) {
    return (
      <ThemedView style={styles.center}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={styles.center}>
        <ThemedText style={{ color: theme.danger, marginBottom: 10 }}>
          Помилка: {error.message}
        </ThemedText>
        <ThemedButton
          title="Спробувати ще раз"
          onPress={() => queryClient.invalidateQueries({ queryKey: ['notes'] })}
        />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <ThemedButton
          variant="ghost"
          icon={sortOrder === 'desc' ? 'arrow-down' : 'arrow-up'}
          title={sortOrder === 'desc' ? 'Спочатку нові' : 'Спочатку старі'}
          onPress={toggleSortOrder}
        />
      </View>
      <FlatList
        data={sortedNotes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NoteItem note={item} onDelete={handleDeleteNote} onEdit={handleEditNote} />
        )}
        contentContainerStyle={[styles.listContent, { marginTop: 8, marginBottom: 32 }]}
        ListEmptyComponent={
          <ThemedView style={styles.center}>
            <ThemedText>Немає нотаток. Створи першу!</ThemedText>
          </ThemedView>
        }
      />

      <View style={styles.fabContainer}>
        <ThemedButton icon="add" iconSize={32} onPress={handleCreate} style={styles.fab} />
      </View>

      <NoteFormModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSave}
        initialData={editingNote}
        isLoading={saveMutation.isPending}
      />

      <CustomAlert
        visible={alertVisible}
        title={alertConfig.title}
        message={alertConfig.message}
        buttons={alertConfig.buttons}
        onClose={() => setAlertVisible(false)}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    alignItems: 'flex-end',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  listContent: {
    padding: 16,
    paddingBottom: 80,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 0,
    paddingHorizontal: 0,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default NotesScreen;
