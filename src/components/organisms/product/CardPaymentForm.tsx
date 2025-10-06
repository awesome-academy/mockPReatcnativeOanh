import { StyleSheet, Text, View } from 'react-native';
import { BASE_COLORS } from '@/styles/color';
import { CardForm } from '@/types/product';
import { AppInput } from '@/components/atoms/AppInput';
import { useState } from 'react';

interface Props {
  formData: CardForm;
  fieldErrors: Partial<Record<keyof CardForm, string>>;
  onChange: (field: keyof CardForm, value: string | number) => void;
}

export const CardPaymentForm = ({ formData, fieldErrors, onChange }: Props) => {
  const [focused, setFocused] = useState<keyof CardForm | null>(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nhập thông tin thẻ</Text>

      <AppInput
        id="card_number"
        placeholder="Số thẻ (XXXX XXXX XXXX XXXX)"
        value={formData.card_number}
        error={fieldErrors.card_number}
        keyboardType="numeric"
        onFocus={() => setFocused('card_number')}
        onBlur={() => setFocused(null)}
        style={[styles.input, focused === 'card_number' && styles.inputFocused]}
        onChangeText={val =>
          onChange(
            'card_number',
            val
              .replace(/\s?/g, '')
              .replace(/(\d{4})/g, '$1 ')
              .trim(),
          )
        }
      />

      <AppInput
        id="card_holder"
        placeholder="Tên chủ thẻ"
        autoCapitalize="characters"
        value={formData.card_holder}
        error={fieldErrors.card_holder}
        onFocus={() => setFocused('card_holder')}
        onBlur={() => setFocused(null)}
        style={[styles.input, focused === 'card_holder' && styles.inputFocused]}
        onChangeText={val => onChange('card_holder', val.toUpperCase())}
      />

      <AppInput
        id="expiry_date"
        placeholder="Ngày hết hạn (MM/YY)"
        keyboardType="numeric"
        value={formData.expiry_date}
        error={fieldErrors.expiry_date}
        onFocus={() => setFocused('expiry_date')}
        onBlur={() => setFocused(null)}
        style={[styles.input, focused === 'expiry_date' && styles.inputFocused]}
        onChangeText={val => onChange('expiry_date', val)}
      />
      <AppInput
        id="cvv"
        placeholder="CVV"
        secureTextEntry
        keyboardType="numeric"
        value={formData.cvv}
        error={fieldErrors.cvv}
        onFocus={() => setFocused('cvv')}
        onBlur={() => setFocused(null)}
        style={[styles.input, focused === 'cvv' && styles.inputFocused]}
        onChangeText={val => onChange('cvv', val)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 48,
    gap: 16,
  },
  title: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500',
    paddingBottom: 2,
    borderBottomWidth: 1,
    borderColor: BASE_COLORS.gray_100,
  },
  input: {
    borderWidth: 0,
    borderBottomColor: BASE_COLORS.gray_40,
    borderBottomWidth: 1,
    borderRadius: 0,
    paddingHorizontal: 4,
    height: 36,
  },
  inputFocused: {
    borderBottomColor: BASE_COLORS.primary,
  },
});
