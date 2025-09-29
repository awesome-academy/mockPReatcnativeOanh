import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { commonStyles } from '@/styles/common';
import {
  PLANT_TYPE,
  PRODUCT_TYPE,
  PRODUCT_TYPE_TITLE,
  ProductType,
} from '@/constants/product';
import { Plant } from '@/types/product';
import { BASE_COLORS } from '@/styles/color';

type ProductDetailContentProps = {
  detail: any;
  type: ProductType;
};

export const ProductDetailContent: React.FC<ProductDetailContentProps> = ({
  detail,
  type,
}) => {
  const productInfo = [
    { title: 'Kích cỡ', value: detail?.size || '' },
    { title: 'Xuất sứ', value: detail?.origin || '' },
  ];

  const renderItem = ({ title, value }: { title: string; value: string }) => (
    <View style={styles.productInfoContainer}>
      <Text style={styles.productInfoTitle}>{title}</Text>
      <Text style={styles.productInfoValue}>{value}</Text>
    </View>
  );
  return (
    <View>
      <Image
        source={
          detail?.image
            ? { uri: detail?.image }
            : require('@/assets/images/image_failed.png')
        }
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <View style={commonStyles.flex_row}>
          <Text style={styles.badge}>
            {PRODUCT_TYPE_TITLE[type as keyof typeof PRODUCT_TYPE_TITLE]}
          </Text>
          {type === PRODUCT_TYPE.PLANT && (
            <Text style={styles.badge}>
              {PLANT_TYPE[(detail as Plant).type as keyof typeof PLANT_TYPE]}
            </Text>
          )}
        </View>
        <Text style={styles.price}>
          {detail?.price
            ? `${detail?.price.toLocaleString('vi-VN')}đ`
            : 'Chưa có thông tin về giá'}
        </Text>
        <Text style={styles.detail}>Chi tiết sản phẩm</Text>
        {type === PRODUCT_TYPE.PLANT &&
          productInfo.map((item, idx) => (
            <View key={idx}>{renderItem(item)}</View>
          ))}
        <View style={styles.productInfoContainer}>
          <Text style={styles.productInfoTitle}>Tình trạng</Text>
          <Text style={styles.productInfoValue}>
            {(detail?.remaining_quantity ?? 0) > 0 ? (
              <Text style={styles.avaiable}>{`Còn ${
                detail?.remaining_quantity ?? 0
              } sp`}</Text>
            ) : (
              <Text style={styles.outOfStock}>Hết hàng</Text>
            )}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 40,
    backgroundColor: BASE_COLORS.white,
    gap: 16,
  },
  image: {
    width: '100%',
    height: 268,
    marginBottom: 16,
  },
  badge: {
    backgroundColor: BASE_COLORS.primary,
    color: BASE_COLORS.white,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 14,
    lineHeight: 20,
    height: 28,
    marginRight: 8,
  },
  price: {
    fontSize: 24,
    lineHeight: 34,
    fontWeight: '500',
    color: BASE_COLORS.primary,
  },
  detail: {
    fontSize: 16,
    lineHeight: 22,
    color: BASE_COLORS.gray_80,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: BASE_COLORS.gray_100,
  },
  productInfoContainer: {
    flexDirection: 'row',
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: BASE_COLORS.gray_40,
  },
  productInfoTitle: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: BASE_COLORS.gray_70,
  },
  productInfoValue: {
    fontSize: 14,
    lineHeight: 20,
    color: BASE_COLORS.gray_70,
  },
  avaiable: {
    color: BASE_COLORS.primary,
  },
  outOfStock: {
    color: BASE_COLORS.error,
  },
});
