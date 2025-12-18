import { Colors } from '@/constants/Colors';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Modal as RNModal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  useColorScheme,
} from 'react-native';
import ThemedView from './ThemedView';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = (props: ModalProps) => {
  const { visible, onClose, children } = props;
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';

  return (
    <RNModal visible={visible} animationType="fade" transparent={true} onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}
      >
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={[styles.backdrop, { backgroundColor: Colors[theme].overlay }]} />
        </TouchableWithoutFeedback>

        <ThemedView style={[styles.content, { shadowColor: Colors[theme].shadow }]}>
          {children}
        </ThemedView>
      </KeyboardAvoidingView>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    borderRadius: 20,
    padding: 20,
    maxWidth: 420,
    width: '100%',
    alignSelf: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default Modal;
