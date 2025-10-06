import { useState } from 'react';
import { ScreenHeader } from '@/components/molecules/ScreenHeader';
import { AppStackParamList } from '@/navigator/AppNavigation';
import { commonStyles } from '@/styles/common';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BASE_COLORS } from '@/styles/color';
import { useProductDetail } from '@/hooks/useProductDetail';
import { Counter } from '@/components/molecules/Counter';
import { ProductDetailContent } from '@/components/molecules/product/ProductDetailContent';
import { addToCart } from '@/stores/shoppingCart';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';

type ProductDetailScreenProps = NativeStackScreenProps<
  AppStackParamList,
  'ProductDetail'
>;

export default function ProductDetail({
  navigation,
  route,
}: ProductDetailScreenProps) {
  const dispatch = useDispatch();
  const { id, type } = route.params;
  const { detail, loading, error, fetchDetail } = useProductDetail(id, type);
  const [count, setCount] = useState(0);

  const decrease = () => {
    if (count > 0) setCount(count - 1);
  };

  const increase = () => {
    setCount(count + 1);
  };

  const addProductToShoppingCart = () => {
    dispatch(
      addToCart({
        id: detail?.id ?? '',
        name: detail?.name ?? '',
        image: detail?.image ?? '',
        price: detail?.price ?? 0,
        remaining_quantity: detail?.remaining_quantity ?? 0,
        quantity: count,
        selected: false,
        product_type: type,
      }),
    );

    Toast.show({
      type: 'success',
      text1: 'Thành công',
      text2: 'Sản phẩm đã được thêm vào giỏ hàng',
      visibilityTime: 2000,
      autoHide: true,
    });
    setCount(0);
  };

  const renderHeader = () => {
    return (
      <ScreenHeader
        title={detail?.name ?? ''}
        onBackPress={() => navigation.goBack()}
        titleUppercase={false}
      />
    );
  };

  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.textTop}>Đã chọn {count} sản phẩm</Text>
            <Counter
              count={count}
              max={detail?.remaining_quantity}
              increase={increase}
              decrease={decrease}
            />
          </View>
          <View style={styles.column}>
            <Text style={styles.textTopRight}>Tạm tính</Text>
            <Text style={styles.total}>
              {detail?.price
                ? `${(detail.price * count).toLocaleString('vi-VN')}đ`
                : 'Chưa có thông tin về giá'}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.buyButton, count === 0 && styles.buyButtonDisabled]}
          disabled={count === 0}
          onPress={addProductToShoppingCart}
        >
          <Text style={styles.buyText}>CHỌN MUA</Text>
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
          <FlatList
            data={[detail]}
            keyExtractor={(_, idx) => idx.toString()}
            renderItem={() => (
              <ProductDetailContent detail={detail} type={type} />
            )}
          />
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  column: {
    gap: 12,
  },
  textTop: {
    fontSize: 14,
    lineHeight: 20,
    color: BASE_COLORS.gray_80,
  },
  textTopRight: {
    fontSize: 14,
    lineHeight: 20,
    color: BASE_COLORS.gray_80,
    textAlign: 'right',
  },
  total: {
    fontSize: 24,
    lineHeight: 34,
    fontWeight: '500',
    color: BASE_COLORS.black,
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
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '500',
  },
  buyButtonDisabled: {
    backgroundColor: BASE_COLORS.gray_60,
  },
});
