import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { AppInput } from '@/components/atoms/AppInput';
import { BASE_COLORS } from '@/styles/color';
import { CheckoutFormType } from '@/types/product';
import {
  PAYMENT_METHOD_CODE,
  PAYMENT_METHOD_TITLE,
  TRANSPORT_METHOD_CODE,
  TRANSPORT_METHOD_DESCRIPTION,
  TRANSPORT_METHOD_TITLE,
} from '@/constants/product';
import OptionList from '@/components/molecules/product/OptionList';

type Props = {
  formData: CheckoutFormType;
  fieldErrors: Partial<Record<keyof CheckoutFormType, string>>;
  onChange: (field: keyof CheckoutFormType, value: string | number) => void;
};

export function CheckoutForm({ formData, fieldErrors, onChange }: Props) {
  const TRANSPORT_METHOD_OPTIONS = Object.values(TRANSPORT_METHOD_CODE)
    .filter(v => typeof v === 'number')
    .map(v => ({
      id: v as TRANSPORT_METHOD_CODE,
      label: TRANSPORT_METHOD_TITLE[v as TRANSPORT_METHOD_CODE],
      description: TRANSPORT_METHOD_DESCRIPTION[v as TRANSPORT_METHOD_CODE],
    }));

  const PAYMENT_METHOD_OPTIONS = Object.values(PAYMENT_METHOD_CODE)
    .filter(v => typeof v === 'number')
    .map(v => ({
      id: v as PAYMENT_METHOD_CODE,
      label: PAYMENT_METHOD_TITLE[v as PAYMENT_METHOD_CODE],
    }));

  return (
    <ScrollView contentContainerStyle={styles.body}>
      <Text style={styles.title}>Thông tin khách hàng</Text>
      <View>
        <AppInput
          placeholder="Họ và tên"
          value={formData.userName}
          onChangeText={text => onChange('userName', text)}
          error={fieldErrors.userName}
          style={styles.input}
        />
        <AppInput
          placeholder="E-mail"
          value={formData.email}
          onChangeText={text => onChange('email', text)}
          keyboardType="email-address"
          error={fieldErrors.email}
          style={styles.input}
        />
        <AppInput
          placeholder="Địa chỉ"
          value={formData.address}
          onChangeText={text => onChange('address', text)}
          error={fieldErrors.address}
          style={styles.input}
        />
        <AppInput
          placeholder="Số điện thoại"
          value={formData.phoneNumber}
          onChangeText={text => onChange('phoneNumber', text)}
          keyboardType="phone-pad"
          error={fieldErrors.phoneNumber}
          style={styles.input}
        />
      </View>
      <Text style={styles.title}>Phương thức vận chuyển</Text>
      <OptionList
        options={TRANSPORT_METHOD_OPTIONS}
        selectedId={formData.transport_method}
        onSelect={id => onChange('transport_method', id)}
      />

      <Text style={styles.title}>Hình thức thanh toán</Text>
      {formData.transport_method === TRANSPORT_METHOD_CODE.FAST && (
        <OptionList
          options={PAYMENT_METHOD_OPTIONS}
          selectedId={formData.payment_method}
          onSelect={id => onChange('payment_method', id)}
        />
      )}
      {formData.transport_method === TRANSPORT_METHOD_CODE.COD && (
        <Text style={styles.paymentMethodOption}>
          Thanh toán khi nhận hàng (COD)
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500',
    paddingBottom: 2,
    borderBottomWidth: 1,
    borderColor: BASE_COLORS.gray_100,
  },
  body: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 48,
    gap: 16,
    backgroundColor: BASE_COLORS.white,
  },
  input: {
    borderWidth: 0,
    borderBottomColor: BASE_COLORS.gray_40,
    borderBottomWidth: 1,
    borderRadius: 0,
    paddingHorizontal: 4,
    height: 36,
  },
  paymentMethodOption: {
    paddingBottom: 2,
    borderBottomWidth: 1,
    borderColor: BASE_COLORS.gray_40,
  },
  selectedOption: {
    borderColor: BASE_COLORS.primary,
    backgroundColor: BASE_COLORS.primary,
  },
});
