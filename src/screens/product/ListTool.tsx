import { SafeAreaView } from 'react-native-safe-area-context';
import { AppStackParamList } from '@/navigator/AppNavigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActivityIndicator, Text } from 'react-native';
import { ScreenHeader } from '@/components/molecules/ScreenHeader';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/stores/store';
import { commonStyles } from '@/styles/common';
import { PreviewListProduct } from '@/components/organisms/home/PreviewListProduct';
import { fetchToolData } from '@/stores/tool';
import { PRODUCT_TYPE, SCREEN_LIST_TITLE } from '@/constants/product';

type ListToolScreenProps = NativeStackScreenProps<
  AppStackParamList,
  'ListTool'
>;

export default function ListTool({ navigation }: ListToolScreenProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { tools, loading, error } = useSelector(
    (state: RootState) => state.tool,
  );

  useEffect(() => {
    dispatch(fetchToolData());
  }, [dispatch]);

  if (loading)
    return <ActivityIndicator size="large" style={commonStyles.center} />;

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScreenHeader
        title={SCREEN_LIST_TITLE.TOOL}
        onBackPress={() => navigation.navigate('Home')}
      />
      {!error && (
        <PreviewListProduct products={tools} productType={PRODUCT_TYPE.TOOL} />
      )}
      {error && <Text style={commonStyles.center}>Error: {error}</Text>}
    </SafeAreaView>
  );
}
