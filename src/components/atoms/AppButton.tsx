import { BASE_COLORS } from '@/styles/color';
import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface BaseButtonProps {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  gradient?: boolean;
  loading?: boolean;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}

export default function AppButton({
  title,
  onPress,
  disabled = false,
  gradient = false,
  loading = false,
  containerStyle,
  textStyle,
}: BaseButtonProps) {
  const isDisabled = disabled || loading;

  const content = (
    <Text style={[styles.text, textStyle, isDisabled && styles.textDisabled]}>
      {loading ? 'Loading...' : title}
    </Text>
  );

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      style={[
        styles.container,
        !gradient && styles.plain,
        isDisabled && styles.disabled,
        containerStyle,
      ]}
    >
      {gradient ? (
        <LinearGradient
          colors={BASE_COLORS.gradient}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          style={styles.gradientContent}
        >
          {content}
        </LinearGradient>
      ) : (
        content
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    borderRadius: 15,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plain: {
    backgroundColor: BASE_COLORS.primary,
  },
  gradientContent: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    color: BASE_COLORS.text,
    fontSize: 20,
    fontWeight: '700',
  },
  textDisabled: {
    color: BASE_COLORS.textDisabled,
  },
});
