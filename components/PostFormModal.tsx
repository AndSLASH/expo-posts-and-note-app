import { Colors } from '@/constants/Colors';
import { Post } from '@/types';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, TextInput, useColorScheme, View } from 'react-native';
import Modal from './ui/Modal';
import ThemedButton from './ui/ThemedButton';
import ThemedText from './ui/ThemedText';

type FormData = {
  content: string;
};

interface PostFormModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  initialData?: Post | null;
  isLoading?: boolean;
}

const PostFormModal = (props: PostFormModalProps) => {
  const { visible, onClose, onSubmit, initialData, isLoading = false } = props;
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      content: '',
    },
  });

  const content = watch('content');
  const characterCount = content ? content.length : 0;

  useEffect(() => {
    if (visible) {
      reset({
        content: initialData?.content || '',
      });
    }
  }, [visible, initialData, reset]);

  const handleFormSubmit = (data: FormData) => {
    onSubmit(data);
  };

  return (
    <Modal visible={visible} onClose={onClose}>
      <View style={styles.header}>
        <ThemedText variant="subtitle">{initialData ? 'Редагувати пост' : 'Новий пост'}</ThemedText>
      </View>

      <Controller
        control={control}
        name="content"
        rules={{
          required: 'Текст посту не може бути порожнім',
          maxLength: { value: 300, message: 'Максимальна довжина 300 символів' },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[
              styles.input,
              {
                color: theme.text,
                borderColor: theme.border,
                backgroundColor: theme.background,
              },
            ]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Що у вас нового?"
            placeholderTextColor={theme.icon}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            maxLength={300}
            autoFocus={true}
          />
        )}
      />
      <View style={{ alignItems: 'flex-end', marginBottom: 8 }}>
        <ThemedText style={{ fontSize: 10, color: theme.icon }}>{characterCount}/300</ThemedText>
      </View>
      {errors.content && (
        <ThemedText style={{ color: theme.danger, marginBottom: 10 }}>
          {errors.content.message}
        </ThemedText>
      )}

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
};

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
    minHeight: 100,
    marginBottom: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default PostFormModal;
