import { ScreenHeader } from '@/components/molecules/ScreenHeader';
import { AppStackParamList } from '@/navigator/AppNavigation';
import { commonStyles } from '@/styles/common';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BASE_COLORS } from '@/styles/color';
import {
  NO_INFORMATION,
  ORDER_STATUS,
  SCREEN_LIST_TITLE,
} from '@/constants/product';
import { useOrderDetail } from '@/hooks/useOrderHistoryDetail';
import OrderDetailInfo from '@/components/organisms/product/OrderDetailInfo';

type OrderDetailScreenProps = NativeStackScreenProps<
  AppStackParamList,
  'OrderDetail'
>;

export default function OrderDetail({
  navigation,
  route,
}: OrderDetailScreenProps) {
  const { id } = route.params;
  const { detail, loading, error, fetchDetail } = useOrderDetail(id);

  const renderHeader = () => {
    return (
      <ScreenHeader
        title={SCREEN_LIST_TITLE.HISTORY}
        onBackPress={() => navigation.navigate('OrderHistory')}
        showShoppingCart={false}
      />
    );
  };

  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        {detail?.status === ORDER_STATUS.SUCCESS && (
          <View style={styles.paymentInfo}>
            <Text style={styles.total}>Đã thanh toán: </Text>
            <Text style={styles.total}>
              {detail?.payment_amount
                ? `${detail?.payment_amount.toLocaleString('vi-VN')}đ`
                : NO_INFORMATION}
            </Text>
          </View>
        )}
        <TouchableOpacity
          style={[styles.footerBtn, styles.btnPrimary]}
          onPress={() => navigation.navigate('TutorialList')}
        >
          <Text style={[styles.btnText, styles.goToTutorial]}>
            Xem cẩm nang trồng cây
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerBtn}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={[styles.btnText, styles.goToHomePage]}>
            Quay về trang chủ
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (loading)
    return <ActivityIndicator size="large" style={commonStyles.center} />;

  return (
    <SafeAreaView style={commonStyles.container}>
      {!error && detail && (
        <>
          {renderHeader()}
          <ScrollView>
            <OrderDetailInfo detail={detail} />
          </ScrollView>
          {renderFooter()}
        </>
      )}
      {error && (
        <View>
          <Text style={commonStyles.center}>Error: {error}</Text>
          <TouchableOpacity onPress={() => fetchDetail()}>
            <Text style={commonStyles.retry}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  footer: {
    padding: 12,
    backgroundColor: '#fff',
  },
  paymentInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  total: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '500',
    color: BASE_COLORS.black,
  },
  footerBtn: {
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
