import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { BASE_COLORS } from '@/styles/color';
import Check from '@/assets/svgs/check.svg';
import { SCREEN_LIST } from '@/constants/screen';

export default function OrderSuccessfulScreen() {
  const navigation = useAppNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Check width={80} height={80} />
      </View>
      <Text style={styles.title}>Đặt hàng thành công!</Text>
      <Text style={styles.message}>
        Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi.
      </Text>

      <TouchableOpacity
        style={[styles.footerBtn, styles.btnPrimary]}
        onPress={() => navigation.navigate(SCREEN_LIST.TUTORIAL_LIST)}
      >
        <Text style={[styles.btnText, styles.goToTutorial]}>
          Xem cẩm nang trồng cây
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.footerBtn}
        onPress={() => navigation.navigate(SCREEN_LIST.HOME)}
      >
        <Text style={[styles.btnText, styles.goToHomePage]}>
          Quay về trang chủ
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BASE_COLORS.white,
    padding: 16,
  },
  iconContainer: {
    marginBottom: 32,
    alignItems: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: BASE_COLORS.primary,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: BASE_COLORS.primary,
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
    color: BASE_COLORS.gray_80,
    textAlign: 'center',
    marginBottom: 32,
  },
  footerBtn: {
    width: '100%',
    height: 50,
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  btnPrimary: {
    backgroundColor: BASE_COLORS.primary,
  },
  btnText: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500',
  },
  goToTutorial: {
    color: BASE_COLORS.white,
  },
  goToHomePage: {
    color: BASE_COLORS.black,
    textDecorationLine: 'underline',
  },
});
