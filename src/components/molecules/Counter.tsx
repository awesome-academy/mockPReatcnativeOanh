import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Plus from '@/assets/svgs/plus.svg';
import Minus from '@/assets/svgs/minus.svg';
import { BASE_COLORS } from '@/styles/color';

type CounterProps = {
  count: number;
  max?: number;
  increase: () => void;
  decrease: () => void;
};

export const Counter: React.FC<CounterProps> = ({
  count,
  max,
  increase,
  decrease,
}) => {
  return (
    <View style={styles.counter}>
      <TouchableOpacity
        style={[styles.btnBox, count === 0 && styles.countBtnDisable]}
        disabled={count === 0}
        onPress={decrease}
      >
        <Minus width={24} height={24} />
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
        <Plus width={24} height={24} />
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
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: BASE_COLORS.black,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  countBtnDisable: {
    borderColor: BASE_COLORS.gray_60,
  },
  count: {
    fontSize: 16,
    marginHorizontal: 12,
  },
});
