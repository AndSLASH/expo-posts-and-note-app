import { Note, Post } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
const POSTS_KEY = 'posts_data';
const NOTES_KEY = 'notes_data';

export const getPosts = async (): Promise<Post[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(POSTS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Error reading posts:', error);
    return [];
  }
};

export const savePost = async (post: Post): Promise<void> => {
  try {
    const currentPosts = await getPosts();
    const existingPostIndex = currentPosts.findIndex((p) => p.id === post.id);

    let newPosts;

    if (existingPostIndex >= 0) {
      newPosts = [...currentPosts];
      newPosts[existingPostIndex] = post;
    } else {
      newPosts = [post, ...currentPosts];
    }
    await AsyncStorage.setItem(POSTS_KEY, JSON.stringify(newPosts));
  } catch (error) {
    console.error('Error saving post:', error);
    throw error;
  }
};

export const deletePost = async (id: string): Promise<void> => {
  try {
    const currentPosts = await getPosts();
    const newPosts = currentPosts.filter((post) => post.id !== id);
    await AsyncStorage.setItem(POSTS_KEY, JSON.stringify(newPosts));
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};

export const getNotes = async (): Promise<Note[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(NOTES_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Error reading notes:', error);
    return [];
  }
};

export const saveNote = async (note: Note): Promise<void> => {
  try {
    const currentNotes = await getNotes();
    const existingNoteIndex = currentNotes.findIndex((n) => n.id === note.id);

    let newNotes;

    if (existingNoteIndex >= 0) {
      newNotes = [...currentNotes];
      newNotes[existingNoteIndex] = note;
    } else {
      newNotes = [note, ...currentNotes];
    }
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(newNotes));
  } catch (error) {
    console.error('Error saving note:', error);
    throw error;
  }
};

export const deleteNote = async (id: string): Promise<void> => {
  try {
    const currentNotes = await getNotes();
    const newNotes = currentNotes.filter((note) => note.id !== id);
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(newNotes));
  } catch (error) {
    console.error('Error deleting note:', error);
    throw error;
  }
};
