import { useCallback, useEffect } from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { BASE_COLORS } from '@/styles/color';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles } from '@/styles/common';
import { ScreenHeader } from '@/components/molecules/ScreenHeader';
import { NO_INFORMATION, SCREEN_LIST_TITLE } from '@/constants/product';
import { AppNavbar } from '@/components/molecules/AppNavbar';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/stores/store';
import { Notification } from '@/types/setting';
import { fetchListNotification } from '@/stores/notification';

export default function NotificationScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { notifications, loading, loadingMore, error, lastVisibleId } =
    useSelector((state: RootState) => state.notification);
  const pageSize = 10;

  useEffect(() => {
    dispatch(fetchListNotification({ pageSize }));
  }, [dispatch]);

  const loadMoreNotifications = () => {
    if (!loadingMore && lastVisibleId) {
      dispatch(fetchListNotification({ pageSize, lastVisibleId }));
    }
  };

  const renderItem = useCallback(
    ({ created_at, title, price, number_of_products }: Notification) => (
      <View>
        <Text style={styles.orderDate}>
          {created_at?.toString() ?? NO_INFORMATION}
        </Text>
        <View style={styles.item}>
          <View style={styles.info}>
            <Text style={styles.orderStatus}>{title ?? NO_INFORMATION}</Text>
            <Text style={styles.plantQuantity}>
              {`${
                typeof price === 'number' ? price.toLocaleString('vi-VN') : 0
              }đ`}
            </Text>
            <Text style={styles.plantQuantity}>
              {typeof number_of_products === 'number'
                ? `${number_of_products} sản phẩm`
                : NO_INFORMATION}
            </Text>
          </View>
        </View>
      </View>
    ),
    [],
  );

  if (loading)
    return <ActivityIndicator size="large" style={commonStyles.center} />;

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScreenHeader
        title={SCREEN_LIST_TITLE.NOTIFICATION}
        showShoppingCart={false}
      />
      <FlatList
        data={notifications}
        keyExtractor={(item, index) => item.id ?? `noti-${index}`}
        renderItem={({ item }) => renderItem(item)}
        onEndReached={loadMoreNotifications}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={
          <Text style={commonStyles.center}>
            Hiện chưa có thông báo nào cho bạn
          </Text>
        }
      />
      {error && <Text style={commonStyles.center}>Error: {error}</Text>}
      <AppNavbar activeTab="noti" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  item: {
    paddingVertical: 8,
    paddingHorizontal: 48,
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
