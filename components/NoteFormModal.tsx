import { Colors } from '@/constants/Colors';
import { Note } from '@/types';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, TextInput, useColorScheme, View } from 'react-native';
import Modal from './ui/Modal';
import ThemedButton from './ui/ThemedButton';
import ThemedText from './ui/ThemedText';

type FormData = {
  title: string;
  content: string;
};

interface NoteFormModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  initialData?: Note | null;
  isLoading?: boolean;
}

export default function NoteFormModal({
  visible,
  onClose,
  onSubmit,
  initialData,
  isLoading,
}: NoteFormModalProps) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: '',
      content: '',
    },
  });

  useEffect(() => {
    if (visible) {
      reset({
        title: initialData?.title || '',
        content: initialData?.content || '',
      });
    }
  }, [visible, initialData, reset]);

  const handleFormSubmit = (data: FormData) => {
    onSubmit(data);
  };

  const inputStyle = [
    styles.input,
    {
      color: theme.text,
      borderColor: theme.border,
      backgroundColor: theme.background,
    },
  ];

  return (
    <Modal visible={visible} onClose={onClose}>
      <View style={styles.header}>
        <ThemedText variant="subtitle">
          {initialData ? 'Редагувати нотатку' : 'Нова нотатка'}
        </ThemedText>
      </View>

      {/* Поле заголовка */}
      <Controller
        control={control}
        name="title"
        rules={{ required: 'Заголовок обов’язковий' }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[inputStyle, styles.titleInput]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Заголовок"
            placeholderTextColor={theme.icon}
            autoFocus={true}
          />
        )}
      />
      {errors.title && <ThemedText style={styles.errorText}>{errors.title.message}</ThemedText>}

      {/* Поле контенту */}
      <Controller
        control={control}
        name="content"
        rules={{ required: 'Текст нотатки не може бути порожнім' }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[inputStyle, styles.contentInput]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Текст нотатки..."
            placeholderTextColor={theme.icon}
            multiline
            textAlignVertical="top"
          />
        )}
      />
      {errors.content && <ThemedText style={styles.errorText}>{errors.content.message}</ThemedText>}

      <View style={styles.actions}>
        <ThemedButton
          title="Скасувати"
          variant="secondary"
          onPress={onClose}
          style={{ flex: 1, marginRight: 8 }}
        />
        <ThemedButton
          title={initialData ? 'Зберегти' : 'Створити'}
          variant="primary"
          onPress={handleSubmit(handleFormSubmit)}
          isLoading={isLoading}
          style={{ flex: 1, marginLeft: 8 }}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 16,
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 8,
  },
  titleInput: {
    fontWeight: 'bold',
  },
  contentInput: {
    minHeight: 120,
    marginBottom: 16,
  },
  errorText: {
    color: '#ff4444',
    marginBottom: 10,
    fontSize: 12,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
