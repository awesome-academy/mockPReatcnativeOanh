import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Plus from '@/assets/svgs/plus.svg';
import Minus from '@/assets/svgs/minus.svg';
import { BASE_COLORS } from '@/styles/color';

type CounterProps = {
  count: number;
  min?: number;
  max?: number;
  increase: () => void;
  decrease: () => void;
  size?: 'medium' | 'small';
};

export const Counter: React.FC<CounterProps> = ({
  count,
  min = 0,
  max,
  increase,
  decrease,
  size = 'medium',
}) => {
  const iconSize = () => {
    return size === 'medium' ? 24 : 16;
  };
  return (
    <View style={styles.counter}>
      <TouchableOpacity
        style={[
          styles.btnBox,
          styles[size],
          count === min && styles.countBtnDisable,
        ]}
        disabled={count === min}
        onPress={decrease}
      >
        <Minus width={iconSize()} height={iconSize()} />
      </TouchableOpacity>

      <Text style={styles.count}>{count}</Text>

      <TouchableOpacity
        style={[
          styles.btnBox,
          max !== undefined && count >= max && styles.countBtnDisable,
        ]}
        disabled={max !== undefined && count >= max}
        onPress={increase}
      >
        <Plus width={iconSize()} height={iconSize()} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 12,
  },
  btnBox: {
    borderWidth: 1,
    borderColor: BASE_COLORS.black,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  medium: {
    width: 30,
    height: 30,
  },
  small: {
    width: 20,
    height: 20,
  },
  countBtnDisable: {
    borderColor: BASE_COLORS.gray_40,
  },
  count: {
    fontSize: 16,
    marginHorizontal: 12,
  },
});
