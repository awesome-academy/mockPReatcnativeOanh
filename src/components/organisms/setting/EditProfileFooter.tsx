import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { BASE_COLORS } from '@/styles/color';

type Props = {
  isFormValid: boolean;
  onSave: () => void;
};

export function EditProfileFooter({ isFormValid, onSave }: Props) {
  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={[styles.footerBtn, isFormValid && styles.btnPrimary]}
        onPress={onSave}
        disabled={!isFormValid}
      >
        <Text style={styles.btnText}>LƯU THÔNG TIN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    padding: 24,
    backgroundColor: '#fff',
  },
  footerBtn: {
    height: 50,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: BASE_COLORS.gray_60,
  },
  btnPrimary: {
    backgroundColor: BASE_COLORS.primary,
  },
  btnText: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '500',
    color: BASE_COLORS.white,
  },
});
