import { PLANT_TYPE } from '@/constants/product';
import { BASE_COLORS } from '@/styles/color';
import { StyleSheet, Text, View, Image } from 'react-native';

type ProductItemProps = {
  id: string;
  name: string;
  image: string;
  price: number;
  type?: number;
};

export const ProductItem = (props: ProductItemProps) => {
  return (
    <View>
      <Image
        source={
          props.image
            ? { uri: props.image }
            : require('@/assets/images/image_failed.png')
        }
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.name}>{props.name}</Text>
      {props.type !== undefined && (
        <Text style={styles.type}>
          {PLANT_TYPE[props.type as keyof typeof PLANT_TYPE]}
        </Text>
      )}
      <Text style={styles.price}>
        {props.price
          ? `${props.price.toLocaleString('vi-VN')}đ`
          : 'Chưa có thông tin về giá'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 140,
    borderRadius: 8,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: BASE_COLORS.gray_100,
  },
  type: {
    fontSize: 14,
    color: BASE_COLORS.border,
  },
  price: {
    fontSize: 16,
    fontWeight: '500',
    color: BASE_COLORS.primary,
  },
});
