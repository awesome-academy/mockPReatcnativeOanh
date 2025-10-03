import { AppNavbar } from '@/components/molecules/AppNavbar';
import { AppStackParamList } from '@/navigator/AppNavigation';
import { BASE_COLORS } from '@/styles/color';
import { commonStyles } from '@/styles/common';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ShoppingCartIcon from '@/assets/svgs/shopping-cart.svg';
import ArrowRightIcon from '@/assets/svgs/arrow-right.svg';
import { PreviewListProduct } from '@/components/organisms/home/PreviewListProduct';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/stores/store';
import { fetchHomeData } from '@/stores/home';
import { PRODUCT_TYPE } from '@/constants/product';

type HomeScreenProps = NativeStackScreenProps<AppStackParamList, 'Home'>;

export default function Home({ navigation }: HomeScreenProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { plants, plantPots, tools, loading, error } = useSelector(
    (state: RootState) => state.home,
  );

  const isDataReady = plants.length && plantPots.length && tools.length;

  useEffect(() => {
    if (!isDataReady) dispatch(fetchHomeData());
  }, [dispatch, isDataReady]);

  if (loading)
    return <ActivityIndicator size="large" style={commonStyles.center} />;
  if (error) return <Text style={commonStyles.center}>Error: {error}</Text>;

  const renderHeader = () => (
    <View style={styles.banner}>
      <TouchableOpacity
        style={styles.shoppingCart}
        onPress={() => navigation.navigate('ShoppingCart')}
      >
        <ShoppingCartIcon width={24} height={24} />
      </TouchableOpacity>
      <View style={styles.bannerTextContainer}>
        <Text style={styles.bannerText}>
          Planta - tỏa sáng không gian nhà bạn
        </Text>
        <TouchableOpacity
          style={commonStyles.defaultBtnRedirect}
          onPress={() => navigation.navigate('ListPlant', { status: 1 })}
        >
          <Text style={styles.bannerSubText}>Xem hàng mới về</Text>
          <ArrowRightIcon width={24} height={24} />
        </TouchableOpacity>
      </View>
      <Image
        source={require('@/assets/images/home_bg_image.png')}
        style={styles.bannerImage}
        resizeMode="contain"
      />
    </View>
  );

  const renderItem = ({ item }: any) => {
    if (item.type === 'productList') {
      return (
        <PreviewListProduct
          title={item.title}
          seeAllText={item.seeAllText}
          products={item.products}
          onPressSeeAll={item.onPressSeeAll}
          productType={item.productType}
        />
      );
    } else if (item.type === 'advertisement') {
      return (
        <View style={commonStyles.px_24}>
          <Text style={styles.newCombo}>Combo chăm sóc (mới)</Text>
          <View style={styles.advertisementContainer}>
            <View style={styles.advertisementContent}>
              <Text style={commonStyles.defaultTitle}>Lemon Balm Grow Kit</Text>
              <Text style={commonStyles.defaultDescription}>
                Gồm: hạt giống Lemon Balm, gói đất hữu cơ, chậu Planta, marker
                đánh dấu...
              </Text>
            </View>
            <Image
              source={{
                uri: 'https://modernsprout.com/cdn/shop/files/MS-AH-1001_BKG-PL-01_1800x.jpg?v=1724942106',
              }}
              style={styles.advertisementImage}
              resizeMode="cover"
            />
          </View>
        </View>
      );
    }
    return null;
  };

  const data = [
    {
      type: 'productList',
      title: 'Cây trồng',
      seeAllText: 'Xem thêm Cây trồng',
      products: plants,
      onPressSeeAll: () => navigation.navigate('ListPlant', { status: 0 }),
      productType: PRODUCT_TYPE.PLANT,
    },
    {
      type: 'productList',
      title: 'Chậu cây trồng',
      seeAllText: 'Xem thêm Chậu cây trồng',
      products: plantPots,
      onPressSeeAll: () => navigation.navigate('ListPlantPot'),
      productType: PRODUCT_TYPE.PLANT_POT,
    },
    {
      type: 'productList',
      title: 'Dụng cụ trồng cây',
      seeAllText: 'Xem thêm Dụng cụ trồng cây',
      products: tools,
      onPressSeeAll: () => navigation.navigate('ListTool'),
      productType: PRODUCT_TYPE.TOOL,
    },
    { type: 'advertisement' },
  ];

  return (
    <SafeAreaView style={commonStyles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
      />
      <AppNavbar activeTab="home" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  banner: {
    backgroundColor: BASE_COLORS.gray_20,
    height: 300,
  },
  bannerImage: {
    width: '100%',
    height: 225,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  shoppingCart: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: BASE_COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 32,
    right: 24,
  },
  bannerTextContainer: {
    position: 'absolute',
    top: 40,
    left: 24,
    gap: 8,
    height: 200,
    zIndex: 1,
  },
  bannerText: {
    fontSize: 24,
    lineHeight: 37,
    fontWeight: '500',
    width: 223,
  },
  bannerSubText: {
    fontSize: 16,
    lineHeight: 22,
    color: BASE_COLORS.primary,
    fontWeight: '500',
  },
  newCombo: {
    fontSize: 24,
    lineHeight: 34,
    fontWeight: '500',
    marginBottom: 24,
  },
  advertisementContainer: {
    backgroundColor: BASE_COLORS.gray_20,
    borderRadius: 8,
    flexDirection: 'row',
    width: '100%',
    marginBottom: 40,
  },
  advertisementContent: {
    padding: 24,
    flex: 1,
    gap: 8,
  },
  advertisementImage: {
    width: 120,
    height: 160,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
});
