import { Colors } from '@/constants/Colors';
import { AlertConfig } from '@/types';
import React from 'react';
import { Modal, StyleSheet, TouchableWithoutFeedback, View, useColorScheme } from 'react-native';
import ThemedButton from './ThemedButton';
import ThemedText from './ThemedText';
import ThemedView from './ThemedView';

interface CustomAlertProps extends AlertConfig {
  visible: boolean;
  onClose?: () => void;
}

const CustomAlert = ({ visible, title, message, buttons = [], onClose }: CustomAlertProps) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View
          style={[styles.backdrop, { backgroundColor: Colors[colorScheme ?? 'light'].overlay }]}
        >
          <TouchableWithoutFeedback>
            <ThemedView
              style={[
                styles.alertContainer,
                { shadowColor: Colors[colorScheme ?? 'light'].shadow },
              ]}
            >
              <ThemedText variant="subtitle" style={styles.title}>
                {title}
              </ThemedText>
              {message && (
                <ThemedText style={[styles.message, { color: theme.icon }]}>{message}</ThemedText>
              )}
              <View style={styles.buttonContainer}>
                {buttons.map((btn, index) => {
                  let variant: 'primary' | 'secondary' | 'danger' | 'ghost' = 'primary';
                  if (btn.style === 'cancel') variant = 'secondary';
                  if (btn.style === 'destructive') variant = 'danger';

                  return (
                    <ThemedButton
                      key={index}
                      title={btn.text}
                      variant={variant}
                      onPress={() => {
                        if (btn.onPress) btn.onPress();
                        // We don't automatically close here because the parent controls visibility
                        // But usually alerts close on press.
                        // The parent's onPress handler should probably setVisible(false).
                      }}
                      style={styles.button}
                    />
                  );
                })}
              </View>
            </ThemedView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  alertContainer: {
    width: '100%',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  title: {
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    gap: 10,
  },
  button: {
    flex: 1,
  },
});

export default CustomAlert;
