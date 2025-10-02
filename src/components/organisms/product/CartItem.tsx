import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BASE_COLORS } from '@/styles/color';
import { Product } from '@/types/product';
import AppCheckbox from '@/components/atoms/AppCheckbox';
import { Counter } from '@/components/molecules/Counter';

type CartItemProps = {
  item: Product;
  onToggleSelect: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
};

export default function CartItem({
  item,
  onToggleSelect,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemProps) {
  return (
    <View style={styles.item}>
      <AppCheckbox checked={item.selected} onPress={onToggleSelect} />

      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price.toLocaleString()}đ</Text>

        <View style={styles.controls}>
          <Counter
            count={item.quantity}
            max={item?.remaining_quantity}
            increase={onIncrease}
            decrease={onDecrease}
            min={1}
            size="small"
          />
          <TouchableOpacity onPress={onRemove}>
            <Text style={styles.remove}>Xoá</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 24,
    borderBottomWidth: 1,
    borderColor: BASE_COLORS.gray_20,
    alignItems: 'center',
  },
  image: {
    width: 77,
    height: 77,
    borderRadius: 8,
    marginRight: 8,
  },
  name: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  price: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500',
    color: BASE_COLORS.primary,
    marginTop: 2,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  remove: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '500',
    marginLeft: 24,
    textDecorationLine: 'underline',
    marginBottom: 12,
  },
});
