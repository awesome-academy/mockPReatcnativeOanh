import { BASE_COLORS } from '@/styles/color';
import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';

interface AppInputProps extends TextInputProps {
  label?: string;
  error?: string;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
}

export const AppInput: React.FC<AppInputProps> = ({
  label,
  error,
  style,
  rightIcon,
  onRightIconPress,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            rightIcon ? styles.inputWithIcon : null,
            isFocused && styles.inputFocused,
            error && styles.inputError,
            style,
          ]}
          placeholderTextColor="#8B8B8B"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {rightIcon && (
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={onRightIconPress}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>

      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    height: 48,
    width: '100%',
    borderColor: BASE_COLORS.border,
    borderWidth: 1,
    padding: 0,
    paddingVertical: 8,
    paddingHorizontal: 16,
    textAlignVertical: 'center',
    borderRadius: 10,
    fontSize: 15,
  },
  inputWithIcon: {
    paddingRight: 50,
    overflow: 'hidden',
  },
  inputFocused: {
    borderColor: BASE_COLORS.primary,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: BASE_COLORS.error,
  },
  iconContainer: {
    position: 'absolute',
    right: 16,
    top: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    marginTop: 8,
    fontSize: 12,
    color: BASE_COLORS.error,
  },
});
