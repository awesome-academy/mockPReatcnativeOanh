import { SafeAreaView } from 'react-native-safe-area-context';
import { AppStackParamList } from '@/navigator/AppNavigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActivityIndicator, Text } from 'react-native';
import { ScreenHeader } from '@/components/molecules/ScreenHeader';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/stores/store';
import { fetchPlantPotData } from '@/stores/plantPot';
import { commonStyles } from '@/styles/common';
import { PreviewListProduct } from '@/components/organisms/home/PreviewListProduct';
import { SCREEN_LIST_TITLE } from '@/constants/product';

type ListPotScreenProps = NativeStackScreenProps<
  AppStackParamList,
  'ListPlantPot'
>;

export default function ListPlantPot({ navigation }: ListPotScreenProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { plantPots, loading, error } = useSelector(
    (state: RootState) => state.plantPot,
  );

  useEffect(() => {
    dispatch(fetchPlantPotData());
  }, [dispatch]);

  if (loading)
    return <ActivityIndicator size="large" style={commonStyles.center} />;

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScreenHeader
        title={SCREEN_LIST_TITLE.PLANT_POT}
        onBackPress={() => navigation.navigate('Home')}
      />
      {!error && <PreviewListProduct products={plantPots} />}
      {error && <Text style={commonStyles.center}>Error: {error}</Text>}
    </SafeAreaView>
  );
}
