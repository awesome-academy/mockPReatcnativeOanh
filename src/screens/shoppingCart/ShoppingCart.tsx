import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { RootState } from '@/stores/store';
import {
  decrease,
  increase,
  removeAllItems,
  removeItem,
  resetSelected,
  toggleSelect,
} from '@/stores/shoppingCart';
import { BASE_COLORS } from '@/styles/color';
import { Product } from '@/types/product';
import { ScreenHeader } from '@/components/molecules/ScreenHeader';
import { SCREEN_LIST_TITLE } from '@/constants/product';
import { commonStyles } from '@/styles/common';
import { useConfirmDialog } from '@/hooks/useConfirmDialog';
import CartItem from '@/components/organisms/product/CartItem';
import TrashIcon from '@/assets/svgs/trash.svg';
import Toast from 'react-native-toast-message';

export default function ShoppingCartScreen() {
  const navigation = useAppNavigation();
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.shoppingCart.items);
  const confirm = useConfirmDialog();

  useFocusEffect(
    useCallback(() => {
      dispatch(resetSelected());
    }, [dispatch]),
  );

  const total = items
    .filter(i => i.selected)
    .reduce((sum, i) => sum + i.price * i.quantity, 0);

  const handleDelete = async (id: string) => {
    const ok = await confirm({
      title: 'Xác nhận xoá đơn hàng?',
      message: 'Thao tác này sẽ không thể khôi phục.',
    });

    if (ok) {
      dispatch(removeItem(id));
      Toast.show({
        type: 'success',
        text1: 'Thành công',
        text2: 'Đã xóa sản phẩm khỏi giỏ hàng',
        visibilityTime: 2000,
        autoHide: true,
      });
    }
  };

  const handleRemoveAll = async () => {
    const ok = await confirm({
      title: 'Xác nhận xoá tất cả đơn hàng?',
      message: 'Thao tác này sẽ không thể khôi phục.',
    });

    if (ok) {
      dispatch(removeAllItems());
      Toast.show({
        type: 'success',
        text1: 'Thành công',
        text2: 'Đã xóa toàn bộ giỏ hàng',
        visibilityTime: 2000,
        autoHide: true,
      });
    }
  };

  const renderItem = ({ item }: { item: Product }) => (
    <CartItem
      item={item}
      onToggleSelect={() => dispatch(toggleSelect(item.id))}
      onIncrease={() => dispatch(increase(item.id))}
      onDecrease={() => dispatch(decrease(item.id))}
      onRemove={() => handleDelete(item.id)}
    />
  );

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScreenHeader
        title={SCREEN_LIST_TITLE.SHOPPING_CART}
        onBackPress={() => navigation.goBack()}
        rightIcon={<TrashIcon width={24} height={24} />}
        onRightIconPress={handleRemoveAll}
      />
      <View style={styles.body}>
        <FlatList
          data={items}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={commonStyles.center}>
              Giỏ hàng của bạn hiện đang trống
            </Text>
          }
        />

        {items.length > 0 && (
          <View style={styles.footer}>
            <View style={commonStyles.flex_row}>
              <Text style={styles.footerText}>Tạm tính</Text>
              <Text style={styles.total}>{total.toLocaleString()}đ</Text>
            </View>
            <TouchableOpacity style={styles.buyButton}>
              <Text style={styles.buyText}>Tiến hành thanh toán</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: BASE_COLORS.white,
  },
  footer: {
    borderTopWidth: 1,
    borderColor: BASE_COLORS.gray_20,
    padding: 16,
    gap: 16,
  },
  footerText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: BASE_COLORS.gray_80,
  },
  total: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500',
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
});
