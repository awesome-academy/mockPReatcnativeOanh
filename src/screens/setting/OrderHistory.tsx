import { useEffect, useCallback } from 'react';
import { AppNavbar } from '@/components/molecules/AppNavbar';
import { ScreenHeader } from '@/components/molecules/ScreenHeader';
import {
  NO_INFORMATION,
  ORDER_STATUS,
  ORDER_STATUS_TITLE,
  SCREEN_LIST_TITLE,
} from '@/constants/product';
import { AppDispatch, RootState } from '@/stores/store';
import { commonStyles } from '@/styles/common';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_COLORS } from '@/styles/color';
import { Order } from '@/types/setting';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { fetchOrderHistory } from '@/stores/orderHistory';

export default function OrderHistoryList() {
  const navigation = useAppNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const { orders, loading, error } = useSelector(
    (state: RootState) => state.orderHistory,
  );

  useEffect(() => {
    dispatch(fetchOrderHistory());
  }, [dispatch]);

  const renderItem = useCallback(
    ({ id, products, order_date, status }: Order) => (
      <>
        {products?.length > 0 ? (
          <TouchableOpacity
            key={id}
            onPress={() => navigation.navigate('OrderDetail', { id })}
          >
            <Text style={styles.orderDate}>{order_date}</Text>
            <View style={styles.item}>
              <Image
                source={
                  products[0]?.image
                    ? { uri: products[0]?.image }
                    : require('@/assets/images/image_failed.png')
                }
                style={styles.image}
              />
              <View style={styles.info}>
                <Text
                  style={[
                    styles.orderStatus,
                    status === ORDER_STATUS.SUCCESS
                      ? commonStyles.success
                      : commonStyles.fail,
                  ]}
                >
                  {ORDER_STATUS_TITLE[status as ORDER_STATUS]}
                </Text>
                <Text style={styles.plantName}>{products[0]?.name}</Text>
                <Text style={styles.plantQuantity}>
                  {products[0]?.quantity
                    ? `${products[0]?.quantity} sản phẩm`
                    : NO_INFORMATION}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          <Text style={commonStyles.defaultDescription}>
            Không có sản phẩm nào
          </Text>
        )}
      </>
    ),
    [navigation],
  );

  if (loading)
    return <ActivityIndicator size="large" style={commonStyles.center} />;

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScreenHeader
        title={SCREEN_LIST_TITLE.HISTORY}
        onBackPress={() => navigation.navigate('Profile')}
        showShoppingCart={false}
      />
      <View style={styles.body}>
        {!error &&
          (orders.length ? (
            <FlatList
              data={orders}
              keyExtractor={item => item.id.toString()}
              numColumns={1}
              renderItem={({ item }) => renderItem(item)}
            />
          ) : (
            <Text style={commonStyles.center}>
              Bạn không có đơn đặt hàng nào.
            </Text>
          ))}
        {error && <Text style={commonStyles.center}>Error: {error}</Text>}
      </View>
      <AppNavbar activeTab="user" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: BASE_COLORS.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item: {
    paddingVertical: 15,
    paddingHorizontal: 48,
    flexDirection: 'row',
    gap: 16,
  },
  orderDate: {
    fontSize: 16,
    lineHeight: 22,
    color: BASE_COLORS.gray_100,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: BASE_COLORS.gray_60,
    marginBottom: 4,
    marginHorizontal: 48,
  },
  image: {
    width: 77,
    height: 74,
    resizeMode: 'cover',
  },
  info: {
    gap: 2,
    justifyContent: 'center',
  },
  orderStatus: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500',
  },
  plantName: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500',
    color: BASE_COLORS.black,
  },
  plantQuantity: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    color: BASE_COLORS.gray_60,
  },
});
