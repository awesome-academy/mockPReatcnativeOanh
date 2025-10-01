import { SearchItem } from '@/constants/product';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { BASE_COLORS } from '@/styles/color';
import { useAppNavigation } from '@/hooks/useAppNavigation';

type Props = {
  item: SearchItem;
};

export function SearchResultItem({ item }: Props) {
  const navigation = useAppNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ProductDetail', {
          id: item.id,
          type: item.product_type,
        })
      }
    >
      <View style={styles.item}>
        <Image
          source={
            item.image
              ? { uri: item.image }
              : require('@/assets/images/image_failed.png')
          }
          style={styles.image}
        />
        <View style={styles.info}>
          <Text style={[styles.textStyle, styles.productName]}>
            {item.name}
          </Text>
          <Text style={[styles.textStyle, styles.productPrice]}>
            {item.price !== undefined && item.price !== null
              ? `${item.price.toLocaleString('vi-VN')} đ`
              : ''}
          </Text>
          <Text style={styles.productQuantity}>
            {item.remaining_quantity
              ? `Còn ${item.remaining_quantity} sp`
              : 'Hết hàng'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    flexDirection: 'row',
    gap: 16,
  },
  image: {
    width: 77,
    height: 70,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  info: {
    gap: 5,
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500',
  },
  productName: {
    color: BASE_COLORS.black,
  },
  productPrice: {
    color: BASE_COLORS.black,
  },
  productQuantity: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    color: BASE_COLORS.gray_60,
  },
});
