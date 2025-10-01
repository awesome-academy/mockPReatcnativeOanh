import {
  CASH_ON_DELIVERY_TEXT,
  NO_INFORMATION,
  ORDER_STATUS,
  ORDER_STATUS_TITLE,
  PAYMENT_METHOD_CODE,
  PAYMENT_METHOD_TITLE,
  TRANSPORT_METHOD_CODE,
  TRANSPORT_METHOD_TITLE,
} from '@/constants/product';
import { BASE_COLORS } from '@/styles/color';
import { commonStyles } from '@/styles/common';
import { Order } from '@/types/setting';
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

type OrderSummaryProps = {
  detail: Order;
};

export default function OrderDetailInfo({ detail }: OrderSummaryProps) {
  const renderSection = (title: string, content: React.ReactNode) => (
    <View>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.divider} />
      {content}
    </View>
  );

  const renderPaymentInfo = () => {
    if (detail.transport_method === TRANSPORT_METHOD_CODE.COD) {
      return CASH_ON_DELIVERY_TEXT;
    } else if (detail.transport_method === TRANSPORT_METHOD_CODE.FAST) {
      return (
        PAYMENT_METHOD_TITLE[detail.payment_method as PAYMENT_METHOD_CODE] ??
        NO_INFORMATION
      );
    } else {
      return NO_INFORMATION;
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text
          style={[
            styles.orderStatus,
            detail?.status === ORDER_STATUS.SUCCESS
              ? commonStyles.success
              : commonStyles.fail,
          ]}
        >
          {ORDER_STATUS_TITLE[detail?.status as ORDER_STATUS]}
        </Text>
        <Text
          style={[
            styles.orderStatus,
            detail?.status === ORDER_STATUS.SUCCESS
              ? commonStyles.success
              : commonStyles.fail,
          ]}
        >
          {detail.order_date}
        </Text>
      </View>
      {renderSection(
        'Thông tin khách hàng',
        <>
          <Text style={styles.text}>{detail?.user?.userName ?? ''}</Text>
          <Text style={styles.text}>{detail?.user?.email ?? ''}</Text>
          <Text style={styles.text}>{detail?.user?.address ?? ''}</Text>
          <Text style={styles.text}>{detail?.user?.phoneNumber ?? ''}</Text>
        </>,
      )}

      {renderSection(
        'Phương thức vận chuyển',
        <>
          <Text style={styles.text}>
            {TRANSPORT_METHOD_TITLE[
              detail.transport_method as TRANSPORT_METHOD_CODE
            ] ?? NO_INFORMATION}
          </Text>
        </>,
      )}

      {renderSection(
        'Hình thức thanh toán',
        <Text style={styles.text}>{renderPaymentInfo()}</Text>,
      )}

      {renderSection(
        'Đơn hàng đã chọn',
        <>
          {detail?.products?.length > 0 &&
            detail?.products.map((product, index) => (
              <View key={product?.id ?? `product-${index}`} style={styles.item}>
                <Image
                  source={
                    product?.image
                      ? { uri: product?.image }
                      : require('@/assets/images/image_failed.png')
                  }
                  style={styles.image}
                />
                <View style={styles.info}>
                  <Text style={styles.plantName}>{product?.name}</Text>
                  <Text style={styles.plantQuantity}>
                    {product?.quantity
                      ? `${product?.quantity} sản phẩm`
                      : NO_INFORMATION}
                  </Text>
                </View>
              </View>
            ))}
        </>,
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
    paddingHorizontal: 40,
    gap: 16,
  },
  sectionTitle: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500',
    marginBottom: 6,
    color: BASE_COLORS.gray_100,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    color: BASE_COLORS.gray_60,
    marginBottom: 8,
  },
  item: {
    paddingVertical: 15,
    flexDirection: 'row',
    gap: 16,
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
  orderStatus: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500',
    alignSelf: 'center',
  },
});
