import PostFormModal from '@/components/PostFormModal';
import PostItem from '@/components/PostItem';
import CustomAlert from '@/components/ui/CustomAlert';
import ThemedButton from '@/components/ui/ThemedButton';
import ThemedText from '@/components/ui/ThemedText';
import ThemedView from '@/components/ui/ThemedView';
import { CURRENT_USER } from '@/constants/User';
import { useAlert } from '@/hooks/useAlert';
import { useModalForm } from '@/hooks/useModalForm';
import { usePostsData } from '@/hooks/usePostsData';
import { useSortOrder } from '@/hooks/useSortOrder';
import { useTheme } from '@/hooks/useTheme';
import { Post } from '@/types';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';

const PostsScreen = () => {
  const theme = useTheme();
  const modal = useModalForm<Post>();
  const alert = useAlert();
  const { sortOrder, toggleSortOrder } = useSortOrder();
  const { data: posts, isLoading, error, saveMutation, deleteMutation } = usePostsData();

  const hendleDeletePost = (id: string) => {
    alert.open({
      title: 'Видалити пост?',
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

  const handleEditPost = (post: Post) => {
    modal.open(post);
  };

  const handleSave = (data: { content: string }) => {
    const newPost: Post = {
      id: modal.editing ? modal.editing.id : Date.now().toString(),
      content: data.content,
      createdAt: modal.editing ? modal.editing.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: CURRENT_USER.id,
      username: CURRENT_USER.username,
    };
    saveMutation.mutate(newPost);
  };

  const sortedPosts = [...(posts || [])].sort((a, b) => {
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
        data={sortedPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostItem post={item} onDelete={hendleDeletePost} onEdit={handleEditPost} />
        )}
        contentContainerStyle={[styles.listContent, { marginTop: 8, marginBottom: 32 }]}
        ListEmptyComponent={
          <ThemedView style={styles.center}>
            <ThemedText>Немає постів. Створи перший!</ThemedText>
          </ThemedView>
        }
      />

      <View style={styles.fabContainer}>
        <ThemedButton icon="add" iconSize={32} onPress={handleCreate} style={styles.fab} />
      </View>

      <PostFormModal
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

export default PostsScreen;
