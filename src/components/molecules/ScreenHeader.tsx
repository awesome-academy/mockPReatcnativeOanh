import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ShoppingCartIcon from '@/assets/svgs/shopping-cart.svg';
import BackIcon from '@/assets/svgs/chevron-left.svg';
import { BASE_COLORS } from '@/styles/color';
// import { useAppNavigation } from '@/hooks/useAppNavigation';

type ScreenHeaderProps = {
  title: string;
  onBackPress?: () => void;
  showShoppingCart?: boolean;
  titleUppercase?: boolean;
};

export const ScreenHeader = ({
  title,
  onBackPress,
  showShoppingCart = true,
  titleUppercase = true,
}: ScreenHeaderProps) => {
  // const navigation = useAppNavigation();

  return (
    <View style={styles.headerContainer}>
      <View style={styles.iconContainer}>
        {onBackPress && (
          <TouchableOpacity onPress={onBackPress}>
            <BackIcon width={24} height={24} />
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.headerTitle}>
        {titleUppercase ? title.toUpperCase() : title}
      </Text>
      <View style={styles.iconContainer}>
        {showShoppingCart && (
          <TouchableOpacity onPress={() => {}}>
            <ShoppingCartIcon width={24} height={24} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    backgroundColor: BASE_COLORS.white,
  },
  headerTitle: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '500',
    color: BASE_COLORS.gray_100,
  },
  iconContainer: {
    width: 24,
    height: 24,
  },
});
