import { BASE_COLORS } from '@/styles/color';
import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import CheckIcon from '@/assets/svgs/check.svg';

export default function AppCheckbox({
  checked,
  onPress,
}: {
  checked: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={[styles.box, checked && styles.checked]}>
        {checked && <CheckIcon width={20} height={20} />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { padding: 4 },
  box: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: BASE_COLORS.gray_100,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: BASE_COLORS.gray_100,
  },
});
