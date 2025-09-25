import { ProductItem } from '@/components/molecules/home/ProductItem';
import { BASE_COLORS } from '@/styles/color';
import { commonStyles } from '@/styles/common';
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const itemWidth = (screenWidth - 24 * 3) / 2; // Two items per row with 24px gap

type PreviewListProductProps = {
  title: string;
  products: {
    id: string;
    name: string;
    image: string;
    price: number;
    type?: number;
  }[];
  seeAllText: string;
  onPressSeeAll?: () => void;
};

export const PreviewListProduct = (props: PreviewListProductProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>

      {props.products.length > 0 ? (
        <View>
          <FlatList
            data={props.products}
            keyExtractor={item => item.id}
            numColumns={2}
            renderItem={({ item }) => (
              <ScrollView style={styles.itemContainer}>
                <ProductItem {...item} />
              </ScrollView>
            )}
            columnWrapperStyle={styles.row}
          />
          <TouchableOpacity
            onPress={() => {
              if (props.onPressSeeAll) props.onPressSeeAll();
            }}
          >
            <Text style={styles.seeAllText}>{props.seeAllText}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={commonStyles.defaultDescription}>
          Hiện tại không có sẵn sản phẩm nào.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    fontSize: 24,
    lineHeight: 34,
    fontWeight: '500',
    color: BASE_COLORS.gray_100,
    marginBottom: 16,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  itemContainer: {
    width: itemWidth,
  },
  seeAllText: {
    fontSize: 16,
    lineHeight: 20,
    color: BASE_COLORS.gray_100,
    fontWeight: '500',
    textAlign: 'right',
    textDecorationLine: 'underline',
  },
});
