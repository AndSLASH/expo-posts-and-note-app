import NoteFormModal from '@/components/NoteFormModal';
import NoteItem from '@/components/NoteItem';
import CustomAlert from '@/components/ui/CustomAlert';
import ThemedButton from '@/components/ui/ThemedButton';
import ThemedText from '@/components/ui/ThemedText';
import ThemedView from '@/components/ui/ThemedView';
import { useAlert } from '@/hooks/useAlert';
import { useModalForm } from '@/hooks/useModalForm';
import { useNotesData } from '@/hooks/useNotesData';
import { useSortOrder } from '@/hooks/useSortOrder';
import { useTheme } from '@/hooks/useTheme';
import { Note } from '@/types';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';

const NotesScreen = () => {
  const theme = useTheme();
  const modal = useModalForm<Note>();
  const alert = useAlert();
  const { sortOrder, toggleSortOrder } = useSortOrder();
  const { data: notes, isLoading, error, saveMutation, deleteMutation } = useNotesData();

  const handleDeleteNote = (id: string) => {
    alert.open({
      title: 'Видалити нотатку?',
      message: 'Цю дію неможливо скасувати.',
      buttons: [
        {
          text: 'Скасувати',
          style: 'cancel',
          onPress: () => alert.close(),
        },
        {
          text: 'Видалити',
          style: 'destructive',
          onPress: () => {
            deleteMutation.mutate(id);
            alert.close();
          },
        },
      ],
    });
  };

  const handleCreate = () => {
    modal.open();
  };

  const handleEditNote = (note: Note) => {
    modal.open(note);
  };

  const handleSave = (data: { title: string; content: string }) => {
    const newNote: Note = {
      id: modal.editing ? modal.editing.id : Date.now().toString(),
      title: data.title,
      content: data.content,
      createdAt: modal.editing ? modal.editing.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    saveMutation.mutate(newNote);
  };

  const sortedNotes = [...(notes || [])].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
  });

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
        <ThemedButton title="Спробувати ще раз" onPress={() => saveMutation.reset()} />
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
        visible={modal.isVisible}
        onClose={modal.close}
        onSubmit={handleSave}
        initialData={modal.editing}
        isLoading={saveMutation.isPending}
      />

      <CustomAlert
        visible={alert.visible}
        title={alert.config.title}
        message={alert.config.message}
        buttons={alert.config.buttons}
        onClose={alert.close}
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
