import { Colors } from '@/constants/Colors';
import { Post } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { formatDistanceToNow } from 'date-fns';
import { uk } from 'date-fns/locale';
import React from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';
import { Card } from './ui/Card';
import ThemedButton from './ui/ThemedButton';
import ThemedText from './ui/ThemedText';

interface PostItemProps {
  post: Post;
  onDelete: (id: string) => void;
  onEdit: (post: Post) => void;
}

const PostItem = (props: PostItemProps) => {
  const { post, onDelete, onEdit } = props;
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const timeAgo = formatDistanceToNow(new Date(post.createdAt), {
    addSuffix: true,
    locale: uk,
  });

  return (
    <Card>
      <View style={styles.header}>
        <View style={styles.authorContainer}>
          <Ionicons
            name="person-circle-outline"
            size={24}
            color={theme.icon}
          />
          <ThemedText style={styles.username}>{post.username}</ThemedText>
        </View>
        <ThemedText variant="caption">{timeAgo}</ThemedText>
      </View>

      <ThemedText style={styles.content}>{post.content}</ThemedText>

      <View style={[styles.actions, { borderTopColor: theme.border }]}>
        <ThemedButton variant="ghost" icon="create-outline" onPress={() => onEdit(post)} />
        <ThemedButton
          variant="ghost"
          icon="trash-outline"
          onPress={() => onDelete(post.id)}
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
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    paddingTop: 8,
  },
});

export default PostItem;
