import { Colors } from '@/constants/Colors';
import { ButtonVariant } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  useColorScheme,
} from 'react-native';
import ThemedText from './ThemedText';

interface ThemedButtonProps extends TouchableOpacityProps {
  title?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  iconSize?: number;
  variant?: ButtonVariant;
  isLoading?: boolean;
}

const ThemedButton = (props: ThemedButtonProps) => {
  const {
    title,
    icon,
    iconSize = 20,
    variant = 'primary',
    isLoading = false,
    style,
    disabled,
    ...rest
  } = props;

  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const variantStyles: Record<ButtonVariant, { bg: string; text: string }> = {
    primary: { bg: theme.tint, text: theme.buttonText },
    secondary: { bg: theme.secondary, text: theme.text },
    danger: { bg: theme.danger, text: theme.buttonText },
    ghost: { bg: 'transparent', text: theme.tint },
  };

  const activeStyles = variantStyles[variant];
  const backgroundColor = disabled ? theme.disabled : activeStyles.bg;
  const textColor = disabled ? theme.disabledText : activeStyles.text;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant !== 'ghost' && styles.defaultPadding,
        variant === 'ghost' && styles.ghostButton,
        { backgroundColor },
        style,
      ]}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator color={activeStyles.text} />
      ) : (
        <>
          {icon && (
            <Ionicons
              name={icon}
              size={iconSize}
              color={textColor}
              style={[
                title ? styles.iconRight : undefined,
                // Якщо немає тексту (title), то це просто іконка.
                // Іноді Ionicons мають невеликі відступи.
                // Можна спробувати явно задати розміри контейнера іконки, якщо потрібно.
                { includeFontPadding: false, textAlign: 'center', textAlignVertical: 'center' },
              ]}
            />
          )}
          {title && (
            <ThemedText style={{ color: textColor, fontWeight: '600' }}>{title}</ThemedText>
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  defaultPadding: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  ghostButton: {
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  iconRight: {
    marginRight: 8,
  },
});

export default ThemedButton;
