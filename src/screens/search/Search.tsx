import { AppNavbar } from '@/components/molecules/AppNavbar';
import { ScreenHeader } from '@/components/molecules/ScreenHeader';
import {
  PRODUCT_TYPE,
  SCREEN_LIST_TITLE,
  SearchItem,
} from '@/constants/product';
import { RootState } from '@/stores/store';
import { commonStyles } from '@/styles/common';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { BASE_COLORS } from '@/styles/color';
import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { addHistory } from '@/stores/search';
import { getListAllPlants } from '@/api/plant';
import { getListPlantPots } from '@/api/pot';
import { getListTools } from '@/api/tool';
import { AppInput } from '@/components/atoms/AppInput';
import SearchIcon from '@/assets/svgs/search.svg';
import { SearchHistory } from '@/components/organisms/search/SearchHistory';
import { SearchResultItem } from '@/components/organisms/search/SearchResultItem';
import { debounce } from 'lodash';

export default function SearchScreen() {
  const navigation = useAppNavigation();
  const dispatch = useDispatch();
  const history = useSelector((state: RootState) => state.search.history);

  const [error, setError] = useState<string | null>(null);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchItem[]>([]);

  const handleSearch = async (kw: string) => {
    if (!kw.trim()) return;

    setLoading(true);
    setKeyword(kw);
    dispatch(addHistory(kw));

    try {
      const [plants, plant_pots, tools] = await Promise.all([
        getListAllPlants({ name_like: kw }),
        getListPlantPots({ name_like: kw }),
        getListTools({ name_like: kw }),
      ]);

      const plantsWithType = plants.map((item: any) => ({
        ...item,
        product_type: PRODUCT_TYPE.PLANT,
      }));
      const potsWithType = plant_pots.map((item: any) => ({
        ...item,
        product_type: PRODUCT_TYPE.PLANT_POT,
      }));
      const toolsWithType = tools.map((item: any) => ({
        ...item,
        product_type: PRODUCT_TYPE.TOOL,
      }));

      setResults([...plantsWithType, ...potsWithType, ...toolsWithType]);
    } catch (err: any) {
      setError(err?.message ?? 'Đã có lỗi xảy ra.');
    }
    setLoading(false);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((kw: string) => handleSearch(kw), 500),
    [],
  );

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScreenHeader
        title={SCREEN_LIST_TITLE.SEARCH}
        onBackPress={() => navigation.navigate('Home')}
        showShoppingCart={false}
      />
      <View style={styles.body}>
        <View style={styles.searchContainer}>
          <AppInput
            placeholder="Tìm kiếm"
            value={keyword}
            keyboardType="default"
            autoCapitalize="words"
            style={styles.input}
            onChangeText={text => {
              setKeyword(text);
              debouncedSearch(text);
            }}
            returnKeyType="search"
            onSubmitEditing={() => handleSearch(keyword)}
            rightIcon={<SearchIcon width={20} height={20} />}
            onRightIconPress={() => handleSearch(keyword)}
          />

          <SearchHistory history={history} onSelect={handleSearch} />
        </View>

        {loading && (
          <ActivityIndicator size="large" style={commonStyles.center} />
        )}
        {error && (
          <Text style={[commonStyles.center, commonStyles.fail]}>{error}</Text>
        )}
        {!loading && (
          <FlatList
            data={results}
            renderItem={({ item }) => <SearchResultItem item={item} />}
            keyExtractor={item => `${item.product_type}-${item.id}`}
            ListEmptyComponent={
              keyword.trim() !== '' && results.length === 0 ? (
                <Text style={commonStyles.center}>Không tìm thấy kết quả</Text>
              ) : null
            }
          />
        )}
      </View>
      <AppNavbar activeTab="search" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: BASE_COLORS.white,
  },
  searchContainer: {
    paddingHorizontal: 40,
  },
  input: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderRadius: 0,
    paddingHorizontal: 4,
  },
});
