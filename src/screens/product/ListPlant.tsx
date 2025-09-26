import { SafeAreaView } from 'react-native-safe-area-context';
import { AppStackParamList } from '@/navigator/AppNavigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ScreenHeader } from '@/components/molecules/ScreenHeader';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/stores/store';
import { commonStyles } from '@/styles/common';
import { PreviewListProduct } from '@/components/organisms/home/PreviewListProduct';
import { PLANT_TYPE, SCREEN_LIST_TITLE } from '@/constants/product';
import { fetchPlantData } from '@/stores/plant';
import { BASE_COLORS } from '@/styles/color';

type ListScreenProps = NativeStackScreenProps<AppStackParamList, 'ListPlant'>;

export default function ListPlant({ navigation, route }: ListScreenProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { plants, loading, error } = useSelector(
    (state: RootState) => state.plant,
  );
  const { status } = route.params;

  const [statusSelected, setStatusSelected] = useState<number>(status ?? 0);

  const filterOptions = [
    { status: 0, label: 'Tất cả', filterBy: {} },
    { status: 1, label: 'Mới về', filterBy: { tag: 'new' } },
    ...Object.entries(PLANT_TYPE).map(([key, value]) => ({
      status: Number(key) + 2,
      label: value,
      filterBy: { type: Number(key) },
    })),
  ];

  useEffect(() => {
    dispatch(fetchPlantData(filterOptions[statusSelected].filterBy));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, statusSelected]);

  if (loading)
    return <ActivityIndicator size="large" style={commonStyles.center} />;

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScreenHeader
        title={SCREEN_LIST_TITLE.PLANT}
        onBackPress={() => navigation.navigate('Home')}
      />
      <View style={styles.filter}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {filterOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setStatusSelected(option.status);
              }}
            >
              <Text
                style={[
                  styles.option,
                  statusSelected === option.status && styles.selected,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      {!error && <PreviewListProduct products={plants} />}
      {error && <Text style={commonStyles.center}>Error: {error}</Text>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  filter: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  option: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 14,
    lineHeight: 20,
    color: BASE_COLORS.gray_60,
    marginRight: 8,
  },
  selected: {
    backgroundColor: BASE_COLORS.primary,
    color: BASE_COLORS.white,
  },
});
