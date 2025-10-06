import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BASE_COLORS } from '@/styles/color';
import { commonStyles } from '@/styles/common';

type OrderSummaryFooterProps = {
  price: number;
  fee: number;
  total: number;
  buttonText: string;
  disabled: boolean;
  onPress: () => void;
};

export const OrderSummaryFooter = ({
  price,
  fee,
  total,
  buttonText,
  disabled,
  onPress,
}: OrderSummaryFooterProps) => {
  return (
    <View style={styles.footer}>
      <View style={{ gap: 4 }}>
        <View style={commonStyles.flex_row}>
          <Text
            style={[
              styles.flex_1,
              commonStyles.text_14_500,
              { color: BASE_COLORS.gray_60 },
            ]}
          >
            Tạm tính
          </Text>
          <Text style={commonStyles.text_14_500}>
            {typeof price === 'number' ? price.toLocaleString() : 0}đ
          </Text>
        </View>
        <View style={commonStyles.flex_row}>
          <Text
            style={[
              styles.flex_1,
              commonStyles.text_14_500,
              { color: BASE_COLORS.gray_60 },
            ]}
          >
            Phí vận chuyển
          </Text>
          <Text style={commonStyles.text_14_500}>
            {typeof fee === 'number' ? fee.toLocaleString() : 0}đ
          </Text>
        </View>
        <View style={commonStyles.flex_row}>
          <Text
            style={[
              styles.flex_1,
              styles.totalText,
              { color: BASE_COLORS.gray_80 },
            ]}
          >
            Tổng cộng
          </Text>
          <Text style={[styles.totalText, { color: BASE_COLORS.primary }]}>
            {typeof total === 'number' ? total.toLocaleString() : 0}đ
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.buyButton, disabled && styles.buyButtonDisabled]}
        disabled={disabled}
        onPress={onPress}
      >
        <Text style={styles.buyText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    borderTopWidth: 1,
    borderColor: BASE_COLORS.gray_20,
    padding: 16,
    gap: 16,
    backgroundColor: BASE_COLORS.white,
  },
  totalText: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
  },
  flex_1: {
    flex: 1,
  },
  buyButton: {
    height: 50,
    backgroundColor: BASE_COLORS.primary,
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  buyText: {
    color: BASE_COLORS.white,
    fontSize: 18,
    lineHeight: 20,
    fontWeight: '500',
  },
  buyButtonDisabled: {
    backgroundColor: BASE_COLORS.gray_60,
  },
});
